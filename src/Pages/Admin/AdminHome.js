import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../Footer";
import axios from "axios";
import Loading from "../Loading"
import Swal from 'sweetalert2';
export default function AdminHome() {

  const [userId, setuserId] = useState('');
  const [jwtToken, setjwtToken] = useState('');
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();


  useEffect(() => {
    const user = localStorage.getItem('userId');
    const jwt = localStorage.getItem('jwtToken');

    if (jwt=== null || user.length === 0 || jwt === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Please Login to Continue',

      })
      navigate('/');

    }
    setuserId(user);
    setjwtToken(jwt);
    setTimeout(() => setLoading(false), 2500)
  }, []);

  const handlelogout = () => {
    axios.get(`http://localhost:8717/user-ms/users/logout/${userId}`, {
      headers: {
        "Authorization": `Bearer ${jwtToken}`,
      }
    }).then((res) => {
      if (res.status === 200) {
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


  return (
    <>

      <div style={{ textAlign: "right" }}>
        <button type="button" className="btn btn-primary my-3 mx-3" onClick={handlelogout}>
          Log out
        </button>
      </div>
      <h2 className="text-center">Admin DashBoard</h2>

      <div className="row d-flex row-cols-1 row-cols-3 mx-3 my-3 justify-content-center">
        <div className="row">
          <div
            className="card text-white bg-success mb-3 my-3 mx-auto"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Accepted Claims</div>
            <div className="card-body">
              <p className="card-text">..</p>
              <a href="/acceptedclaims" class="stretched-link" />
            </div>
          </div>
        </div>

        <div className="row">
          <div
            className="card text-white bg-warning mb-3 my-3 mx-auto"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Pending Claims</div>
            <div className="card-body">
              <p className="card-text">..</p>
              <a href="/pendingclaims" className="stretched-link" />
            </div>
          </div>
        </div>

        <div className="row">
          <div
            className="card text-white bg-danger mb-3 my-3 mx-auto"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Rejected Claims</div>
            <div className="card-body">
              <p className="card-text">..</p>
              <a href="/rejectedclaims" class="stretched-link" />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}