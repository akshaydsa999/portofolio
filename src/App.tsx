import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { About } from "./components/sections/About";
import { BuildLog } from "./components/sections/BuildLog";
import { Contact } from "./components/sections/Contact";
import { Currently } from "./components/sections/Currently";
import { GithubActivity } from "./components/sections/GithubActivity";
import { Hero } from "./components/sections/Hero";
import { Lab } from "./components/sections/Lab";
import { Projects } from "./components/sections/Projects";
import { Resume } from "./components/sections/Resume";
import { TerminalSection } from "./components/sections/TerminalSection";
import { Toolbox } from "./components/sections/Toolbox";
import { useKonami } from "./hooks/useKonami";

const AMBER = "#f2b26b";

function toggleAccent() {
  const root = document.documentElement;
  if (root.style.getPropertyValue("--color-accent")) {
    root.style.removeProperty("--color-accent");
  } else {
    root.style.setProperty("--color-accent", AMBER);
  }
}

export default function App() {
  useKonami(toggleAccent);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <TerminalSection />
        <Currently />
        <About />
        <Projects />
        <Lab />
        <BuildLog />
        <Toolbox />
        <GithubActivity />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}