import React, { useState ,useContext} from 'react'
import '../styles/login.css'

import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link,useNavigate } from 'react-router-dom'

import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Register = () => {

  const [credentials,setCredentials]= useState({
    userName:undefined,
    email:undefined,
    password:undefined
});

const {dispatch} = useContext(AuthContext)
const navigate = useNavigate()

  const handleChange = e =>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
    // console.log(credentials);
  };

  const handleClick = async e =>{
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`,{
        method:'post',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify(credentials)
      })
      const result = await res.json()

      if(!res.ok) alert(result.message)

      dispatch({type:'REGISTER_SUCCESS'})  
      navigate('/login')
    } catch (err) {
      alert(err.message);
    }
  }

  return (
<section>
  <Container>
    <Row>
      <Col lg='8' className='m-auto'>
        <div className="login__container d-flex justify-content-between">
          <div className="login__img">
            <img src={registerImg} alt="login" />
          </div>

          <div className="login__form">
            <div className="user">
              <img src={userIcon} alt="user" />
            </div>
            <h2>Register</h2>
            <Form onSubmit={handleClick}>
            <FormGroup>
                <input type="text" id="username" placeholder='Username' required 
                onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                <input type="email" id="email" placeholder='Email' required 
                onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                <input type="password" id="password" placeholder='Password' required 
                onChange={handleChange}/>
              </FormGroup>
              <Button className="btn secondary__btn auth__btn"
              type='submit'>Create Account</Button>
            </Form>
            <p>Already have an account ? <Link to='/login'>Login</Link></p>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</section>
  )
}

export default Register