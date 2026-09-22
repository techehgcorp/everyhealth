import AcaQuoter from "@/components/AcaQuoter";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "ACA Marketplace Plans and Prices",
  description:
    "See every on-exchange ACA health plan available in your county, with an estimate of the savings you may qualify for. No account, no phone number required to look.",
  alternates: { canonical: "/aca-quote" },
  openGraph: {
    title: `ACA Marketplace Plans and Prices | ${brand.name}`,
    description:
      "Compare on-exchange ACA health plans in your county and estimate your monthly cost after savings.",
    url: "/aca-quote",
  },
};

export default async function AcaQuotePage({ searchParams }) {
  // searchParams is async in Next 15+. The hero ZIP capture on the home page
  // forwards its value here, so someone who has already typed a ZIP does not
  // have to type it twice.
  const params = await searchParams;
  const rawZip = Array.isArray(params?.zip) ? params.zip[0] : params?.zip;
  const initialZip = /^\d{5}$/.test(rawZip ?? "") ? rawZip : "";

  return (
    <main className="main">
      <section className="section">
        <div className="container section-title">
          <h2>See ACA Plans and Prices in Your County</h2>
          <p>
            Every on-exchange medical plan available where you live, with an estimate of what
            you would actually pay after savings. Looking is free and takes about a minute.
          </p>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AcaQuoter initialZip={initialZip} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
