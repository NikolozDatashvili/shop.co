import { LegalLayout } from "./LegalLayout";
import "../../Css/startUp.css";
export const TermsAndConditions = () => (
  <LegalLayout title="Terms & Conditions" className="startUp">
    <section className="space-y-4">
      <p className="font-medium text-black italic">
        Last updated: April 30, 2026
      </p>
      <p>
        By accessing and using this website, you agree to be bound by these
        Terms and Conditions. If you do not agree with any part of these terms,
        you must not use our services.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-black font-bold text-2xl uppercase font-integral">
        1. Intellectual Property
      </h2>
      <p>
        All content on this site, including but not limited to the "Integral"
        and "Satoshi" design elements, brand imagery, and product descriptions,
        is the property of our brand and is protected by copyright laws.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-black font-bold text-2xl uppercase font-integral">
        2. Use of Account
      </h2>
      <p>
        When you sign in via Google or our email system, you are responsible for
        maintaining the confidentiality of your account credentials. You agree
        to accept responsibility for all activities that occur under your
        account.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-black font-bold text-2xl uppercase font-integral">
        3. Limitation of Liability
      </h2>
      <p>
        We are not liable for any direct, indirect, or incidental damages
        resulting from your use of our clothing products or website. We reserve
        the right to cancel orders if pricing errors are discovered.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-black font-bold text-2xl uppercase font-integral">
        4. Governing Law
      </h2>
      <p>
        These terms shall be governed by and construed in accordance with the
        laws of your jurisdiction, without regard to its conflict of law
        provisions.
      </p>
    </section>

    <section className="bg-[#F0F0F0] p-6 rounded-2xl border-l-4 border-black">
      <p className="font-satoshi text-black font-bold">Questions?</p>
      <p className="text-sm">Contact our legal team at legal@yourbrand.com</p>
    </section>
  </LegalLayout>
);
