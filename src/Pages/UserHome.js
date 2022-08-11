import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import 'reactjs-popup/dist/index.css';
import NewPolicy from './NewPolicy.js';
import NewClaim from './NewClaim.js';
import Footer from "./Footer.js";
import Loading from "./Loading"
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
export default function UserHome() {

  const [userId,setUserId]= useState('');
  const [jwtToken,setjwtToken] = useState('');
  const [policies,setPolicies] = useState([]);
  const [datafetched,setdatafetched] = useState(false);
  const [popup,setpopup] = useState(false);
  const [policyid,setpolicyid]  = useState(null);
  const [popupclaim,setpopupclaim] = useState(false);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  const handleClick = () => {
      setpopup(!popup);
      
      //Do something with the policy
  }

  const handleRaiseClaim = () => {
      setpopupclaim(!popupclaim);
      
  }

  const handleViewClaim = () => {
    //console.log("inside handleviewClaim");
    navigate("/ViewClaims");
  }

  const handlelogout = () => {
    axios.get(`http://localhost:8717/user-ms/users/logout/${userId}`,{
      headers:{
        "Authorization" : `Bearer ${jwtToken}`,
      }
    }).then((res) => {
      if(res.status===200){
        localStorage.clear();
        Swal.fire({
          icon: 'success',
          title: 'We Will See you Soon',
          text: 'Logged out Successfully',

        })
        navigate('/');
      }
    })
  }

  useEffect(()=>{
    const user = localStorage.getItem('userId');
    const jwt = localStorage.getItem('jwtToken');
    console.log(userId);
    setTimeout(() => setLoading(false), 1500)
     
      axios.get( `http://localhost:8717/user-ms/users/allPolicies/${user}`, {
        headers: {
          "Authorization" : `Bearer ${jwt}`, 
        }
      }
        
      ).then(res => {
        if(res.status===200){
          setPolicies(res.data.allPolicies);
          setdatafetched(true);
        }
      }).catch((err) =>{
        if(err.response.status==401){
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
        navigate("/")
    })
      setUserId(user);
      setjwtToken(jwt);
    }
  ,[]);
  
  return (
    <>
      {
        (popup) && <NewPolicy  handleClick = {handleClick}/>
      }
      {    
        (popupclaim) && <NewClaim handleClick = {handleRaiseClaim} policy_id={policyid} />
      }
      {loading==false ?(

      
      <div className="text-center " id="table">
        <div className="row mt-3">
          <div className="col-6 text-left">
            <div className="text-start" id="buyPolicy">
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Buy a new Policy
              </button>
            </div>
          </div>
          <div className="col-6 text-right">
            <div className="text-end" id="logout">
              <button type="button" className="btn btn-primary" onClick={handlelogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-center my-3">My Policies</h2>
        <table className="table table-striped border border-1">
          <thead>
            <tr>
              <th scope="col">Owner Name</th>
              <th scope="col">Policy Type</th>
              <th scope="col">Policy Duration</th>
              <th scope="col">DateOfPurchase</th>
              <th scope="col">DateOfExpiry</th>
              <th scope="col">VehileRegNo</th>
              <th scope="col">Your action</th>
            </tr>
          </thead>
          <tbody>
              
          {(datafetched)  &&
            policies.map((data) => {
                return (
                  <tr key={data.policyId} className="px-2 py-2" >
                    <td>{data.policyOwnerName}</td>
                    <td>{data.policyType}</td>
                    <td>{data.policyDuration}</td>
                    <td>{data.dateOfPolicyPurchase}</td>
                    <td>{data.dateOfPolicyExpire}</td>
                    <td>{data.vehicleRegNo}</td>
                    {(data.status === false) ? <td><Button className="btn btn-primary" onClick = {() => {
                        setpolicyid(data.policyId);
                        handleRaiseClaim()}} > Raise a Claim </Button></td> 
                        : 
                        <td><Button className="btn btn-primary" disabled="true" > Claimed </Button></td>
                      }
                    
                  </tr>
                )
              })
               
            }
          </tbody>
        </table>
  
        {
          (policies.length === 0) && <div className="text-center" ><p>You have no active policies to view. Please buy a new policy</p></div>
        }
        <div className="text-center">
          <Button className="btnbtn-primary" onClick={handleViewClaim}>View Claims Raised</Button>
        </div>
        <img src="https://media.istockphoto.com/vectors/car-insurance-concept-idea-of-security-and-protection-of-property-vector-id1267292912?k=20&m=1267292912&s=612x612&w=0&h=RusAD5J1-j2BqKeXrlvvyK7Zodp2Py5P6EpwkfWn3zc=" class="img-fluid" alt="Phone image" />
      </div>
      ):(<Loading/>)}
      <Footer/>
    </>
  )
}
