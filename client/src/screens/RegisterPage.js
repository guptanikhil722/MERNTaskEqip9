import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '../components/Form';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { registerUser } from '../services/authService';
import '../styles/Login.css'
import { useAuth } from '../contexts/userAuth';
import { updateUser } from '../services/userServices';

const RegisterPage = () => {
    const [firstname, setFirstName] = useState('');
    const [firstnameErrMsg, setFirstNameErrMsg] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameErrMsg, setLastNameErrMsg] = useState('');
    const [number, setNumber] = useState('');
    const [numberErrMsg, setNumberErrMsg] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState('');
    const navigate = useNavigate();
    const location  = useLocation();
    const {user, updateUserDataAuth} = useAuth()
    const userDetail = user
    console.log('data from home>>>', location)
    useEffect(()=>{

        if(location.state?.updateUser && userDetail){
            console.log('inside useeffect>>', userDetail)
            setFirstName(user.firstname)
            setLastName(user.lastname)
            setNumber(user.number)
        }else{
            setFirstName('')
            setLastName('')
            setNumber('')
        }
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!firstname){
                setFirstNameErrMsg('Please Enter First Name')
            }else if(!lastName){
                setLastNameErrMsg('Please Enter Last Name')
            }else if(!number || number.length<10){
                setNumberErrMsg('Please Enter Valid Number with 10 digit')
            }else if(!password || password.length<8){
                setPasswordErrMsg('Please Enter Valid Password with min 8 digit')
            }else{
            const response = await registerUser(firstname, lastName, parseInt(number), password);
            if (response.status === 200) {
                navigate('/');
                alert('User Registered Successfully')
            }
        }
        } catch (error) {
            console.error("Registration failed", error);
            alert('Error while registering')
        }
    };
    const updateUserData = async() =>{
        updateUserDataAuth(firstname,lastName,number)
        // try {
        //     let payload = {}
        //     payload['firstname'] = firstname
        //     payload['lastName'] = lastName
        //     payload['number'] = number
        //     const response = await updateUser(user.id,payload);
        //     if (response.status === 200) {
        //       alert('user data updated successfully')
        //       console.log('user>>>', response.data.data)
        //       localStorage.setItem('user', JSON.stringify(response.data.data))
        //       setUser(response.data.data)
        //       navigate('/home')
        //     }
        // } catch (error) {
        //     alert('error while updating')
        // }
    }
    return (
        <div className="login d-flex justify-content-center align-items-center bg-secondary vh-100">
            {location.state?.updateUser?<h1>Update User Detail</h1>:<h1>Register</h1>}
            <Form onSubmit={handleSubmit}>
                <InputField label='First Name' value = {firstname} setFunction={setFirstName} type='text'/>
                {firstnameErrMsg && !firstname?<div className="text-left small errTxt">{firstnameErrMsg}</div>:null}
                <InputField label='Last Name' value={lastName} setFunction={setLastName} type='text'/>
                {lastNameErrMsg && !lastName?<div className="text-left small errTxt">{lastNameErrMsg}</div>:null}
                <InputField label='Number' value={number} setFunction={setNumber} type='number'/>
                {numberErrMsg && (!number || number.length<10)?<div className="text-left small errTxt">{numberErrMsg}</div>:null}
                {!location.state?.updateUser?<InputField label='Password' value={password} setFunction={setPassword} type='password'/>:null}
                {passwordErrMsg && (!password || password.length<8) && !location.state?.updateUser ?<div className="text-left small errTxt">{passwordErrMsg}</div>:null}
                
                {location.state?.updateUser?
                <Button type="" onClick={updateUserData}>Update</Button> :
                <>
                <Button type="submit">Register</Button>
                <div class="text-center small">Already have an account? <a href="/">Sign in</a></div>
                </>
                }
            </Form>
        </div>
    );
};

export default RegisterPage;