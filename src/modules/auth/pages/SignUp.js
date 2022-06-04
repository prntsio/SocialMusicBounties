import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { createProfileLens } from "../services/Auth";

const SignUp = (props) => {
  const [userName, setUserName] = useState();

  const createProfile = async () => {
    await createProfileLens(userName)
      .then((resp) => {
        alert(resp.data)
        console.log("Profile Created:", resp.data);        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="justify-content-md-center w-50 mt-5">
      <Container className="justify-content-md-center w-60 mt-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setUserName(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button
            onClick={() => createProfile()}
            className="justify-content-end"
            variant="primary"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default SignUp;
