import Navbar from "components/Navbar";
import type { Route } from "./+types/home";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Button from "components/ui/Button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>

          <p className="">Introducing Spatia</p>
        </div>
        <h1 className="">
          Build beautiful spaces at the speed of thought with Spatia
        </h1>

        <p className="subtitle">
          Spatia is an AI-first design environment that helps you visualize,
          render, and ship architectural projects faster than ever.
        </p>

        <div className="actions">
          <a href="#upload" className="cta">
            Start Building <ArrowRight className="icon" />
          </a>

          <Button variant="outline" size="lg" className="demo">
            Watch Demo
          </Button>
        </div>

        <div className="upload-shell" id="upload">
          <div className="grid-overlay" />

          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>

              <h3 className="">Upload your floor plan</h3>
              <p className="">Supports JPG and PNG formats up to 10MB</p>
            </div>
            <p className="">Upload images</p>
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2 className="">Projects</h2>
              <p className="Your lastest work and shared community projects, all in one place"></p>
            </div>
          </div>

          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img 
                src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png"
                alt="Project"
                />

                <div className="badge">
                  <span className="">Community</span>
                </div>
              </div>

              <div className="card-body">
                <div className="">
                  <h3 className="">Project Manhattan</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span className="">{new Date("01.01.2027").toLocaleDateString()}</span>
                    <span className="">By JR Studio</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
