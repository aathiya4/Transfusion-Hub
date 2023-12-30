

// import React, { useState } from 'react';
// import { useSelector } from "react-redux";
// import { Card, Button, Form } from 'react-bootstrap';
// import { FaChevronDown, FaChevronUp, FaPlusSquare } from 'react-icons/fa';
// import API from "../../services/API";

// const CollapsibleForm = () => {
//   const [inventoryType, setInventoryType] = useState("in");
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [quantity, setQuantity] = useState(0);
//   const [email, setEmail] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const { user } = useSelector((state) => state.auth);

//   const handleFormSubmit = async () => {
//     try {
//             if (!bloodGroup || !quantity) {
//               return alert("Please Provide All Fields");
//             }
//             const { data } = await API.post("/inventory/create-inventory", {
//               email,
//               organisation: user?._id,
//               inventoryType,
//               bloodGroup,
//               quantity,
//             });
//             if (data?.success) {
//               alert("New Record Created");
//               window.location.reload();
//             }
//           } catch (error) {
//             alert(error.response.data.message);
//             console.log(error);
//             window.location.reload();
//           }
//         };
  

//         const handleInventoryTypeChange = (value) => {
//           setInventoryType(value === 'donor' ? 'in' : 'out');
//         };

//   return (
//     <Card>
//       <Card.Header onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
//         <FaPlusSquare /> Add Record {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//       </Card.Header>
//       {isOpen && (
//         <Card.Body>
//           <Form>
//             {/* Inventory Type Selection */}
//             <Form.Group className="mb-3">
//               <Form.Label>Role</Form.Label>
//               <Form.Select onChange={(e) => handleInventoryTypeChange(e.target.value)}>
//               <option value="select" >Select </option>
//                 <option value="donor">Donor(Inventory:IN)</option>
//                 <option value="hospital">Hospital(Inventory:OUT)</option>
//               </Form.Select>
//             </Form.Group>

//             {/* Blood Group Selection */}
//             <Form.Group className="mb-3">
//               <Form.Label>Blood Group</Form.Label>
//               <Form.Select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
//               <option value="select" >Select </option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//               </Form.Select>
//             </Form.Group>

//             {/* Quantity Input */}
//             <Form.Group className="mb-3">
//               <Form.Label>Quantity (ML)</Form.Label>
//               <Form.Control 
//                 type="number" 
//                 value={quantity} 
//                 onChange={(e) => setQuantity(e.target.value)} 
//               />
//             </Form.Group>

//             {/* Donor Email Input */}
//             <Form.Group className="mb-3">
//               <Form.Label>Donor Email</Form.Label>
//               <Form.Control 
//                 type="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//               />
//             </Form.Group>

           
//             <Button variant="primary" onClick={handleFormSubmit}>Submit</Button>
//           </Form>
//         </Card.Body>
//       )}
//     </Card>
//   );
// };

// export default CollapsibleForm;


import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Card, Button, Form } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaPlusSquare } from 'react-icons/fa';
import API from "../../services/API";

const CollapsibleForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [inventoryType, setInventoryType] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState(user?.email || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.role === 'donor') {
      setInventoryType('in');
      setEmail(user.email);
    } else if (user?.role === 'hospital') {
      setInventoryType('out');
      setEmail(user.email);
    }
  }, [user]);

  const handleFormSubmit = async () => {
        try {
                if (!bloodGroup || !quantity) {
                  return alert("Please Provide All Fields");
                }
                const { data } = await API.post("/inventory/create-inventory", {
                  email,
                  organisation: user?._id,
                  inventoryType,
                  bloodGroup,
                  quantity,
                });
                if (data?.success) {
                  alert("New Record Created");
                  window.location.reload();
                }
              } catch (error) {
                alert(error.response.data.message);
                console.log(error);
                window.location.reload();
              }
            };

  return (
    <Card>
      <Card.Header onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
        <FaPlusSquare /> Add Record {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Card.Header>
      {isOpen && (
        <Card.Body>
          <Form>
          {user?.role === 'organisation' && (
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select value={inventoryType} onChange={(e) => {
                  setInventoryType(e.target.value);
                  setEmail(''); // Clear email when changing role
                }}>
                  <option value="select" >Select </option>
                  <option value="in">Donor(Inventory Type:IN)</option>
                  <option value="out">Hospital(Inventory Type:OUT)</option>
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
              <option value="select" >Select </option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                 <option value="A+">A+</option>
                 <option value="A-">A-</option>
                 <option value="B+">B+</option>
                 <option value="B-">B-</option>
                 <option value="AB+">AB+</option>
                 <option value="AB-">AB-</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity (ML)</Form.Label>
              <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </Form.Group>

            {(user?.role === 'organisation') && (inventoryType === 'in') && (
              <Form.Group className="mb-3">
                <Form.Label>Donor Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
            )}

            {(user?.role === 'organisation') && (inventoryType === 'out') && (
              <Form.Group className="mb-3">
                <Form.Label>Hospital Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
            )}

            <Button variant="primary" onClick={handleFormSubmit}>Submit</Button>
          </Form>
        </Card.Body>
      )}
    </Card>
  );
};

export default CollapsibleForm;
