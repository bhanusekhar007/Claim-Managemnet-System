import React, { Component ,Redirect} from 'react';
//import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import image from '../Pictures/home.jpg';
import Footer from './Footer';
import './Login.css'
export default class Login extends Component {
  constructor(props) {
    var flag;
    if(localStorage.getItem('jwtToken')==null){
      flag=false;
    }else{
      flag=true;
    }
    super(props);
    this.state = {
      email: '',
      password: '',
      isloggedin:flag,
      showError:false
    };
    //this.isloggedin = false;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount(){
    <Redirect to='/userhome'/>
  }
  handleSubmit(event) {
    localStorage.clear();
    console.log(this.state.email);
    axios.post("http://localhost:8717/user-ms/login", {
      "email": this.state.email,
      "password": this.state.password
    }
    ).then((res) => {
      console.log(res)
      if (res.status === 200) {
        localStorage.setItem('jwtToken', res.data.accessToken);
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('role', res.data.role);
        // console.log(res.token);
        this.setState({ isloggedin: true });
      }
    }).catch(()=>{
      this.setState({showError:true})
    })
    event.preventDefault();
    console.log(localStorage.getItem("jwtToken"));

  }

  render() {
    return (
      <>
      {
        (this.state.isloggedin) && ((localStorage.getItem('role') === 'ROLE_USER') ? <Navigate to="/userhome" />
          : <Navigate to="/adminhome" />)
      }
        <div className="container py-1 h-80 mt-3">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              
              
              <img src={image}></img>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 border border-1 shadow-sm mb-3 p-5">
              <p class="text-center" id='loginHeading'>Sign in to get Started</p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-outline mb-4 text-start">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className="form-control form-control-lg"
                    required
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-4 text-start">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    className="form-control form-control-lg"
                    required
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className='text-center' id="invalidCredentials">
                {this.state.showError ? (<span>Please Enter Correct Credentials !</span>) : <></>}
                </div>
                <div class="text-center">
                  <button type="submit" className="btn btn-primary btn-lg btn-block ">Sign in</button>

                  <div className="align-items-center my-4 text-start"><p className="fw-bold mx-3 mb-0 text-muted text-center">Or</p></div>
                  <Link
                    className="btn btn-primary btn-lg btn-block"
                    style={{ backgroundColor: "#008000" }}
                    to="/register"
                    role="button"
                  >
                    Create new Account
                  </Link>
                </div>
                {/* <button type="submit"className="btn btn-primary btn-lg btn-block ">Sign in</button>

                <div className="align-items-center my-4 text-start"><p className="fw-bold mx-3 mb-0 text-muted">OR</p></div>
                <Link
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#3b5998" }}
                  to="/register"
                  role="button"
                >
                  Sign Up
                </Link> */}
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}