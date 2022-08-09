import React,{useEffect, useState} from 'react';
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function SetClaimAction(props){

    const [isShow, invokeModal] = useState(true);
    
    const [adminClaimDescription,setadminclaimDescription] = useState("");
    // const [claimAmount,] = useState(0);
    const [claimStatus,setClaimStatus] = useState('');
    const [comments,setcomments] = useState('') 
    const claimid = props.claimid;
    const claimDescription = props.claimDescription ;
    const claimAmount=props.claimAmount;
    const navigate = useNavigate();
    const initModal = () => {
        return invokeModal(!isShow)
    };

    const handleSubmit =() => {
        const jwtToken = localStorage.getItem("jwtToken");
        var st;
        if(claimStatus === 'accepted'){
            st = `http://localhost:8717/user-ms/admin/acceptClaim/${claimid}`;
        }
        else{
            st = `http://localhost:8717/user-ms/admin/rejectClaim/${claimid}`;
        }
        const data={
            "adminClaimDescription" : adminClaimDescription,
            "claimStatus" : claimStatus,
        }
        // console.log(adminClaimDescription);
        // console.log(claimStatus);
        axios.put(st,data,{
            headers : {
                "Authorization" : `Bearer ${jwtToken}`,
            }
        }).then((res) => {
            if(res.status === 200){
                if(claimStatus === 'Accepted')
                alert("Claim Accepted.It will get reflected in Client's Claim Status");
                else if(claimStatus==='Rejected'){
                    alert("You rejected a claim. The same is conveyed to your customer");
                }
                window.history.reload();
            }
            else{
                alert("Something went wrong. Please try again after sometime");
            }
            props.handleClick();

        }).catch((err) =>{
            console.log(err);
            // if(err.status === 401){
            //     alert("please login again");
            //     navigate('/');
            // }
            // navigate('/');
        })
    }

    return (
        <>
        <Modal show={props.handleClick} className=" modal-lg" >
            <Modal.Header closeButton onClick={props.handleClick}>
            <Modal.Title>Respond to your client ...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className=' mt-3'>
                        <h5 className='font-weight-bold'>Claim Description</h5>
                        <p className='border border-black px-3 py-3'>{claimDescription}</p>
                    </div>
                    <div className='mt-3'>
                        <h5 className='font-weight-bold'>Claim Amount</h5>
                        <p className='border border-black px-1 py-1'>{claimAmount}</p>
                    </div>
                    <div className=' mt-3'>
                        
                        <h5 className='font-weight-bold'>Accept or Reject</h5>
                        <select id="status" name="status" onChange = {(e) => setClaimStatus(e.target.value)} >
                            <option value=".">.</option>
                            <option value="Accepted" className='fill-red'>Accept</option>
                            <option value="Rejected">Reject</option>
                        </select>
                    </div>
                    <div className='mt-5'>
                        <h5 className="font-weight-bold">Write something about your decision</h5>
                        <textarea className='form-control-lg px-3 py-3' rows="5" cols="40" name="admindescription" value = {adminClaimDescription}
                            onChange={(e) => setadminclaimDescription(e.target.value)} />

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={props.handleClick}>
                Close
            </Button>
            <Button className="btn-primary" onClick={handleSubmit}>
                Post
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}