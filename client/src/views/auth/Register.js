import React, { useState, useEffect } from "react";
import Form from "../../components/universal/Form";
import { useSelector } from "react-redux";
import Loader from "../../components/universal/Loader";
import { Modal, Button } from "react-bootstrap";

const Register = () => {
  const { isLoading, authError } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (authError) {
      setShowModal(true);
    }
  }, [authError]);

  const handleClose = () => setShowModal(false);

  return (
    <div className="login-page">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{authError}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {isLoading ? (
        <Loader />
      ) : (
          <>
          <h1 className="heading">Welcome to Transfusion Hub</h1>
          <div className="login-container">
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
          </div>
          </>
      )}
    </div>
  );
};

export default Register;

