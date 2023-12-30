import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHospital, FaHandHoldingHeart, FaUsers, FaChartBar } from 'react-icons/fa';
import Layout from '../components/universal/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <Container className="about-page-container">
        <h1 className="text-center my-4">About Transfusion Hub</h1>
        <p className="text-center mb-5">
          Transfusion Hub is a comprehensive platform dedicated to streamlining the management of blood bank operations. 
          Our mission is to facilitate seamless collaboration between hospitals, donors, and organizations to ensure 
          timely and efficient blood supply for those in need.
        </p>

        <Row>
          <Col md={6} lg={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <FaHospital className="icon-feature" />
                <Card.Title>Hospitals</Card.Title>
                <Card.Text>
                  Hospitals can request the blood they need, ensuring urgent requirements are met swiftly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <FaHandHoldingHeart className="icon-feature" />
                <Card.Title>Donors</Card.Title>
                <Card.Text>
                  Individual and organizational donors can contribute to saving lives by donating blood.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <FaUsers className="icon-feature" />
                <Card.Title>Administration</Card.Title>
                <Card.Text>
                  Admins have the capability to manage donors, hospitals, and organizations efficiently.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <FaChartBar className="icon-feature" />
                <Card.Title>Blood Analytics</Card.Title>
                <Card.Text>
                  Comprehensive analytics provide real-time data on blood group availability in the bank.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AboutPage;
