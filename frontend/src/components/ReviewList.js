import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Carousel } from 'react-bootstrap';
import axios from 'axios';
import Rating from 'react-rating-stars-component'; // Importiere die Rating-Komponente
import './ReviewList.css'; // Importiere die CSS-Datei für das Styling

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

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

  const getScaleColor = (price) => {
    if (price < 1000) {
      return 'green';
    } else if (price >= 1000 && price <= 3000) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <Container style={{ paddingTop: '20px' }}>
      <Row>
        {reviews.map((review) => (
          <Col key={review._id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontFamily: 'Montserrat, sans-serif' }}>{review.caption}</Card.Title>
                <br></br>
                {review.imageUrls && review.imageUrls.length > 0 && (
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
                {review.videoUrls && review.videoUrls.length > 0 && review.videoUrls.map((videoUrl, index) => (
                <div key={index} style={{ margin: '20px 0' }}>
                    <video width="100%" height="200" controls>
                    <source src={`http://localhost:5000/uploads/${videoUrl}`} type="video/mp4" />
                    Ihr Browser unterstützt das Video-Tag nicht.
                    </video>
                </div>
                ))}

                {review.documentUrls && review.documentUrls.length > 0 && review.documentUrls.map((documentUrl, index) => (
                  <Card.Text key={index}>
                    <a href={`http://localhost:5000/uploads/${documentUrl}`} target="_blank" rel="noopener noreferrer">Dokument anzeigen</a>
                  </Card.Text>
                ))}
                <br></br>
                <Card.Text><strong>Adresse</strong><br />{review.address}</Card.Text>
                <Card.Text><strong>Beschreibung</strong><br />{review.description}</Card.Text>
                <Card.Text>
                  <strong>Preis</strong><br />
                  <div className="price-scale">
                    <div className="scale-background">
                      <div className={`scale-indicator ${getScaleColor(review.price)}`} style={{ left: `${review.price < 1000 ? '10%' : review.price <= 3000 ? '50%' : '90%'}` }}></div>
                    </div>
                  </div>
                  €{review.price}
                </Card.Text>
                <div>
                  <strong>Bewertung</strong>
                  <Rating
                    count={10}
                    value={review.rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={false} // Macht die Bewertung nicht veränderbar
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewList;
