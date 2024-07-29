import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { loginUser, logoutUser } from '../services/authService';
import { updateUser } from "../services/userServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (number, password) => {
    try{
        const response = await loginUser(number, password);
        if (response.status === 200 && response.data) {
          navigate('/home');
          console.log('user>>', response.data)
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data))
          const user = JSON.parse(localStorage.getItem('user'))
          localStorage.setItem('token', user.sessionToken)
        }else{
          alert('Invalid credentials')
        }
    }catch(err){
        alert('Invalid credentials')
        setUser(null)
    }
  };

  // call this function to sign out logged in user
  const signout = async() => {
    try {
        const resp = await logoutUser(user);
        if (resp.status = 200) {
            localStorage.removeItem('user');
            setUser(null);
            navigate("/", { replace: true });
        } else {
            alert('Something went wrong while logging out')
        }
    } catch (error) {
        alert('Something went wrong while logging out')
    }
   
  };
  const updateUserDataAuth = async(firstname, lastName, number) =>{
    try {
        let payload = {}
        payload['firstname'] = firstname
        payload['lastName'] = lastName
        payload['number'] = number
        const response = await updateUser(user.id,payload);
        if (response.status === 200) {
          alert('user data updated successfully')
          console.log('user>>>', response.data.data)
          localStorage.setItem('user', JSON.stringify(response.data.data))
          setUser(response.data.data)
          navigate('/home')
        }
    } catch (error) {
        alert('error while updating')
    }
}
  const value = useMemo(
    () => ({
      user,
      login,
      signout,
      updateUserDataAuth
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
  };