import { LegalLayout } from "./LegalLayout";
import "../../Css/startUp.css";
export const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy" className="startUp">
    <section className="space-y-4">
      <p className="font-medium text-black">Last updated: April 30, 2026</p>
      <h2 className="text-black font-bold text-2xl uppercase font-integral">
        1. Introduction
      </h2>
      <p>
        Welcome to our website. We value your privacy and are committed to
        protecting your personal data. This policy outlines how we handle your
        information.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-black font-bold text-2xl uppercase font-integral">
        2. Data We Collect
      </h2>
      <p>
        We collect email addresses via our login system and Google Identity
        services to provide a personalized shopping experience.
      </p>
    </section>
  </LegalLayout>
);
