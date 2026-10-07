import { site } from "../content";
import V2Layout from "../components/V2Layout";
import { Hero } from "../components/sections/basic";
import ContactForm from "../../components/ContactForm";

// The existing contact form (it posts to /api/contact) inside the V2 layout.
export default function ContactPage() {
  const copy = site.contactPage;
  return (
    <V2Layout meta={copy.meta}>
      <Hero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <div className="v2-contact-form">
        <ContactForm />
      </div>
    </V2Layout>
  );
}
