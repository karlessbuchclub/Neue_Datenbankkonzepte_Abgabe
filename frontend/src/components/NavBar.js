import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Modal, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';
import Rating from 'react-rating-stars-component';
import Autosuggest from 'react-autosuggest';
import './Autosuggest.css'; // Importiere die CSS-Datei für das Styling

function NavBar({ token, role, onLogout }) {
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setError('');
    setSuccess('');
  };
  const handleShow = () => setShow(true);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || !address || !description || !price) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('rating', rating);
    imageFiles.forEach(file => formData.append('imageFiles', file));
    videoFiles.forEach(file => formData.append('videoFiles', file));
    documentFiles.forEach(file => formData.append('documentFiles', file));

    console.log("Form submitted with values:", { caption, address, description, imageFiles, videoFiles, documentFiles, price, rating });

    try {
      const response = await axios.post('http://localhost:5000/api/listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      setCaption('');
      setAddress('');
      setDescription('');
      setImageFiles([]);
      setVideoFiles([]);
      setDocumentFiles([]);
      setPrice('');
      setRating(1);
      setError('');
      setSuccess('Anzeige erfolgreich hinzugefügt!');
      setTimeout(() => {
        window.location.reload();
      }, 500); // Neuladen des Fensters nach 500 Millisekunden
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError('Fehler beim Absenden des Formulars. Bitte versuchen Sie es erneut.');
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length > 2) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Vorschläge:', error);
      }
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.display_name;

  const renderSuggestion = (suggestion) => (
    <div className="suggestion">
      {suggestion.display_name}
    </div>
  );

  const inputProps = {
    placeholder: "Adresse eingeben",
    value: address,
    onChange: (e, { newValue }) => setAddress(newValue)
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setAddress(suggestion.display_name);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {token && role !== 'admin' && (
                <Button variant="outline-success" className="ms-2" onClick={handleShow}>
                  Anzeige hinzufügen
                </Button>
              )}
              {token && role === 'admin' && (
                <Button variant="outline-warning" className="ms-2" as={Link} to="/admin/reviews">
                  Reviews bearbeiten
                </Button>
              )}
            </Nav>
            <Navbar.Brand href="#home" className="ms-auto">
              <img
                src={require('../assets/logo.png')} // Ersetze diesen Pfad mit dem Pfad zu deinem Logo
                width="50" // Erhöhen Sie die Breite des Logos
                height="50" // Erhöhen Sie die Höhe des Logos
                className="d-inline-block align-top"
                alt="Holiday Hub logo"
              />
            </Navbar.Brand>
            <Nav>
              {token ? (
                <>
                  <Navbar.Text className="ms-2">Hallo!</Navbar.Text>
                  <Button variant="outline-danger" className="ms-2" onClick={() => {
                    onLogout();
                    setSuccess('Sie wurden erfolgreich abgemeldet.');
                    setTimeout(() => {
                      setSuccess('');
                      navigate('/login');
                    }, 2000);
                  }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline-primary" className="ms-2" as={Link} to="/login">
                    Login
                  </Button>
                  <Button variant="outline-secondary" className="ms-2" as={Link} to="/register">
                    Registrieren
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {success && <Alert variant="success">{success}</Alert>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Anzeige hinzufügen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCaption">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                type="text"
                placeholder="Caption eingeben"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Adresse</Form.Label>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={onSuggestionSelected}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Beschreibung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Beschreibung eingeben"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Bild</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => setImageFiles(Array.from(e.target.files))}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVideo">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => setVideoFiles(Array.from(e.target.files))}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDocument">
              <Form.Label>Dokument</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => setDocumentFiles(Array.from(e.target.files))}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Preis</Form.Label>
              <Form.Control
                type="number"
                placeholder="Preis eingeben"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRating">
              <Form.Label>Bewertung</Form.Label>
              <Rating
                count={10}
                value={rating}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Absenden
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
