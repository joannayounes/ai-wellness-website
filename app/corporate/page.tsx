export default function Page() {
  return (
    <div className="space-y-6">
      <h1>Corporate Wellness</h1>
      <p className="opacity-80 max-w-3xl">
        Offer your team access to our meditation library, mindfulness chatbot, and printable toolkits.
        We provide white‑label workbooks and quarterly workshops.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Team seats with SSO access</li>
        <li>Arabic & English resources</li>
        <li>Monthly utilization reports</li>
        <li>Optional live webinars</li>
      </ul>
      <a href="mailto:hello@calmclick.ai?subject=Corporate%20Wellness%20Demo" className="btn btn-primary inline-block">
        Request a Demo
      </a>
    </div>
  );
}
