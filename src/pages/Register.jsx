import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    setLoading(true);
    const data = new FormData();
    data.append('pic', file);
    data.append('email', email);
    data.append('password', password);
    data.append('displayName', displayName);


    setLoading(true);
    try {
      const result = await axios.post("https://chat-application-mib4.onrender.com/register", data);
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate('/login', { replace: true });  
      });
      
      console.log("success");
      setLoading(false);
    }
    catch (e) {
      setErr(true);
    }
    
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" name="pic" onChange={(e)=>{setFile(e.target.files[0])}}/>
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>

  );
  
};

export default Register;
