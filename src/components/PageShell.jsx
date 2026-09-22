export default function PageShell({ title, description }) {
  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{title}</h1>
                <p className="mb-0">{description}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">{title}</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2>{title}</h2>
              <p>{description}</p>
              <p>This page will be converted from HTML to JSX in the next step.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
