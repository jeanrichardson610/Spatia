const PROJECT_PREFIX = 'spatia_project_';

// Helper for JSON error responses
const jsonError = (status, message, extra = {}) => {
  return new Response(JSON.stringify({ error: message, ...extra }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

// Helper to get authenticated user ID
const getUserId = async (userPuter) => {
  try {
    const user = await userPuter.auth.getUser();
    return user?.uuid || null;
  } catch {
    return null;
  }
};

/**
 * -------------------
 * API ROUTES
 * -------------------
 */

// Save a project
router.post('/api/projects/save', async ({ request, user }) => {
  try {
    const userPuter = user.puter;
    if (!userPuter) return jsonError(401, 'Authentication failed');

    const body = await request.json();
    const project = body?.project;
    if (!project?.id || !project?.sourceImage)
      return jsonError(400, 'Project ID and source image are required');

    const userId = await getUserId(userPuter);
    if (!userId) return jsonError(401, 'Authentication failed');

    const key = `${PROJECT_PREFIX}${project.id}`;
    const payload = { ...project, updatedAt: new Date().toISOString() };

    await userPuter.kv.set(key, payload);

    return new Response(JSON.stringify({ saved: true, id: project.id, project: payload }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return jsonError(500, 'Failed to save project', { message: e.message || 'Unknown error' });
  }
});

// List all projects for the user
router.get('/api/projects/list', async ({ user }) => {
  try {
    const userPuter = user.puter;
    if (!userPuter) return jsonError(401, 'Authentication failed');

    const userId = await getUserId(userPuter);
    if (!userId) return jsonError(401, 'Authentication failed');

    const projects = (await userPuter.kv.list(PROJECT_PREFIX, true)).map(({ value }) => ({
      ...value,
      isPublic: true,
    }));

    return new Response(JSON.stringify({ projects }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return jsonError(500, 'Failed to list projects', { message: e.message || 'Unknown error' });
  }
});

// Get a single project by ID
router.get('/api/projects/get', async ({ request, user }) => {
  try {
    const userPuter = user.puter;
    if (!userPuter) return jsonError(401, 'Authentication failed');

    const userId = await getUserId(userPuter);
    if (!userId) return jsonError(401, 'Authentication failed');

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return jsonError(400, 'Project ID is required');

    const key = `${PROJECT_PREFIX}${id}`;
    const project = await userPuter.kv.get(key);
    if (!project) return jsonError(404, 'Project not found');

    return new Response(JSON.stringify({ project }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return jsonError(500, 'Failed to get project', { message: e.message || 'Unknown error' });
  }
});

// Example root route
router.get('/', () => {
  return new Response('Hello World', {
    headers: { 'Content-Type': 'text/plain' },
  });
});

// Example hello route
router.get('/api/hello', () => {
  return new Response(JSON.stringify({ msg: 'hello' }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
});

// Catch-all for all other GET requests (404)
router.get('/*page', ({ params }) => {
  return new Response(`Page ${params.page} not found`, { status: 404 });
});