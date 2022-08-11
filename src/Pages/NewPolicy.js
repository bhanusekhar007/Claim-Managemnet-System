/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
function NewPolicy(props) {
  const [isShow, invokeModal] = React.useState(true);

  

  const [policyownername,setpolicyownername] = useState('');
  const [policytype,setpolicytype] = useState(null);
  const [VehicleRegNo,setvehicleregno] = useState('');
  const [ownerAddress,setowneraddress] =  useState('');
  const [phone,setphone] = useState('');
  const [city,setcity] = useState('');
  const [state,setstate] = useState('');
  const [pincode,setpincode] = useState(null);
  const [policyDuration,setpolicyDuration] = useState('');  
  const navigate = useNavigate();

  const   handleSubmit = async(e) =>{
    console.log(city,state,pincode);
    const userId = localStorage.getItem("userId");
    const jwttoken = localStorage.getItem("jwtToken");
    const formData = {
        "policyOwnerName" : policyownername,
        "policyType" : policytype,
        "vehicleRegNo" : VehicleRegNo,
        "ownerAddress" : ownerAddress,
        "phone" : phone,
        "city" : city,
        "state" : state,
        "pincode" : pincode,
        "policyDuration" : policyDuration
    };
    await axios.post(`http://localhost:8717/user-ms/users/addPolicy/${userId}`,
        formData,{
            headers :{
                "Authorization" : `Bearer ${jwttoken}`,
            }
        }
    ).then((res) =>{
        if(res.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Request Successful',
            text: 'Policy Added Successfully',
  
          })
           navigate('/');
        }
    }).catch((err) =>{
      if(err.response.status === 401){
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Please Login to Continue',
  
        })
          
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something Went Wrong!',
  
        })
      }
      navigate('/');
  })
    e.preventDefault();
  }

  const initModal = () => {
    return invokeModal(!isShow)
  }
  return (
    <>
      <Modal show={props.handleClick} className=" modal-lg" >
        <Modal.Header closeButton onClick={props.handleClick}>
          <Modal.Title>Get a new policy here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
                    <div className="form-outline mb-3">
                    <label className="form-label" for="form3Example1cg">
                        Policy Owner Name
                      </label>
                      <input
                        type="text"
                        id="policyownername"
                        className="form-control form-control-lg"
                        value={policyownername}
                        onChange = {(e) => setpolicyownername(e.target.value) }
                        required
                      />
                    </div>

                    <div className='for-outline mb-4'>
                        <p>Policy Type  <span>
                            <select id="policytype" name="policytype" 
                                value={policytype}
                                onChange = {(e) => setpolicytype(e.target.value)}
                                
                                >
                                <option value="">.</option>
                                <option value="Two Wheeler">Two Wheeler</option>
                                <option value="Three Wheeler">Three Wheeler</option>
                                <option value="Four Wheeler">Four Wheeler</option>
                            </select>
                            </span></p>
                    </div>

                    <div className="form-outline mb-3">
                    <label className="form-label" for="form3Example3cg">
                        Vehicle Registration Number
                      </label>
                      <input
                        type="text"
                        id="VehicleRegNo"
                        className="form-control form-control-lg"
                        value={VehicleRegNo}
                        onChange = {(e) => setvehicleregno(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                    <label className="form-label" >
                        Owner Address
                      </label>
                      <input
                        type="address"
                        id="ownerAddress"
                        className="form-control form-control-lg"
                        value = {ownerAddress}
                        required
                        onChange = {(e) => setowneraddress(e.target.value)}
                      />
                    </div>

                    <div className='form-outline mb-4'>
                    <label className='form-label'>
                            Phone Number
                        </label>
                        <input 
                            type="phone"
                            id="phone"
                            className="form-control form-control-lg"
                            value = {phone}
                            required
                            onChange = {(e) => setphone(e.target.value)}
                        />
                    </div>

                    <div className='form-outline mb-4'>
                    <label className='form-label'>
                            City
                        </label>
                        <input 
                            type="text"
                            id="city"
                            className="form-control form-control-lg"
                            required
                            value = {city}
                            onChange ={(e) => setcity(e.target.value)}
                        />
                    </div>

                    <div className='form-outline mb-4'>
                    <label className='form-label'>
                            State
                        </label>
                        <input 
                            type="text"
                            id="state"
                            className="form-control form-control-lg"
                            value = {state}
                            required
                            onChange = {(e) => setstate(e.target.value)}
                        />
                    </div>

                    <div className='form-outline mb-4'>
                    <label className='form-label'>
                            Pin Code
                        </label>
                        <input 
                            type="number"
                            id="pincode"
                            className="form-control form-control-lg"
                            value = {pincode}
                            required
                            onChange = {(e) => setpincode(e.target.value)}
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <p>Policy Duration.<span>
                        <select id="policyDuration" name="policyDuration"
                            value = {policyDuration}
                            
                            onChange = {(e) => setpolicyDuration(e.target.value)}
                        >
                            <option value="3 months"> 3 months </option>
                            <option value="6 months">6 months</option>
                            <option value="12 months">12 months</option>
                            <option value="24 months">24 months</option>    
                        </select> </span>   </p>
                    </div>                     
                    

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        name="check"
                        id="check"
                        required
                      />
                      <label className="form-check-label" >
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>
                    
                  </form>
                  
        </Modal.Body>
        <Modal.Footer>
        <p>{policytype}</p>
          <Button variant="danger" onClick={props.handleClick}>
            Close
          </Button>
          <Button className="btn-primary" onClick={handleSubmit}>
            Submit
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default NewPolicy;