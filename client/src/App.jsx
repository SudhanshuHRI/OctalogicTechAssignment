import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";


const Step1Component = ({ firstName, setFirstName, lastName, setLastName, onNext }) => {
  const [nameError, setNameError] = useState("");
  
  const handleNext = () => {
    if (!firstName.trim()) {
      setNameError("Please enter your first name");
      return;
    }
    
    if (!lastName.trim()) {
      setNameError("Please enter your last name");
      return;
    }
    
    setNameError("");
    onNext();
  };
  
  return (
    <>
      <h5 className="text-center">Enter Your Name</h5>
      <Form className="w-100">
        <Form.Group className="mb-3" controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </Form.Group>
        
        {nameError && (
          <div className="alert alert-danger">{nameError}</div>
        )}

        <Button
          variant="primary"
          className="w-100"
          onClick={handleNext}
        >
          Next
        </Button>
      </Form>
    </>
  );
};


const Step2Component = ({ vehicleWheels, setVehicleWheels, onNext }) => {
  const handleNext = () => {
    if (vehicleWheels) {
      onNext();
    } else {
      alert("Please select wheel type");
    }
  };
  
  return (
    <>
      <h5 className="text-center">Number of wheels</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Check 
            type="radio" 
            name="wheelType" 
            id="wheels-2"
            label="2 Wheelers" 
            checked={vehicleWheels === "2"}
            onChange={() => setVehicleWheels("2")}
          />
          <Form.Check 
            type="radio" 
            name="wheelType" 
            id="wheels-4"
            label="4 Wheelers" 
            checked={vehicleWheels === "4"}
            onChange={() => setVehicleWheels("4")}
          />
        </Form.Group>

        <Button
          variant="primary"
          className="w-100"
          onClick={handleNext}
        >
          Next
        </Button>
      </Form>
    </>
  );
};


const Step3Component = ({ vehicleType, setVehicleType, vehicleWheels, onNext }) => {
  const handleNext = () => {
    if (vehicleType) {
      onNext();
    } else {
      alert("Please select a vehicle type");
    }
  };
  

  const twoWheelerTypes = ["cruiser", "sports"];
  const fourWheelerTypes = ["hatchback", "suv", "sedan"];
  
  const vehicleTypes = vehicleWheels === "2" ? twoWheelerTypes : fourWheelerTypes;
  
  return (
    <>
      <h5 className="text-center">Type of vehicle</h5>
      <Form>
        <Form.Group className="mb-3">
          {vehicleTypes.map(type => (
            <Form.Check 
              key={type}
              type="radio" 
              name="vehicleType" 
              id={`vehicle-${type}`}
              label={type.charAt(0).toUpperCase() + type.slice(1)} 
              checked={vehicleType === type}
              onChange={() => setVehicleType(type)}
            />
          ))}
        </Form.Group>

        <Button
          variant="primary"
          className="w-100"
          onClick={handleNext}
        >
          Next
        </Button>
      </Form>
    </>
  );
};


const Step4Component = ({ selectedVehicleId, setSelectedVehicleId, vehicleType, vehicles, onNext }) => {
  const handleNext = () => {
    if (selectedVehicleId) {
      onNext();
    } else {
      alert("Please select a vehicle model");
    }
  };
  

  const filteredVehicles = vehicles.filter(vehicle => vehicle.vehicle_type === vehicleType);
  
  return (
    <>
      <h5 className="text-center">Specific Model</h5>
      <Form>
        <Form.Group className="mb-3">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
              <Form.Check 
                key={vehicle.id}
                type="radio" 
                name="vehicleModel" 
                id={`vehicle-${vehicle.id}`}
                label={vehicle.vehicle_model} 
                checked={selectedVehicleId === vehicle.id}
                onChange={() => setSelectedVehicleId(vehicle.id)}
              />
            ))
          ) : (
            <p>No models available for this vehicle type</p>
          )}
        </Form.Group>

        <Button
          variant="primary"
          className="w-100"
          onClick={handleNext}
          disabled={filteredVehicles.length === 0}
        >
          Next
        </Button>
      </Form>
    </>
  );
};

