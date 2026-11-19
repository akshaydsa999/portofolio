import { Download, FileText } from "lucide-react";
import { site } from "../../data/site";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";

export function Resume() {
  return (
    <Section id="resume" title="Resume">
      <p className="max-w-2xl text-lg text-text/80">
        Education, skills, projects and campus involvement.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="primary" href={site.links.resume} target="_blank" rel="noreferrer">
          <FileText size={16} /> View resume
        </Button>
        <Button href={site.links.resume} download="Akshay-Kaushal-Resume.pdf">
          <Download size={16} /> Download resume
        </Button>
      </div>
    </Section>
  );
}