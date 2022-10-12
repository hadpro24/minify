import Spinner from "react-bootstrap/Spinner";

const LoadingComponent = () => (
  <div className="position-fixed w-100 h-100 top-0 d-flex align-items-center justify-content-center bg-dark bg-opacity-25">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default LoadingComponent;
