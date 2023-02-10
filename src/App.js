import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  MDBTable,
  MDBTableHead,
  MDBTableBody
}
  from 'mdb-react-ui-kit';

function App() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    studenClass: "",
    division: "",
    gender: ""
  });

  const [loading, setLoading] = useState(false);

  const [Students,SETstudent]=useState([
    {id:"",name:"",dob:"",cls:"",div:"",gender:""}
  ])

  const handleClear = () => {
    setFormData("");
  };

  const { name, dob, studenClass, division, gender } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/student', formData)
      .then(data => {
        handleClear();
        window.alert("successfully added")
        
        // console.log(data);
      })
    console.log(formData);
  };

  useEffect(() => {
    setLoading(true);
    // Fetch data from Tomcat server
    axios.get('http://localhost:8080/allstudents')
      .then((data) => {
        console.log(data.data,'DATA COMING');
        SETstudent(data.data);
        // setFormData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  });

  return (
    <MDBContainer fluid className='bg-dark '>
      <MDBRow className='d-flex justify-content-center h-100 ' style={{ paddingTop: "50px", paddingBottom: "50px" }}>
        <MDBCol>
          <MDBCard className='my-4 '>
            <MDBRow className='g-0'>
              <MDBCol md='12' className="d-none d-md-block">
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-5 text-uppercase fw-bold">Student registration form</h3>
                  <form onSubmit={onSubmit}>
                    <MDBRow>
                    <MDBCol md='12'>
                        <MDBInput wrapperClass='mb-4' label='Name' size='lg' id='form1' type='text' name="name"
                          value={name}
                          onChange={onChange}
                          required />
                      </MDBCol>
                    </MDBRow>
                    <MDBInput wrapperClass='mb-4' label='Birthday' size='lg' id='form3' type='date' name="dob"
                      value={dob}
                      onChange={onChange}
                      required />
                    <div className='d-md-flex ustify-content-start align-items-center mt-2 mb-4'>
                      <h6 className="fw-bold mb-0 " style={{ marginRight: "42px" }}>Class: </h6>
                      <select defaultValue={"I"} name="studenClass" value={studenClass} onChange={onChange} required>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="VI">VI</option>
                        <option value="VII">VII</option>
                        <option value="VIII">VIII</option>
                        <option value="IX">IX</option>
                        <option value="X">X</option>
                        <option value="XI">XI</option>
                        <option value="XII">XII</option>
                      </select>
                    </div>
                    <div className='d-md-flex ustify-content-start align-items-center mt-2 mb-4'>
                      <h6 className="fw-bold mb-0 me-4">Division: </h6>
                      <select defaultValue={"A"} name="division" value={division} onChange={onChange}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                    <div className='d-md-flex ustify-content-start align-items-center mt-2 mb-4'>
                      <h6 className="fw-bold mb-0 me-4">Gender: </h6>
                      <MDBRadio name='gender' id='female' value='female' label='Female' onChange={onChange} inline required/>
                      <MDBRadio name='gender' id='male' value='male' label='Male' onChange={onChange} inline />
                      <MDBRadio name='gender' id='other' value='other' label='Other' onChange={onChange} inline />
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                      <MDBBtn color='light' size='lg' type="reset" onClick={handleClear}>Reset all</MDBBtn>
                      <MDBBtn className='ms-2' color='warning' size='lg' type="submit" value="Register">Submit form</MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBTable>
            <MDBTableHead className="text-white">
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>DOB</th>
                <th scope='col'>Class</th>
                <th scope='col'>Division</th>
                <th scope='col'>Gender</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody className="text-white">
            {Students.map(item=>(        
                <tr key={item.id}>
                  <td >
                    <div className='d-flex align-items-center'>
                      <p className='fw-bold mb-1'>{item.id}</p>
                    </div>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.name}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.dob}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.studenClass}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.division}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.gender}</p>
                  </td>
                </tr>            
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;