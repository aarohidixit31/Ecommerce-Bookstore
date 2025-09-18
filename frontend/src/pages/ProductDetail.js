import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Rating,
  Divider,
  CircularProgress,
  Alert,
  Avatar,
  Chip
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
    fetchRatings();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`/api/products/products/id/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.error('Error fetching product:', err);
      // Use mock data as fallback
      setProduct(getMockProduct(id));
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/product/${id}`);
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`/api/ratings/product/${id}`);
      setRatings(response.data);
    } catch (err) {
      console.error('Error fetching ratings:', err);
      setRatings([]);
    } finally {
      setLoading(false);
    }
  };

  const getMockProduct = (productId) => {
    const mockProducts = {
      1: {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 299,
        discountedPrice: 249,
        imageUrl: "https://via.placeholder.com/400x600?text=The+Great+Gatsby",
        description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City, the novel tells the first-person story of Nick Carraway, a young Yale graduate and World War I veteran from the Midwest who moves to Long Island in 1922, intending to work in the bond business.",
        publisher: "Scribner",
        language: "English",
        quantity: 50
      },
      2: {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 399,
        discountedPrice: 349,
        imageUrl: "https://via.placeholder.com/400x600?text=To+Kill+a+Mockingbird",
        description: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
        publisher: "J.B. Lippincott & Co.",
        language: "English",
        quantity: 30
      }
    };
    return mockProducts[productId] || mockProducts[1];
  };

  const addToCart = async () => {
    try {
      await axios.put('/api/cart/add', {
        productId: parseInt(id),
        quantity: 1
      });
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  const submitReview = async () => {
    if (!newReview.trim()) {
      alert('Please enter a review');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('/api/reviews/create', {
        productid: parseInt(id),
        review: newReview
      });
      setNewReview('');
      fetchReviews();
      alert('Review submitted successfully!');
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const submitRating = async () => {
    if (newRating === 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('/api/ratings/create', {
        productId: parseInt(id),
        rating: newRating
      });
      setNewRating(0);
      fetchRatings();
      alert('Rating submitted successfully!');
    } catch (err) {
      console.error('Error submitting rating:', err);
      alert('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length 
    : 0;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container>
        <Alert severity="error">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.imageUrl || `https://via.placeholder.com/400x600?text=${product.title}`}
            alt={product.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 600,
              objectFit: 'cover',
              borderRadius: 2
            }}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            by {product.author}
          </Typography>
          
          {/* Rating Display */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={averageRating} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({ratings.length} ratings)
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            {product.discountedPrice && product.discountedPrice < product.price ? (
              <>
                <Typography variant="h4" color="primary">
                  ₹{product.discountedPrice}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                >
                  ₹{product.price}
                </Typography>
                <Chip 
                  label={`${Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF`} 
                  color="secondary" 
                  size="small"
                />
              </>
            ) : (
              <Typography variant="h4" color="primary">
                ₹{product.price}
              </Typography>
            )}
          </Box>

          {/* Product Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            {product.publisher && (
              <Typography variant="body2" color="text.secondary">
                Publisher: {product.publisher}
              </Typography>
            )}
            {product.language && (
              <Typography variant="body2" color="text.secondary">
                Language: {product.language}
              </Typography>
            )}
            {product.quantity && (
              <Typography variant="body2" color="text.secondary">
                In Stock: {product.quantity} copies
              </Typography>
            )}
          </Box>

          {/* Add to Cart Button */}
          {isAuthenticated && (
            <Button
              variant="contained"
              size="large"
              onClick={addToCart}
              sx={{ mb: 3 }}
            >
              Buy Now
            </Button>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Reviews and Ratings Section */}
      <Grid container spacing={4}>
        {/* Submit Review/Rating */}
        {isAuthenticated && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Write a Review
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your Review"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={submitReview}
                  disabled={submitting}
                  sx={{ mb: 3 }}
                >
                  {submitting ? <CircularProgress size={24} /> : 'Submit Review'}
                </Button>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Rate this Book
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Rating
                    value={newRating}
                    onChange={(event, newValue) => setNewRating(newValue)}
                  />
                  <Typography variant="body2">
                    {newRating > 0 ? `${newRating} star${newRating > 1 ? 's' : ''}` : 'Select rating'}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={submitRating}
                  disabled={submitting}
                >
                  {submitting ? <CircularProgress size={24} /> : 'Submit Rating'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Display Reviews */}
        <Grid item xs={12} md={isAuthenticated ? 6 : 12}>
          <Typography variant="h6" gutterBottom>
            Customer Reviews ({reviews.length})
          </Typography>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ mr: 2 }}>
                      {review.user?.firstName?.charAt(0) || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {review.user?.firstName} {review.user?.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    {review.review}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No reviews yet. Be the first to review this book!
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;