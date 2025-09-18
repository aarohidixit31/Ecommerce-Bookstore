import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade,
  Chip
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Star,
  ShoppingCart
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookCarousel = React.forwardRef(({ books = [], title = "Featured Books" }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated } = useAuth();

  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, books.length - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || books.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, books.length, itemsPerView]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <Box ref={ref} sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        align="center"
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      
      <Box 
        sx={{ 
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          bgcolor: 'grey.50'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation Arrows */}
        {books.length > itemsPerView && (
          <>
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 1)',
                },
                boxShadow: 2
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 1)',
                },
                boxShadow: 2
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </>
        )}

        {/* Carousel Container */}
        <Box
          sx={{
            display: 'flex',
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            transition: 'transform 0.5s ease-in-out',
            width: `${(books.length / itemsPerView) * 100}%`
          }}
        >
          {books.map((book, index) => (
            <Fade in={true} timeout={500} key={book.id || index}>
              <Box
                sx={{
                  width: `${100 / books.length}%`,
                  px: 2,
                  py: 3
                }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={book.imageUrl || `https://via.placeholder.com/200x300?text=${encodeURIComponent(book.title)}`}
                      alt={book.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    {book.discountedPrice && book.discountedPrice < book.price && (
                      <Chip
                        label={`${Math.round(((book.price - book.discountedPrice) / book.price) * 100)}% OFF`}
                        color="secondary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          fontWeight: 'bold'
                        }}
                      />
                    )}
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {book.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      gutterBottom
                    >
                      by {book.author}
                    </Typography>
                    
                    {/* Rating Display */}
                    {book.averageRating && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Star sx={{ color: 'gold', fontSize: 16 }} />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          {book.averageRating.toFixed(1)}
                        </Typography>
                      </Box>
                    )}
                    
                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      {book.discountedPrice && book.discountedPrice < book.price ? (
                        <>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                            ₹{book.discountedPrice}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              textDecoration: 'line-through', 
                              color: 'text.secondary' 
                            }}
                          >
                            ₹{book.price}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                          ₹{book.price}
                        </Typography>
                      )}
                    </Box>
                    
                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      <Button 
                        size="small" 
                        component={Link} 
                        to={`/products/${book.id}`}
                        variant="outlined"
                        fullWidth
                      >
                        View Details
                      </Button>
                      {isAuthenticated && (
                        <Button 
                          size="small" 
                          color="primary"
                          variant="contained"
                          startIcon={<ShoppingCart />}
                          sx={{ minWidth: 'auto', px: 1 }}
                        >
                          <ShoppingCart sx={{ fontSize: 16 }} />
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Fade>
          ))}
        </Box>

        {/* Dots Indicator */}
        {books.length > itemsPerView && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 1, 
              py: 2 
            }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: currentIndex === index ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: currentIndex === index ? 'primary.dark' : 'grey.400'
                  }
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
});

BookCarousel.displayName = 'BookCarousel';

export default BookCarousel;