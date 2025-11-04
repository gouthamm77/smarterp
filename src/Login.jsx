import React, { Component } from 'react';
import './css/Login.css';
import { BASEURL,callApi } from './lib';
class Login extends Component {
    constructor(){
        super();
        this.state = {signup:false, signupData:{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "" 
        }, errData:"",loginData:{
            email:"",
            password:""}
        };
        this.signupResponse=this.signupResponse.bind(this);
        this.loginResponse=this.loginResponse.bind(this);
    }
    handleLoginInput(e){
        this.setState({
            loginData:{
                ...this.state.loginData,[e.target.name]:e.target.value
            }});
    }
    handleSignUpInput(e){
        this.setState({signupData:{
            ...this.state.signupData, [e.target.name]:e.target.value
        }});
    }
    validateSignup(){
        const {signupData} = this.state;
        const err = {};
        if(!signupData.firstName.trim()) err.firstName = "First Name is required";
        if(!signupData.lastName.trim()) err.lastName = "Last Name is required";
        if(!signupData.email.trim()) err.email = "Email ID is required";
        if(!signupData.phone.trim()) err.phone = "Phone Number is required";
        if(signupData.password.length < 8) err.password = "Password must have 8 chars";
        if(signupData.confirmPassword !== signupData.password) err.confirmPassword = "Password does not match";
        
        this.setState({errData: err});
        return Object.keys(err).length === 0;
    }
    validateLogin(){
        const {loginData} = this.state;
        const err = {};
        if(!loginData.email.trim()) err.email = "Email is required";
        if(!loginData.password.trim()) err.password = "Password is required";
        
        this.setState({errData: err});
        return Object.keys(err).length === 0;
    }
   registerUser(){
        if(!this.validateSignup())
            return;
        const {signupData} = this.state;
        let data = JSON.stringify({
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            email: signupData.email,
            phone: signupData.phone,
            password: signupData.password
        });
        callApi("POST", BASEURL + 'signup', data, this.signupResponse);
    }
        signupResponse(res){
            let rdata=JSON.parse(res);
            alert(rdata);
            this.setState({signupData:{
                firstName:"",
                lastName:"",
                email:"",
                phone:"",
                password:"",
                confirmPassword:""
            },signup:null});
        }
        Login(){
               if(!this.validateLogin())
                return;
            const {loginData} = this.state;
            let data = JSON.stringify({
                email: loginData.email,
                password: loginData.password
            });
            callApi("POST", BASEURL + 'login', data, this.loginResponse); 
        }
        loginResponse(res){
            let rdata=JSON.parse(res);
            if(rdata.success){
                localStorage.setItem('token', rdata.token);
                this.props.history.push('/dashboard');
            } else {
                alert(rdata.message || 'Login failed');
            }
        }
    render() {
        const{signup, signupData, errData,loginData} = this.state;
        return (
            <div className="login">
                <div className="leftpanel">
                    Welcome to section 201
                    Access and manage your task efficiently
                </div>
                <div className="rightpanel">
                    <div className="card">
                        Login
                        <input type="text" name="email" placeholder="Email" value={loginData.email} onChange={(e)=>this.handleLoginInput(e)} />
                        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={(e)=>this.handleLoginInput(e)} />
                        Login
                        <p>Don't have an account? <span onClick={()=>this.setState({signup:true})}>Sign Up</span></p>
                    </div>
                </div>
                {signup && 
                    <div className="overlay">
                        <div className="signup">
                            <button className="close" onClick={()=>this.setState({signup:false})}>X</button>
                            Create an account
                            First Name *
                            <input type="text" name="firstName" placeholder="First Name" value={signupData.firstName} onChange={(e)=>this.handleSignUpInput(e)} autoComplete='off' style={(!errData.firstName ? {} : {"border" : "1px solid red"})} />
                            Last Name *
                            <input type="text" name="lastName" placeholder="Last Name" value={signupData.lastName} onChange={(e)=>this.handleSignUpInput(e)} autoComplete='off' style={(!errData.lastName ? {} : {"border" : "1px solid red"})} />
                            Email ID *
                            <input type="text" name="email" placeholder="Email ID" value={signupData.email} onChange={(e)=>this.handleSignUpInput(e)} autoComplete='off' style={(!errData.email ? {} : {"border" : "1px solid red"})} />
                            Phone Number *
                            <input type="text" name="phone" placeholder="Phone Number" value={signupData.phone} onChange={(e)=>this.handleSignUpInput(e)} autoComplete='off' style={(!errData.phone ? {} : {"border" : "1px solid red"})} />
                            Password *
                            <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={(e)=>this.handleSignUpInput(e)} style={(!errData.password ? {} : {"border" : "1px solid red"})} />
                            Confirm Password *
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={(e)=>this.handleSignUpInput(e)} style={(!errData.confirmPassword ? {} : {"border" : "1px solid red"})} />
                            <button className="regButton" onClick={()=>this.registerUser()}>Register</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default Login;
