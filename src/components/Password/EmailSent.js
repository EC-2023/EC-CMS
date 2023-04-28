import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';
import { CheckCircle } from 'react-bootstrap-icons';
import './ResetPassword.css';
const EmailSent = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailRegex.test(email)) {
      setIsValidEmail(true);
      setShowSuccess(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 ">
            <div className="card-body p-4 text-center">
              <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                  <h1 className="text-center title-header">Reset Password</h1>
                  {!isValidEmail && <Alert variant="danger">Email không hợp lệ. Vui lòng thử lại.</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button variant="primary" type="submit">
                        Send Reset Link
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>

              <Modal show={showSuccess} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <CheckCircle className="me-2" />
                    Thành công
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>Email reset password đã được gửi về mail của bạn.</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSent;
