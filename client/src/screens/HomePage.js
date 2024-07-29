import React, { useEffect } from 'react';
import Button from '../components/Button';
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/userAuth';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/Home.css'
import { deleteUser } from '../services/userServices';

const HomePage = () => {
    useEffect(() => {
        getGreeting()
    }, [])
    const navigate = useNavigate()
    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return 'Good Morning';
        if (hours < 18) return 'Good Afternoon';
        return 'Good Evening';
    };
    // const user = localStorage.getItem('user'); // Assuming user info is stored in localStorage
    const {user, signout} = useAuth()
    console.log('user from context>>>',user)
    const userDetail = user
  
    const logout = async () => {
       signout()
    }
    const updateUserData=()=>{
        navigate('/register',{state:{updateUser: true}})
    }
    const deleteUserC = async() => {
        alert('Are you sure to delete?')
        try {
            const res = await deleteUser(userDetail.id)
            if(res.status == 200){
                navigate('/')
                alert('user deleted')
            }
        } catch (error) {
            alert('something went wrong')
        }
        
    }
    return (
        <div className='home'>

            <h1>{`${getGreeting()} Mr. ${userDetail.firstname} ${userDetail.lastname}`}</h1>
         <button type="button" onClick={updateUserData} class="btn btn-default btn-sm">
            Update
          <i size={50} class="bi bi-pencil-square"></i> 
        </button>
         <button type="button" onClick={deleteUserC} class="btn btn-default btn-sm">
            Delete
          <i size={50} class="bi bi-trash"></i> 
        </button>
            <div style={{ float: 'right', width: '20%' }}>
                <Button onClick={logout}>Logout</Button>
            </div>
        </div>
    );
};

export default HomePage;