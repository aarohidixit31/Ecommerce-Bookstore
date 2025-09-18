import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Paper,
  Avatar
} from '@mui/material';
import {
  AutoStories,
  TrendingUp,
  LocalShipping,
  Star,
  People,
  Favorite,
  ArrowForward
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookCarousel from '../components/BookCarousel';
import { featuredBooks, getBooksByCategory } from '../data/booksData';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [currentStats, setCurrentStats] = useState({ books: 0, readers: 0, rating: 0 });

  useEffect(() => {
    setAnimationTrigger(true);
    // Animate statistics
    const animateStats = () => {
      const targetStats = { books: 10000, readers: 50000, rating: 4.8 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCurrentStats({
          books: Math.floor(targetStats.books * progress),
          readers: Math.floor(targetStats.readers * progress),
          rating: (targetStats.rating * progress).toFixed(1)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };
    
    setTimeout(animateStats, 500);
  }, []);

  const categories = [
    {
      name: 'Fiction',
      description: 'Immerse yourself in captivating stories',
      icon: <AutoStories />,
      color: '#1976d2',
      books: getBooksByCategory('fiction').slice(0, 3)
    },
    {
      name: 'Non-Fiction',
      description: 'Expand your knowledge and understanding',
      icon: <TrendingUp />,
      color: '#388e3c',
      books: getBooksByCategory('non-fiction').slice(0, 3)
    },
    {
      name: 'Comics',
      description: 'Visual storytelling at its finest',
      icon: <Star />,
      color: '#f57c00',
      books: getBooksByCategory('comics').slice(0, 3)
    },
    {
      name: 'Feel-Good',
      description: 'Uplifting stories to brighten your day',
      icon: <Favorite />,
      color: '#e91e63',
      books: getBooksByCategory('feel-good').slice(0, 3)
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing selection and fast delivery! Found books I couldn't find anywhere else.",
      rating: 5,
      avatar: "https://via.placeholder.com/60?text=SJ"
    },
    {
      name: "Michael Chen",
      text: "The recommendations are spot-on. Discovered my new favorite author here!",
      rating: 5,
      avatar: "https://via.placeholder.com/60?text=MC"
    },
    {
      name: "Emily Rodriguez",
      text: "Great prices and excellent customer service. Highly recommended!",
      rating: 5,
      avatar: "https://via.placeholder.com/60?text=ER"
    }
  ];

  return (
    <Box>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%)',
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.4,
            zIndex: 0
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: { xs: 60, md: 100 },
                height: { xs: 60, md: 100 },
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                animation: 'float 6s ease-in-out infinite',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </Box>
        
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              opacity: animationTrigger ? 1 : 0,
              transform: animationTrigger ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s ease'
            }}
          >
            Discover Your Next
            <Typography 
              component="span" 
              sx={{ 
                display: 'block',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Great Read
            </Typography>
          </Typography>
          

            
            {isAuthenticated && user && (
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 2, 
                  opacity: animationTrigger ? 0.9 : 0,
                  transform: animationTrigger ? 'scale(1)' : 'scale(0.8)',
                  transition: 'all 1.2s ease'
                }}
              >
                Welcome back, {user.firstName}! 📚
              </Typography>
            )}
            
            <Typography 
              variant="h5" 
              paragraph 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto', 
                mb: 4,
                opacity: animationTrigger ? 0.95 : 0,
                transform: animationTrigger ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1s ease 0.2s'
              }}
            >
              Explore our curated collection of books across all genres. 
              From bestsellers to hidden gems, find your perfect story.
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                opacity: animationTrigger ? 1 : 0,
                transform: animationTrigger ? 'scale(1)' : 'scale(0.9)',
                transition: 'all 1.4s ease 0.4s'
              }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/products"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Books
              </Button>
              {!isAuthenticated && (
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/signup"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Join Us
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            textAlign: 'center',
            opacity: animationTrigger ? 1 : 0,
            transform: animationTrigger ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.5s ease 0.6s'
          }}
        >
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <AutoStories sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                {currentStats.books.toLocaleString()}+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Books Available
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <People sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h3" color="secondary" sx={{ fontWeight: 'bold' }}>
                {currentStats.readers.toLocaleString()}+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Happy Readers
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Star sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>
                {currentStats.rating}★
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Average Rating
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Books Carousel */}
      <Container 
        maxWidth="lg"
        sx={{
          opacity: animationTrigger ? 1 : 0,
          transform: animationTrigger ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 2s ease 0.8s'
        }}
      >
        <BookCarousel books={featuredBooks} title="Featured Books" />
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            align="center"
            sx={{ 
              mb: 6, 
              fontWeight: 'bold',
              opacity: animationTrigger ? 1 : 0,
              transform: animationTrigger ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 2.2s ease 1s'
            }}
          >
            Explore by Category
          </Typography>
          
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={category.name}>
                <Card 
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: animationTrigger ? 1 : 0,
                    transform: animationTrigger ? 'scale(1)' : 'scale(0.8)',
                    transitionDelay: `${1 + index * 0.2}s`,
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: 6
                    }
                  }}
                  component={Link}
                  to={`/products?category=${category.name.toLowerCase()}`}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: '50%', 
                        bgcolor: category.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: 'white'
                      }}
                    >
                      {React.cloneElement(category.icon, { sx: { fontSize: 40 } })}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {category.description}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {category.books.length}+ books available
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 6, 
            fontWeight: 'bold',
            opacity: animationTrigger ? 1 : 0,
            transform: animationTrigger ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 2.5s ease 1.2s'
          }}
        >
          What Our Readers Say
        </Typography>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={testimonial.name}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  opacity: animationTrigger ? 1 : 0,
                  transform: animationTrigger ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${1.5 + index * 0.3}s`,
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Box sx={{ display: 'flex' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: 'gold', fontSize: 16 }} />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container 
          maxWidth="md"
          sx={{
            opacity: animationTrigger ? 1 : 0,
            transform: animationTrigger ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 3s ease 1.5s'
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to Start Reading?
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
            Join thousands of book lovers and discover your next favorite story today.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to={isAuthenticated ? "/products" : "/signup"}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {isAuthenticated ? "Browse Books" : "Get Started"}
          </Button>
        </Container>
      </Box>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
};

export default Home;