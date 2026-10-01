import AcaQuoter from "@/components/AcaQuoter";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Compare ACA Plans and Prices",
  description:
    "Browse all on-exchange ACA health plans in your county and estimate the savings you could get. No account or phone number needed to browse.",
  alternates: { canonical: "/aca-quote" },
  openGraph: {
    title: `Compare ACA Plans and Prices | ${brand.name}`,
    description:
      "Browse on-exchange ACA health plans where you live and see an estimate of your monthly premium after savings.",
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
          <h2>Compare ACA Plans Where You Live</h2>
          <p>
            Browse every on-exchange health plan in your county and see an estimate of your real
            monthly cost once savings are applied. It is free and only takes about a minute.
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
