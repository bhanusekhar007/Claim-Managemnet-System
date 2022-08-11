import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ClaimStatus from './ClaimStatus';
import { useNavigate } from 'react-router-dom';
import image from '../Pictures/claims.jpg';
import Footer from './Footer';
import Swal from 'sweetalert2';
import Loading from './Loading';

export default function ViewClaims() {

    const [claims,setclaims] = useState([]);
    const [datafetched,setdatafetched] = useState(false);
    const [userId,setUserId] = useState('');
    const [jwtToken,setJwtToken] = useState('');
    const [popup,setpopup] = useState(false);
    const [policyid,setpolicyid] = useState('');
    const [message,setmessage] = useState(false);

    const [claimDescription,setclaimDescription] = useState('');
    const [claimAmount,setclaimAmount] = useState();
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('userId');
        const jwt = localStorage.getItem('jwtToken');
        setTimeout(() => setLoading(false), 2500)
        
            axios.get(`http://localhost:8717/user-ms/users/getAllClaims/${user}`,
            {
                headers:{
                    "Authorization" : `Bearer ${jwt}`,
                }
            }
            ).then((res) => {
                if(res.status === 200){
                    setclaims(res.data);
                    setdatafetched(true);
                }
                if(res.status === 204){
                    setmessage(true);
                }
            }).catch(err=>{
                if(err.response.status===401){
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

            setUserId(user);
            setJwtToken(jwt);
        }
    ,[]);

    const handleClick = (e) => {
        setpopup(!popup);
        
       
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

    return(
        <>
            {
                (popup) && <ClaimStatus  handleClick = {handleClick} policyid = {policyid} 
                        claimDescription={claimDescription} claimAmount={claimAmount}
                    />
            }
            <div className="mt-2 mx-2 text-right justify-content-right">
                <div className="text-end " id="logout">
                <Button  className="btn btn-primary" onClick={handlelogout}>
                    Log out
                </Button>
                </div>
            </div>
            <div className='text-center' id="table">

            <h2 className="text-center my-3">My Claims</h2>
            <table className="table table-striped table-centered border border-1">
            <thead>
                <tr>
                <th scope="col">Claim id</th>
                <th scope="col">Claim Description</th>
                <th scope="col">Claim Amount</th>
                </tr>
            </thead>
            <tbody>
                
            {(datafetched)  &&
                claims.map((data) => {
                    return (
                    <tr key={data.claimId} >
                        <td>{data.claimId}</td>
                        
                        <td>{data.claimDescription}</td>
                        <td>{data.claimAmount}</td>
                        
                        <td><Button className="btn-primary" onClick={(e) => {
                            setpolicyid(data.policyId);
                            setclaimAmount(data.claimAmount);
                            setclaimDescription(data.claimDescription);
                            handleClick(e)
                        }}>View Status</Button></td>
                        
                    </tr>
                    )
                })
                
                }
            
            </tbody>
            </table>
            {
            (message) && <div className="text-center" ><p>You have no active claims to view. Please raise a claim to your policies</p></div>
            }
            <img src={image}></img>
            </div>
            <Footer/>
            
        </>
    )
}