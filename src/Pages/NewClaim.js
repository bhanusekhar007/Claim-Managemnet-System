import React,{useState} from 'react';
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function NewClaim(props){
    
    const [isShow, invokeModal] = React.useState(true);
    
    const [claimDescription,setclaimDescription] = useState("");
    const [claimAmount,setclaimAmount] = useState();
    const navigate = useNavigate();
    const initModal = () => {
        return invokeModal(!isShow)
    }

    const handleSubmit = async(e) => {
        const userId = localStorage.getItem("userId");
        const jwttoken = localStorage.getItem("jwtToken");
        const policyid = props.policy_id;
        const formData  = {
            "claimDescription" : claimDescription,
            "claimAmount" : claimAmount
        }
        console.log(policyid);
        await axios.post(`http://localhost:8717/user-ms/users/addClaim/${userId}/${policyid}`,
                formData,{
                    headers :{
                        // eslint-disable-next-line no-template-curly-in-string
                        "Authorization" : `Bearer ${jwttoken}`,
                    }
                    }
                ).then((res) =>{
                    if(res.status === 200){
                      Swal.fire({
                        icon: 'success',
                        title: 'Request Successful',
                        text: 'Claim Added Successfully',
              
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
        props.handleClick();
        e.preventDefault();
    }

    return(
          <>
      <Modal show={props.handleClick} className=" modal-lg" >
        <Modal.Header closeButton onClick={props.handleClick}>
          <Modal.Title>Raise a new Claim...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
                    <div className="form-outline mb-3">
                        <label className="form-label" >
                            Claim Description
                        </label>
                      <textarea
                        id="claimDescription"
                        className="form-control form-control-lg"
                        value={claimDescription}
                        rows="5"
                        placeholder="Write the details of the issue properly. You may not claim agian if there are any mistakes "
                        onChange = {(e) => setclaimDescription(e.target.value) }
                        required
                      />
                      
                    </div>

                    <div className='for-outline mb-4'>
                        <label className='form-label'>
                            Claim Amount
                        </label>
                        <input 
                            type ="number"
                            id="claimAmount"
                            className = "form-control form-control-lg"
                            value={claimAmount}
                            onChange = {(e) => setclaimAmount(e.target.value)}
                        />     
                    </div>

                    
                    
      </form>
                  
        </Modal.Body>
        <Modal.Footer>
          <p>{props.policy_id}</p>
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