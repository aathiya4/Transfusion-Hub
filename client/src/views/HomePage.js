
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/universal/Loader";
import Layout from "../components/universal/Layout";
import CollapsibleForm from "../components/universal/CollapsibleForm";
import API from "../services/API";
import moment from "moment";
import { Container, Table } from 'react-bootstrap';

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const InventoryRecords = async () => {
    try {
      const res= await API.get("/inventory/get-inventory");
      if (res.data?.success) {
        setData(res.data?.inventory);
      }
    } catch (error) {
      console.log("error",error);
    }
  };

  useEffect(() => {
    InventoryRecords();
  }, []);

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Loader />
      ) : (
        <Container className="home-page">
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
              {data?.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity}</td>
                  <td>{record.email}</td>
                  <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <CollapsibleForm />
        </Container>
      )}
    </Layout>
  );
};

export default HomePage;

