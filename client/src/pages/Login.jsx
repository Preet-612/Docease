import { useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
const Register = () => {

    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        setLoading(true);
        setError('')
        try{
          const data = await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({email,password})
          })
          const result = await data.json()
          console.log(result)
          if (result.token) {
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            navigate("/");
          }
          setLoading(false)
        }catch(err){
          setError(err.message);
          setLoading(false)
        }
    }

  return (
    <>
        <Container className='py-5 mt-5 bg-gray-100'>
        <Row className='justify-content-center'>
          <Col md='6' lg='5'>
            <Card>
              <CardBody>
                <CardTitle tag='h3' className='mb-4'>Sign in Account</CardTitle>
                    <p className='text-muted'>Patient registration only.</p>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='registerEmail'>Email</Label>
                            <Input  type="text" id='registerEmail'  onChange={(e)=>setEmail(e.target.value)} value={email} name='email' className='form-control' placeholder='Enter your email'required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='registerPassword'>Password</Label>
                            <Input  type="text" id='registerPassword'  onChange={(e)=>setPassword(e.target.value)} value={password} name='password' className='form-control' placeholder='Enter your password'required/>
                        </FormGroup>
                        <Button type='submit' color='primary' className='w-100' disabled={loading}>
                            {loading ? 'Registering..' : 'Register'}
                        </Button>
                    </Form>
                    <p className='text-center mt-3 mb-0 text-muted'>Create new account? <Link to="/register">Sign up</Link></p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Register
