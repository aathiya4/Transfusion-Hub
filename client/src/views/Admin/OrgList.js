import React, { useEffect, useState } from "react";
import {Table} from 'react-bootstrap';
import Layout from "../../components/universal/Layout";
import moment from "moment";
import API from "../../services/API";


const OrgList = () => {
  const [data, setData] = useState([]);
  
  const organizations = async () => {
    try {
      const res = await API.get("/admin/org-list");
      
      if (res.data?.success) {
        setData(res.data?.orgData);
      }
    } catch (error) {
      console.log("error",error);
    }
  };

  useEffect(() => {
    organizations();
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
            <th scope="col">Contact Number</th>
            <th scope="col">Date of Registration</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName}</td>
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

export default OrgList;
