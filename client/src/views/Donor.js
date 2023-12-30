import React, { useEffect, useState } from "react";
import Layout from "../components/universal/Layout";
import API from "../services/API";
import moment from "moment";
import {  Table} from 'react-bootstrap';


const Donor = () => {
  const [data, setData] = useState([]);
  
  const Donors = async () => {
    try {
      const res = await API.get("/inventory/get-donors");
      
      if (res.data?.success) {
        setData(res.data?.donors);
      }
    } catch (error) {
      console.log("error",error);
    }
  };

  useEffect(() => {
    Donors();
  }, []);

  return (
    <Layout>
      
      <Table striped bordered hover responsive className="inventory-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Donor Email</th>
            <th scope="col">Address</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Date of Registration</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organisationName + " (ORG)"}</td>
              <td>{record.email}</td>
              <td>{record.address}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
        </Table>
        
    </Layout>
  );
};

export default Donor;
