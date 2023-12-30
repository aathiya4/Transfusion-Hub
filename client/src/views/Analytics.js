

import React, { useState, useEffect } from "react";
import API from "../services/API";
import moment from "moment";
import { Card, Table, Container, Badge } from 'react-bootstrap';
import { FaTint } from 'react-icons/fa';
import Layout from "../components/universal/Layout";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  const bloodData = async () => {
    try {
      const res= await API.get("/inventory/analytics");
      if (res.data?.success) {
        setData(res.data?.bloodGroupData);
  
      }
    } catch (error) {
      console.log("ERROR",error);
    }
  };

  
  useEffect(() => {
    bloodData();
  }, []);

  const BloodDetails = async () => {
    try {
      const res= await API.get("/inventory/get-recent-inventory");
      if (res.data?.success) {
        setInventoryData(res.data?.inventory);
  
      }
    } catch (error) {
      console.log("Error",error);
    }
  };

  useEffect(() => {
    BloodDetails();
  }, []);


return (
  <>
  <Layout>

    <Container className="analytics-container">
      <div className="card-grid">
        {data?.map((record, i) => (
          <Card key={i} style={{ backgroundColor: `${colors[i]}` }}>
            <Card.Body>
              <Card.Title className="text-center">
                <FaTint className="blood-icon" /> {record.bloodGroup}
              </Card.Title>
              <Card.Text>
                Total In: <Badge bg="success">{record.totalIn} ML</Badge>
              </Card.Text>
              <Card.Text>
                Total Out: <Badge bg="danger">{record.totalOut} ML</Badge>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              Total Available: <Badge bg="info">{record.availableBlood} ML</Badge>
            </Card.Footer>
          </Card>
        ))}
      </div>
      <Container className="recent-transactions mt-4">
        <h2 className="text-center" >Recent Blood Transactions</h2>
        <Table striped bordered hover responsive className="inventory-table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Blood IN/OUT</th>
              <th>Quantity(ML)</th>
              <th> Email</th>
              <th>Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} </td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
    </Layout>
  </>
);
};

export default Analytics;