import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import {UserAuth} from "./assets/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

import background from "./assets/livingroom.jpg";

const Container = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${background});
  background-size: cover;
  background-repeat: repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Formcontainer = styled.div`
  background-color: transparent;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 50px;
  width: 300px;
  text-align: center;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: transparent;
  color: #ccc;
`;

const Button = styled.button`
  background-color: #008080;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Label = styled.label`
  color: #ccc;
`;
const Header = styled.h1`
    color: white;
    padding-bottom:40px;
`
const Login = () => {
    //  const [isLoggedIn, setIsLoggedIn] = useState(false);
    //  const [email, setEmail] = useState("");
    //  const [password, setPassword] = useState("");

//     const handleLogin = async (e) => {
//      e.preventDefault();
     
//     if(email === "user@gmail.com" && password === "password"){

//         setIsLoggedIn(true)
//         return <Navigate to="/dashboard" />;
//     }
//     else{
//         console.log("wrong details")
//     }
   
    
//     //  if (isLoggedIn) {
//     //    // Redirect to dashboard if isLoggedIn is true
       
//     //  }


// }
const initialFormData = {
  email: "",
  password: "",
};
const { currentUser, logIn } = UserAuth();
const navigate = useNavigate();
const [formData, setFormData] = useState(initialFormData);
const [error, setError] = useState(false);

function handleChange(e) {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
}

async function handleLogin(e) {
  e.preventDefault();
  try {
    await logIn(formData.email, formData.password);
  } catch (err) {
    console.error(err.message);
  }

  if (currentUser) {
    navigate("/");
    toast.success("You're logged!");
    setFormData(initialFormData);
  } else {
    setError(true);
  }
}

  return (
    <Container>
      <Header>InteriorDecorGallery</Header>
      {error && <p>Incorrect login details!!</p>}
      <Formcontainer>
        <form onSubmit={handleLogin}>
          <Label htmlFor="email">
            <Input
              value={formData.email}
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </Label>
          <Label htmlFor="password">
            <Input
              value={formData.password}
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </Label>
          <Button type="submit">Login</Button>
        </form>
      </Formcontainer>
      <ToastContainer/>
    </Container>
  );
};

export default Login;
