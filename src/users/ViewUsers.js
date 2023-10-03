import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function ViewUsers() {
    let navigate=useNavigate();

    const {id}=useParams();

    const[user, setUser]=useState({
      name:"",
      username:"",
      email:""
    });
  
    const{name,username,email}=user;
  
    const onInputChange=(e)=>{
      setUser({ ...user,[e.target.name]:e.target.value});
    };
  
    useEffect(()=>{
        loadUsers();
    },[]);

    const onSubmit= async(e)=>{
      e.preventDefault();
      await axios.put(`http://localhost:8080/user/${id}`,user) 
      navigate("/")
    };

    const loadUsers = async()=>{
        const result=await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    };
  
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Edit user</h2>
  
            <form >
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
                Name
              </label>
              <input
              disabled={true}
              type={"text"}
              className='form-control'
              placeholder='Enter your name'
              name='name'
              value={name}
              onChange={(e)=>onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='UserName' className='form-label'>
                User name
              </label>
              <input
              disabled={true}
              type={"text"}
              className='form-control'
              placeholder='Enter your user name'
              name='username'
              value={username}
              onChange={(e)=>onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Email' className='form-label'>
                Email
              </label>
              <input
              disabled={true}
              type={"text"}
              className='form-control'
              placeholder='Enter your Email'
              name='email'
              value={email}
              onChange={(e)=>onInputChange(e)}
              />
            </div>
            
            <Link type='submit' className='btn btn-outline-danger mx-2' to="/">
              Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    )
}
