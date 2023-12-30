import React, { useEffect, useState } from "react";
import {Table} from 'react-bootstrap';
import Layout from "../../components/universal/Layout";
import moment from "moment";
import API from "../../services/API";

const DonorList = () => {
  const [data, setData] = useState([]);
  
  const donors = async () => {
    try {
      const { data } = await API.get("/admin/donor-list");
      
      if (data?.success) {
        setData(data?.donorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    donors();
  }, []);

 
  const deletefunc = async (id) => {
    try {
      const answer = window.confirm("Are you sure you want to delete this donor?");
      if (!answer) return;
  
      const response = await API.delete(`/admin/delete-donor/${id}`);
      alert(response.data?.message);
      window.location.reload();
    } catch (error) {
      console.error("Error in deletion:", error);
    }
  };

  return (
    <Layout>
      <Table striped bordered hover responsive className="inventory-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organisationName + " (ORG)"}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deletefunc(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default DonorList;
