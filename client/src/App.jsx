import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function App() {
  const [componentCount, setComponentCount] = useState(1);

  const handleComponents = () => {
    setComponentCount(componentCount + 1);
  };

  const Step1Component = () => {
    return (
      <>
        <h5 className="text-center"> Enter Your Name</h5>
        <Form className="w-100">
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="" required type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="" required />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100"
            onClick={handleComponents}
          >
            Next
          </Button>
        </Form>
      </>
    );
  };
  const Step2Component = () => {
    return (
      <>
        <h5 className="text-center"> Number of wheels</h5>
        <Form>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="2 Wheelers" />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="4 Wheelers" />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100"
            onClick={handleComponents}
          >
            Next
          </Button>
        </Form>
      </>
    );
  };
  const Step3Component = () => {
    return (
      <>
        <h5 className="text-center"> Type of vehicle</h5>
        <Form>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Scooter/Motercycle" />
            <Form.Check type="checkbox" label="Sedan/SUV/Luxury" />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100"
            onClick={handleComponents}
          >
            Next
          </Button>
        </Form>
      </>
    );
  };
  const Step4Component = () => {
    return (
      <>
        <h5 className="text-center"> Specific Model</h5>
        <Form>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="maruti/splendor" />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100"
            onClick={handleComponents}
          >
            Next
          </Button>
        </Form>
      </>
    );
  };
  const Step5Component = () => {
    return (
      <>
        <h5 className="text-center"> Date range picker</h5>
        <Form>
          <h6> From:</h6>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Control required type="date" />
          </Form.Group>
          <h6> To:</h6>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Control required type="date" />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            onClick={() => setComponentCount(1)}
          >
            Submit
          </Button>
        </Form>
      </>
    );
  };

  return (
    <>
      <div className="appContainer">
        <Card
        // style={{ width: "18rem" }}
        >
          <h2 className="text-center pt-2">Vehicle Rentals</h2>

          <Card.Body>
            {componentCount == 1 ? (
              <Step1Component />
            ) : componentCount == 2 ? (
              <Step2Component />
            ) : componentCount == 3 ? (
              <Step3Component />
            ) : componentCount == 4 ? (
              <Step4Component />
            ) : componentCount == 5 ? (
              <Step5Component />
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default App;
