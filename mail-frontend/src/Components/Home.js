import React, { useEffect, useState } from "react";
import { Container, Form, Input, Button } from "reactstrap";

export const Home = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [countryId, setCountryId] = useState(0);
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: ""
  });

  useEffect(() => {
    countrydata();
  }, []);

  useEffect(() => {
    if (countryId) {
      statedata(countryId);
    }
  }, [countryId]);

  const countrydata = () => {
    fetch("http://127.0.0.1:8000/api/getCountryData", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data);
      });
  };

  const statedata = (countryId) => {
    fetch(`http://127.0.0.1:8000/api/getStateData/${countryId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setStateData(data);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const addData = () => {
    const { fname, lname, email } = formData;

    fetch("http://127.0.0.1:8000/api/addData", {
      method: "POST",
      body: JSON.stringify({
        firstname: fname,
        lastname: lname,
        email: email,
        country_id: countryId,
        state_id: selectedStateId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Data added Successfully.");
        fetch("http://127.0.0.1:8000/api/email", {
          method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
        console.log(data);
      })
      .catch((error) => {
        alert("oops something went wrong.....");
        console.error(error);
      });
  };

  return (
    <>
      <Container className="w-75 m-auto">
        <h1 className="mb-5 text-center">Login</h1>
        <Form>
          <Input
            className="mb-3"
            name="fname"
            placeholder="First Name"
            type="text"
            value={formData.fname}
            onChange={handleInputChange}
          />
          <Input
            className="mb-3"
            name="lname"
            placeholder="Last Name"
            type="text"
            value={formData.lname}
            onChange={handleInputChange}
          />
          <Input
            className="mb-3"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            className="mb-3"
            type="select"
            onChange={(e) => setCountryId(e.target.value)}
          >
            <option>Select Country</option>
            {countryData.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Input>
          <Input
            className="mb-3"
            type="select"
            onChange={(e) => setSelectedStateId(e.target.value)}
          >
            <option>Select State</option>
            {stateData.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </Input>
          <Button onClick={addData}>Submit</Button>
        </Form>
      </Container>
    </>
  );
};

