function PageHeader({ title = "this is title", description }) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageHeader;