const Step5Component = ({ bookedFrom, setBookedFrom, bookedTill, setBookedTill, bookings, selectedVehicleId, vehicles, onSubmit }) => {
  const [dateError, setDateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!bookedFrom || !bookedTill) {
      setDateError("Please select both start and end dates");
      return;
    }
    
 
    if (new Date(bookedTill) < new Date(bookedFrom)) {
      setDateError("End date cannot be before start date");
      return;
    }
    
  
    const selectedStart = new Date(bookedFrom);
    const selectedEnd = new Date(bookedTill);
    
    const overlappingBooking = bookings.find(booking => 
      booking.id === selectedVehicleId && 
      booking.user_name && 
      new Date(booking.booked_from) <= selectedEnd && 
      new Date(booking.booked_till) >= selectedStart
    );
    
    if (overlappingBooking) {
      setDateError("This vehicle is already booked for these dates. Please select different dates.");
      return;
    }
    
    setDateError("");
    setIsSubmitting(true);
    onSubmit(setDateError, () => setIsSubmitting(false));
  };
  
  return (
    <>
      <h5 className="text-center">Date range picker</h5>
      
      {selectedVehicle && (
        <div className="selected-vehicle-info mb-3 p-2 bg-light rounded">
          <p className="mb-1"><strong>Selected Vehicle:</strong> {selectedVehicle.vehicle_model}</p>
          <p className="mb-1"><strong>Type:</strong> {selectedVehicle.vehicle_type}</p>
          <p className="mb-0"><strong>Wheels:</strong> {selectedVehicle.vehicle_wheels}</p>
        </div>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>From:</Form.Label>
          <Form.Control 
            required 
            type="date" 
            value={bookedFrom}
            min={new Date().toISOString().split('T')[0]} 
            onChange={(e) => setBookedFrom(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>To:</Form.Label>
          <Form.Control 
            required 
            type="date" 
            value={bookedTill}
            min={bookedFrom || new Date().toISOString().split('T')[0]} 
            onChange={(e) => setBookedTill(e.target.value)}
          />
        </Form.Group>
        
        {dateError && (
          <div className="alert alert-danger">{dateError}</div>
        )}

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </Button>
      </Form>
    </>
  );
};


const BookingSuccessComponent = ({ booking, vehicle, onBookAgain }) => {
  return (
    <>
      <div className="text-center mb-4">
        <h4 className="text-success">Booking Successful!</h4>
        <p>Your booking has been confirmed.</p>
      </div>
      
      <div className="booking-details mb-4">
        <h5>Booking Details:</h5>
        <p><strong>Name:</strong> {booking.user_name}</p>
        <p><strong>Vehicle:</strong> {vehicle.vehicle_model} ({vehicle.vehicle_type})</p>
        <p><strong>Wheels:</strong> {vehicle.vehicle_wheels}</p>
        <p><strong>From:</strong> {new Date(booking.booked_from).toLocaleDateString()}</p>
        <p><strong>To:</strong> {new Date(booking.booked_till).toLocaleDateString()}</p>
      </div>
      
      <Button
        variant="primary"
        className="w-100"
        onClick={onBookAgain}
      >
        Book Another Vehicle
      </Button>
    </>
  );
};


const BookingsTable = ({ bookings, vehicles }) => {
 
  const getVehicleName = (id) => {
    const vehicle = vehicles.find(v => v.id === id);
    return vehicle ? vehicle.vehicle_model : "Unknown";
  };
  
  return (
    <div className="mt-4">
      <h4>Current Bookings</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Vehicle</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {bookings.filter(b => b.user_name).map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.user_name}</td>
              <td>{getVehicleName(booking.id)}</td>
              <td>{booking.booked_from ? new Date(booking.booked_from).toLocaleDateString() : "N/A"}</td>
              <td>{booking.booked_till ? new Date(booking.booked_till).toLocaleDateString() : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};


function App() {
  const [componentCount, setComponentCount] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [latestBooking, setLatestBooking] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleWheels, setVehicleWheels] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [bookedFrom, setBookedFrom] = useState("");
  const [bookedTill, setBookedTill] = useState("");

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:5000/getData");
      const data = await response.json();
      console.log(data.data);
      setVehicles(data.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };
  
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/getData");
      const data = await response.json();
      setBookings(data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const createBooking = async (setDateError, resetSubmitting) => {
    try {
     
      const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
      
      if (!selectedVehicle) {
        setDateError("Selected vehicle not found");
        resetSubmitting();
        return;
      }
      
      const bookingData = {
        id: selectedVehicleId, 
        user_name: `${firstName} ${lastName}`, 
        booked_from: bookedFrom,
        booked_till: bookedTill
      };
      
      const response = await fetch("http://localhost:5000/postBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });
      
      const result = await response.json();
      console.log(result);
      
      if (result.status === 200) {
        setLatestBooking({
          ...bookingData,
          vehicle: selectedVehicle
        });
      
        setComponentCount(6);
       
        fetchBookings();
      } else {
      
        setDateError("Booking failed: " + (result.message || "Unknown error"));
        resetSubmitting();
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setDateError("An error occurred while processing your booking. Please try again.");
      resetSubmitting();
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchBookings();
  }, []);

  const handleNext = () => {
    setComponentCount(componentCount + 1);
  };
  
  const handleSubmit = (setDateError, resetSubmitting) => {
    createBooking(setDateError, resetSubmitting);
  };
  
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setVehicleWheels("");
    setVehicleType("");
    setSelectedVehicleId(null);
    setBookedFrom("");
    setBookedTill("");
    setComponentCount(1);
  };
  
 
  useEffect(() => {
    if (vehicleWheels) {
      setVehicleType("");
      setSelectedVehicleId(null);
    }
  }, [vehicleWheels]);
  
  useEffect(() => {
    if (vehicleType) {
      setSelectedVehicleId(null);
    }
  }, [vehicleType]);

 
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  return (
    <>
      <div className="appContainer">
        <Card>
          <h2 className="text-center pt-2">Vehicle Rentals</h2>

          <Card.Body>
            {componentCount === 1 ? (
              <Step1Component 
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                onNext={handleNext}
              />
            ) : componentCount === 2 ? (
              <Step2Component 
                vehicleWheels={vehicleWheels}
                setVehicleWheels={setVehicleWheels}
                onNext={handleNext}
              />
            ) : componentCount === 3 ? (
              <Step3Component 
                vehicleType={vehicleType}
                setVehicleType={setVehicleType}
                vehicleWheels={vehicleWheels}
                onNext={handleNext}
              />
            ) : componentCount === 4 ? (
              <Step4Component 
                selectedVehicleId={selectedVehicleId}
                setSelectedVehicleId={setSelectedVehicleId}
                vehicleType={vehicleType}
                vehicles={vehicles}
                onNext={handleNext}
              />
            ) : componentCount === 5 ? (
              <Step5Component 
                bookedFrom={bookedFrom}
                setBookedFrom={setBookedFrom}
                bookedTill={bookedTill}
                setBookedTill={setBookedTill}
                bookings={bookings}
                selectedVehicleId={selectedVehicleId}
                vehicles={vehicles}
                onSubmit={handleSubmit}
              />
            ) : componentCount === 6 ? (
              <BookingSuccessComponent
                booking={{
                  user_name: `${firstName} ${lastName}`,
                  booked_from: bookedFrom,
                  booked_till: bookedTill
                }}
                vehicle={selectedVehicle}
                onBookAgain={resetForm}
              />
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