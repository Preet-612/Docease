import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const Register = () => {
  return (
    <>
        <Container className='py-5'>
        <Row className='justify-content-center'>
          <Col md='6' lg='5'>
            <Card>
              <CardBody>
                <CardTitle className='mb-4'>Create Account</CardTitle>
                    <p>Patient registration only.</p>
                    <Form>
                        <FormGroup>
                            
                        </FormGroup>
                    </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Register
