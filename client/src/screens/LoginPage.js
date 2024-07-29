import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useAuth } from '../contexts/userAuth';
import '../styles/Login.css'

const LoginPage = () => {
  const [number, setNumber] = useState('');
  const [numberErrMsg, setNumberErrMsg] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [error, setError] = useState(false)
//   const navigate = useNavigate();
  const {login} = useAuth() 
  const validateForm = () =>{
   alert('Currently In Progress')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(!number){
            alert('please enter number')
            setNumberErrMsg('Please Enter Number')
        }else if(!password){
            setPasswordErrMsg('Please Enter Password')
        }else{
            login(number, password)
    }
    } catch (error) {
      console.error("Login failed", error);
      alert('Invalid credentials')
    }
  };

  return (
    <div className="login d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className=" bg-white p-3 rounded w-25">
      <h1 className='loginText'>Login</h1>
      <Form onSubmit={handleSubmit}>
        <InputField label='Enter number' value={number} setFunction={setNumber} type='number'/>
        {numberErrMsg && !number?<div className="text-left small errTxt">{numberErrMsg}</div>:null}
        <InputField label='Enter password' value={password} setFunction={setPassword} type='password'/>
        {passwordErrMsg && !password?<div className="text-left small errTxt">{passwordErrMsg}</div>:null}
        <div className='column'>
        <Button type="submit" disabled={false}>Login</Button>
        <Button type="non" onClick={validateForm} ><i class="bi bi-google" style={{marginRight: '5%'}}></i>Login with Google</Button>
        <Button type="non" onClick={validateForm} ><i class="bi bi-facebook" style={{marginRight: '5%'}}></i> Login with Facebook</Button>
        <Button type="non" onClick={validateForm} ><i class="bi bi-apple"  style={{marginRight: '5%'}}></i>Login with Apple</Button>
        </div>
        <div class="text-center small">Don't have an account? <a href="./register">Sign up</a></div>
      </Form>
      </div>
    </div>
  );
};

export default LoginPage;