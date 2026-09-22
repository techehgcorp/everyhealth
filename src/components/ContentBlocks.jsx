import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";

// Renders an optional `contentBlocks` array. Used by /products/[slug] and by
// the long-form guides, so both get the same typography and table behaviour.
//
// Block shapes:
//
//   { type: "prose",
//     eyebrow?, heading, lead?,
//     body?:    ["paragraph", ...],
//     bullets?: [{ title, text }],
//     link?:    { href, label } }
//
//   { type: "table", heading?, intro?, columns: [], rows: [[]], note? }
//
// Anything without a recognised `type` is skipped rather than crashing the
// page, so a typo in the data file cannot take a route down in production.

export default function ContentBlocks({ blocks }) {
  if (!blocks?.length) return null;

  return (
    <section id="product-content" className="eh-content qol-content section">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            {blocks.map((block, index) => {
              if (block.type === "table") {
                return (
                  <ComparisonTable
                    key={block.heading || `table-${index}`}
                    heading={block.heading}
                    intro={block.intro}
                    columns={block.columns}
                    rows={block.rows}
                    note={block.note}
                  />
                );
              }

              if (block.type !== "prose") return null;

              return (
                <div className="eh-content-block qol-content-block" key={block.heading || `prose-${index}`}>
                  {block.eyebrow && <p className="eh-eyebrow qol-eyebrow">{block.eyebrow}</p>}
                  <h2>{block.heading}</h2>
                  {block.lead && <p className="eh-lead qol-lead">{block.lead}</p>}

                  {block.body?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}

                  {block.bullets?.length > 0 && (
                    <ul className="eh-bullets qol-bullets">
                      {block.bullets.map((bullet) => (
                        <li key={bullet.title}>
                          <strong>{bullet.title}</strong>
                          <span>{bullet.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {block.link && (
                    <p className="eh-inline-link qol-inline-link">
                      <Link href={block.link.href}>{block.link.label}</Link>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
