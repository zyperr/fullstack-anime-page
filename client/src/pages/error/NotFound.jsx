import "../../styles/pages/error/notFound.css";

export const NotFound = () => {
  const bubles = [];

  for (let i = 0; i < 13; i++) {
    bubles.push(
      <div key={`bubles-${i}`} className="bubles" draggable="true"></div>
    );
  }
  return (
    <section className="notFound">
      {bubles.map((buble) => buble)}

      <span className="notFound__error">4</span>
      <span className="notFound__error">0</span>
      <span className="notFound__error">4</span>

      <div className="notFound__wrapper">
        <h1 className="notFound__title">Page not Found</h1>

        <p className="notFound__text">
          The page you are looking for does not exist
        </p>

        <a href="/" className="notFound__link">
          Back to Home
        </a>
      </div>
    </section>
  );
};
