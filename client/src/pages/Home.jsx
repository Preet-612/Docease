import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row } from 'reactstrap'
import doctorImg from "../assets/doctor_img.jpg"
const Home = () => {
  return (
    <div className='home-page'>
      <section className='home-hero'>
        <Container>
          <Row className="align-items-center">
            <Col lg="6" className="mb-4 mb-lg-0">
              <p className='home-heading'>Clinic Appointment</p>
              <h1 className='home-title'>Book doctor visit in minutes</h1>
              <p className='home-lead'>Find specialist, pick a date, choose an open slot and manage appointment</p>
              <div>
                <Button tag={Link} to='/doctors' color='primary'>Find Doctor</Button>
                <Button tag={Link} to='/register' color='outline-primary'>Create Account</Button>
              </div>
            </Col>
            <Col className='text-center' lg='6'>
              <img src={doctorImg} alt="" className='home-hero-img'/>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='home-steps'>
       <Container>
         <h2 className='home-steps-title'>How it works</h2>
        <Row>
          <Col md="4" className='mb-3'>
          <div className='home-step-card'>
            <span className='home-step-num'>1</span>
            <h3>Search</h3>
            <p>Browse doctors by specialization and consultation fee</p>
          </div>
          
          </Col>
          <Col md="4" className='mb-3'>
             <div className='home-step-card'>
           <span className='home-step-num'>2</span>
            <h3>Book</h3>
            <p>Pick a date and an available time slot that fits you.</p>
          </div>
          </Col>
           <Col md="4" className='mb-3'>
             <div className='home-step-card'>
           <span className='home-step-num'>3</span>
            <h3>Visit</h3>
            <p>View or cancel booking anytime under My Appointments</p>
          </div>
          </Col>
        </Row>

       </Container>
       </section>
        
      
    </div>
  )
}

export default Home
