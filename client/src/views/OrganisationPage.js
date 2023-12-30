import React, { useEffect, useState } from "react";
import Layout from "../components/universal/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../services/API";
import {  Table} from 'react-bootstrap';

const OrganisationPage = () => {
  
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  
  const Organizns = async () => {
    try {
      if (user?.role === "donor") {
        const res = await API.get("/inventory/get-organisation");
         
        if (res.data?.success) {
          setData(res.data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const res= await API.get(
          "/inventory/get-organisation-for-hospital"
        );
      
        if (res.data?.success) {
          setData(res.data?.organisations);
        }
      }
    } catch (error) {
      console.log("error",error);
    }
  };

  useEffect(() => {
    Organizns();
  }, []);

  return (
    <Layout>
      <Table striped bordered hover responsive className="inventory-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Organisation Email</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Address</th>
            <th scope="col">Date of Registration</th>
          </tr>
        </thead>
        <tbody>
        {data?.map((record) => (
  record.organisationName ? (
    <tr key={record._id}>
      <td>{record.organisationName}</td>
      <td>{record.email}</td>
      <td>{record.phone}</td>
      <td>{record.address}</td>
      <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
    </tr>
  ) : null
))}

        </tbody>
        </Table>
    </Layout>
  );
};

export default OrganisationPage;
