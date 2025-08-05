import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function SendOfferModal({ show, onHide, onSubmit }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (message.trim()) {
      onSubmit(message);
      setMessage("");
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Send an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Describe your offer..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="primary">Send</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
