import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "react-bootstrap";
import axios from "axios";
import SetClaimAction from "./SetClaimAction";
import image from '../../Pictures/empty.webp';
export default function PendingClaims() {

  const [claims,setclaims] = useState([]);
  const [userId,setuserId] = useState("");
  const [jwtToken,setjwtToken] = useState("");
  const [datafetched,setdatafetched] = useState(false);
  const [popup,setpopup] = useState(false);
  const [claimid,setclaimid] = useState('');
  const [claimDescription,setclaimDescription] = useState('');
  const [claimAmount,setclaimAmount]=useState(0);
  const navigate = useNavigate();

  useEffect(() => {
      const user = localStorage.getItem('userId');
      const jwt = localStorage.getItem('jwtToken');
      console.log(userId);
      // if(user.length === 0 || jwt.length === 0){
      //   alert("You are not authorized to view this page. Please Login First");
      //   navigate("/");
      // }
      // else{
        axios.get(`http://localhost:8717/user-ms/admin/pendingClaims`,{
          headers : {
            'Authorization': `Bearer ${jwt}`,
          }
        }).then((res) => {
          if(res.status === 200){
            setclaims(res.data);
            console.log(res);
            setdatafetched(true);
          }
        }).catch((err) =>{
          if(err.status === 401){
              alert("please login again");
              navigate('/');
          }
      })
      setuserId(user);
      setjwtToken(jwt);
      }
  ,[]);

  const handleClick = () => {
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
        alert("Successfully logged out");
        navigate('/');
      }
    }).catch((err) =>{
      // if(err.status === 401){
      //     alert("please login again");
      //     navigate('/');
      // }
      navigate('/');
  })
  }

  return (
    <>
      {
          (popup) && <SetClaimAction claimDescription={claimDescription} claimid={claimid} claimAmount={claimAmount} handleClick={handleClick} />
      }
      
      <div id="table">
        <div style={{ textAlign: "right" }}>
          <button type="button" className="btn btn-primary mt-2 mx-2" onClick={handlelogout}>
            Log out
          </button>
        </div>
        <h2 className="text-center my-3">Pending Claims</h2>
        <table className="table table-striped px-3 mx-2 py-3 border border-1" >
          <thead>
            <tr>
              <th scope="col">Claim Id</th>
              <th scope="col">Claim Description</th>
              <th scope="col">Claim Amount</th>
              <th scope="col">Status</th>
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
                        <td>{data.claimStatus}</td>
                        <td><Button className='btn-primary' onClick={(e) =>{
                            setclaimid(data.claimId);
                            setclaimDescription(data.claimDescription);
                            setclaimAmount(data.claimAmount);
                            handleClick();
                        }}>Action</Button></td>
                    </tr>
                    )
                })
                
                }
          </tbody>
        </table>
        {
        (datafetched) && (claims.length === 0) && <div className="text-center" >
          <img src={image} alt="null"  />
        </div>
        }
      </div>
    </>
  );
}
