import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | CMUTalentHub",
  description: "Privacy Policy for CMUTalentHub",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-24 max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            CMUTalentHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and mobile application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Personal information (name, email address, phone number)</li>
            <li>Academic information (university affiliation, major, graduation year)</li>
            <li>Profile information (skills, projects, work experience, portfolio content)</li>
            <li>Business information (company details, job postings, contact information)</li>
            <li>Account credentials and authentication data</li>
            <li>Messages and communications sent through our platform</li>
            <li>Application and job-related information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide, maintain, and improve our services</li>
            <li>Connect students with job opportunities and businesses</li>
            <li>Enable communication between users</li>
            <li>Verify user identities and ensure platform security</li>
            <li>Send you important updates, notifications, and administrative messages</li>
            <li>Personalize your experience and provide relevant content</li>
            <li>Monitor and analyze usage patterns to improve our platform</li>
            <li>Comply with legal obligations and enforce our terms of service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">4. Information Sharing and Disclosure</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>With other users:</strong> Your profile information is visible to other users on the platform as intended by your privacy settings</li>
            <li><strong>Service providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
            <li><strong>Legal requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
            <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
            <li><strong>With your consent:</strong> We may share information for any other purpose with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">6. Your Rights and Choices</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access and review your personal information</li>
            <li>Update or correct your information through your account settings</li>
            <li>Delete your account and associated data</li>
            <li>Opt-out of certain communications and data processing</li>
            <li>Request a copy of your data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">7. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">8. Cookies and Tracking Technologies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience, analyze usage, and assist with marketing efforts. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">9. Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#6A0032]">10. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-muted-foreground">
              <strong>Email:</strong> privacy@cmutalenthub.com
            </p>
            <p className="text-muted-foreground">
              <strong>Address:</strong> Carnegie Mellon University
            </p>
            <p className="text-muted-foreground">
              5000 Forbes Avenue, Pittsburgh, PA 15213
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
