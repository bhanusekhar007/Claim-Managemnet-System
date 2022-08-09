import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import image from "../../Pictures/empty.webp";

export default function AcceptedClaims() {

  const [claims,setclaims] = useState([]);
  const [userId,setuserId] = useState('');
  const [jwtToken,setjwtToken] = useState('');
  const [datafetched,setdatafetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userId');
    const jwt = localStorage.getItem('jwtToken');
      console.log(user);
      // if(user.length === 0 || jwt.length === 0){
      //   alert("You are not authorized to view this page. Please Login First");
      //   navigate("/");
      // }
      
        axios.get(`http://localhost:8717/user-ms/admin/acceptedClaims`,{
          headers : {
            'Authorization': `Bearer ${jwt}`,
          }
        }).then((res) => {
          if(res.status === 200){
            setclaims(res.data);
            console.log(res);
            
          }
        }).catch((err) =>{
          // if(err.status === 401){
          //     alert("please login again");
          //     navigate('/');
          // }
          navigate('/');
      })
      setdatafetched(true);
      setuserId(user);
      setjwtToken(jwt);
      }
  ,[]);

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
    })
  }



  return (
    <>
      
      <div id="table">
        <div style={{ textAlign: "right" }}>
          <button type="button" className="btn btn-primary mx-2 mt-2" onClick={handlelogout}>
            Log out
          </button>
        </div>
        <h2 className="text-center my-3">Accepted Claims</h2>
        <div className="text-center" id="table">

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Claim Description</th>
              <th scope="col">Admin Claim Description</th>
              <th scope="col">Claim Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
          {(datafetched)  &&
                claims.map((data) => {
                    return (
                    <tr key={data.claimId} >
                        <td>{data.claimDescription}</td>
                        
                        <td>{data.adminClaimDescription}</td>
                        <td>{data.claimAmount}</td>
                        <td>{data.claimStatus}</td>
                    </tr>
                    )
                })
                
                }
          </tbody>
        </table>
        {
        (datafetched) && (claims.length === 0) && <div className="text-center" >
          <img src={image} alt="null" />
        
          </div>
        }
      </div>
      </div>
    </>
  );
}
