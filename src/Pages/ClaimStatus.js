import React,{useEffect, useState} from 'react';
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function ClaimStatus(props){

    const [isShow, invokeModal] = React.useState(true);
    
    const claimDescription = props.claimDescription;
    const claimAmount = props.claimAmount;
    const [claimStatus,setClaimStatus] = useState('');
    const [comments,setcomments] = useState('') 
    const policyid = props.policyid;
    const navigate = useNavigate();
    const initModal = () => {
        return invokeModal(!isShow)
    }

    useEffect(() => {

        const user = localStorage.getItem('userId');
        const jwt = localStorage.getItem('jwtToken');
         axios.get(`http://localhost:8717/user-ms/users/claimStatus/${user}/${policyid}`,
         {
            headers:{
                "Authorization" : `Bearer ${jwt}`,
            }
        }).then((res) =>{
            if(res.status === 200){
                setClaimStatus(res.data.claimStatus);
                if(res.data.adminClaimDescription !== null){
                setcomments(res.data.adminClaimDescription);}
                console.log(res.data);
            }
        }).catch((err) =>{
            if(err.response.status === 401){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Please Login to Continue',
            
                  })
                navigate('/');
            }
            navigate('/');
        })
    });

    return (
        <>
        <Modal show={props.handleClick} className=" modal-lg" >
            <Modal.Header closeButton onClick={props.handleClick}>
            <Modal.Title>Status of your Claim ...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className=' mt-4'>
                        <h5 className='font-weight-bold'>Claim Description</h5>
                        <p className='border border-black px-3 py-3'>{claimDescription}</p>
                    </div>
                    <div  className=' mt-4'>
                        <h5 className='font-weight-bold'>Claim Amount</h5>
                        <p className='border border-black px-3 py-3'>{claimAmount}</p>
                    </div>
                    <div  className=' mt-4'>
                        <h5 className='font-weight-bold'>Claim Status</h5>
                        <p className='border border-black px-3 py-3'>{claimStatus}</p>
                    </div>
                    
                    {
                        (comments.length > 0) && <div className='mt-3'>
                                <h5 className='font-weight-bold'>Admin Comments</h5>
                                <p className='border border-black px-3 py-3'>{comments}</p>
                            </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={props.handleClick}>
                Close
            </Button>
            
            </Modal.Footer>
        </Modal>
        </>
    );
}