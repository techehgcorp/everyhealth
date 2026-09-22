// Reusable comparison table.
//
// Renders ONE semantic <table> that reflows into a card stack under 600px
// via CSS, rather than shipping two copies of the markup or a horizontal
// scroller. Crawlers and screen readers see a real table at every width.
//
// The first cell of each row is treated as the row header (<th scope="row">),
// which is what makes the mobile card stack readable: it becomes the card title.
//
// Every body cell carries data-label so the mobile view can print the column
// name via ::before once <thead> is hidden.

export default function ComparisonTable({ heading, intro, columns, rows, note }) {
  if (!columns?.length || !rows?.length) return null;

  return (
    <div className="eh-table-block qol-table-block">
      {heading && <h3 className="eh-table-heading qol-table-heading">{heading}</h3>}
      {intro && <p className="eh-table-intro qol-table-intro">{intro}</p>}

      <div className="eh-table-wrap qol-table-wrap">
        <table className="eh-table qol-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th scope="col" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th scope="row" key={cellIndex} data-label={columns[0]}>
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} data-label={columns[cellIndex]}>
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && <p className="eh-table-note qol-table-note">{note}</p>}
    </div>
  );
}
