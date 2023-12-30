import React from 'react';
import Layout from '../../components/universal/Layout';
import { useSelector } from 'react-redux';
import { Container} from 'react-bootstrap';



const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <Container className="admin-home-container mt-4">
        <h1 className="text-center">
          Welcome to the Transfusion Hub, Admin <span className="admin-name">{user?.name}</span>
        </h1>
        <p className="intro-text text-center mt-3">
          As an administrator, you have the power to manage organizations, medical facilities, and donors,
          ensuring the efficient operation of the blood bank.
        </p>

        
      </Container>
    </Layout>
  );
};

export default AdminHome;