import { PageHero, ContactBlock } from "../components/sections";

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact"
        title="Let's start a" italic="conversation." titleEnd=""
        sub="Tell us about your company, thesis, or deal. Our team responds within two business days." />
      <ContactBlock />
    </>
  );
}
