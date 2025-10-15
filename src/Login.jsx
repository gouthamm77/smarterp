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
    }
    handleLoginInput(e){
        this.setState({
            loginData:{
                ...this.state.loginData,[e.target.name]:EventTarget.value
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
    render() {
        const{signup, signupData, errData,loginData} = this.state;
        return (
            <div className='login'>
                <div className='leftpanel'>
                    <h1>Welcome to section 201</h1>
                    <p>Access and manage your task efficiently</p>
                </div>
                <div className='rightpanel'>
                    <div className='card'>
                        <h2>Login</h2>
                        <input type='text' placeholder='Email' name='email' value={loginData.email} onChange={(e)=>this.handleLoginInput(e)} />
                        <input type='password' placeholder='Password' name='password' value={loginData.password} onChange={(e)=>this.handleLoginInput(e)} />
                        <button>Login</button>
                        <p>Don't have an account? <span onClick={()=>this.setState({signup:true})}>Sign Up</span></p>
                    </div>
                </div>
                {signup && 
                    <div className='overlay'>
                        <div className='signup'>
                            <button className='close' onClick={()=>this.setState({signup:false})}>X</button>
                            <h2>Create an account</h2>
                            <label>First Name *</label>
                            <input type='text' placeholder='First Name' name='firstName' value={signupData.firstName} onChange={(e)=>this.handleSignUpInput(e)} autoComplete='off' style={(!errData.firstName ? {} : {"border" : "1px solid red"})} />
                            <label>Last Name *</label>
                            <input type='text' placeholder='Last Name' name='lastName' value={signupData.lastName} onChange={(e)=>this.handleSignUpInput(e)} autoComplete='off' style={(!errData.lastName ? {} : {"border" : "1px solid red"})} />
                            <label>Email ID *</label>
                            <input type='text' placeholder='Email ID' name='email' value={signupData.email} onChange={(e)=>this.handleSignUpInput(e)} autoComplete='off' style={(!errData.email ? {} : {"border" : "1px solid red"})} />
                            <label>Phone Number *</label>
                            <input type='text' placeholder='Phone Number' name='phone' value={signupData.phone} onChange={(e)=>this.handleSignUpInput(e)} autoComplete='off' style={(!errData.phone ? {} : {"border" : "1px solid red"})} />
                            <label>Password *</label>
                            <input type='password' placeholder='Password' name='password' value={signupData.password} onChange={(e)=>this.handleSignUpInput(e)} style={(!errData.password ? {} : {"border" : "1px solid red"})} />
                            <label>Confirm Password *</label>
                            <input type='password' placeholder='Confirm Password' name='confirmPassword' value={signupData.confirmPassword} onChange={(e)=>this.handleSignUpInput(e)} style={(!errData.confirmPassword ? {} : {"border" : "1px solid red"})} />
                            <button className='regButton' onClick={()=>this.registerUser()}>Register</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Login;