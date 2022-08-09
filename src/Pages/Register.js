import React, { Component,Redirect } from 'react'
//import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios';
import {Link, Navigate } from  'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            check: false,
            isregistered: false,
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    onChange = (e) => this.setState({ [e.target.id]: e.target.value });
    
    
     handleSubmit(event) {

           axios.post(`http://localhost:8717/user-ms/users`,{
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password
            
            }).then(function (res){
                if(res.status === 201){
                    alert("Registered Succesfully");
                    this.setState({isregistered : true});
                    <Redirect to='/'/>
                }
                if(res.status === 409){
                  alert("User already exits, Please try with a new mail ");
                }
                
            }).catch(function (err){
                if(err.status === 409){
                  alert("User already exits, Please try with a new mail ");
                }
            })
            event.preventDefault();
    }


    render() {
        
        return (
        <> 
        {
        (this.state.isregistered) && <Navigate to={{pathname : "/"}} />
        }
            <div className="mask d-flex align-items-center h-100 gradient-custom-3 mt-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px;" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={this.handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="name"
                        className="form-control form-control-lg"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      <label className="form-label" >
                        Your Name
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      <label className="form-label" >
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      <label className="form-label" >
                        Password
                      </label>
                    </div>

                      
                    

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        name="check"
                        id="check"
                        value={this.state.check}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" >
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                    
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
        )
    }
}