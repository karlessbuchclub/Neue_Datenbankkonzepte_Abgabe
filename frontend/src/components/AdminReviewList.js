import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Carousel, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

const AdminReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/listings');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/listings/${reviewId}`);
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const openModal = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedReview(null);
    setShowModal(false);
  };

  return (
    <Container>
      <Row>
        {reviews.map((review) => (
          <Col key={review._id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{review.caption}</Card.Title>
                {review.imageUrls.length > 0 && (
                  <Carousel>
                    {review.imageUrls.map((imageUrl, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={`http://localhost:5000/uploads/${imageUrl}`}
                          alt={`Bild ${index + 1}`}
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Feste Größe und objectFit für Konsistenz
                        />
                        <br></br>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
                {review.videoUrls.length > 0 && review.videoUrls.map((videoUrl, index) => (
                  <video key={index} width="100%" controls>
                    <source src={`http://localhost:5000/uploads/${videoUrl}`} type="video/mp4" />
                    Ihr Browser unterstützt das Video-Tag nicht.
                  </video>
                ))}
                {review.documentUrls.length > 0 && review.documentUrls.map((documentUrl, index) => (
                  <Card.Text key={index}>
                    <a href={`http://localhost:5000/uploads/${documentUrl}`} target="_blank" rel="noopener noreferrer">Dokument anzeigen</a>
                  </Card.Text>
                ))}
                <Card.Text><strong>Adresse</strong><br></br>{review.address}</Card.Text>
                <Card.Text><strong>Beschreibung</strong><br></br>{review.description}</Card.Text>
                <Card.Text><strong>Preis</strong><br></br> €{review.price}</Card.Text>
                <div>
                  <strong>Bewertung</strong>
                  <ReactStars 
                    value={review.rating} 
                    edit={false} 
                    count={10}
                    size={24} // Größe der Sterne
                    activeColor="#ffd700"
                  />
                </div>
                <Button variant="danger" onClick={() => openModal(review)}>Löschen</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Anzeige löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReview && (
            <>
              <p>Die Anzeige verstößt gegen:</p>
              <ul>
                <li>Nutzungsbedingungen</li>
                <li>Schimpfwörter etc.</li>
              </ul>
              <p>Sind Sie sicher, dass Sie die Anzeige "{selectedReview.caption}" löschen möchten?</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Abbrechen
          </Button>
          <Button variant="danger" onClick={() => {
            handleDelete(selectedReview._id);
            closeModal();
          }}>
            Löschen bestätigen
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminReviewList;
