import { Terminal } from "../terminal/Terminal";
import { Section } from "../ui/Section";

export function TerminalSection() {
  return (
    <Section id="terminal" title="Terminal">
      <p className="mb-8 max-w-2xl text-lg text-text/80">
        Prefer typing? Run a command to jump around the site. On a phone, tap the buttons.
      </p>
      <Terminal />
    </Section>
  );
}