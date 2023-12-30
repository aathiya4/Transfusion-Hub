import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Layout from "../components/universal/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <Container className="my-5">
        <h1 className="text-center mb-4">Contact Us</h1>
        <Row className="justify-content-md-center">
          <Col md={6} className="text-center">
            <div className="contact-detail">
              <p><FaMapMarkerAlt />Action Area 3, NewTown, Kolkata, India</p>
              <p><FaPhone />+91 9875066217</p>
              <p><FaEnvelope /> transfusionhub@gmail.com</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ContactPage;
