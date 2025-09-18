import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Search,
  FilterList,
  ExpandMore,
  Star,
  ShoppingCart
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { booksData, searchBooks } from '../data/booksData';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(booksData);
  const [filteredProducts, setFilteredProducts] = useState(booksData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('title');
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'comics', label: 'Comics & Graphic Novels' },
    { value: 'feel-good', label: 'Feel-Good Books' }
  ];

  const sortOptions = [
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'author', label: 'Author (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Rating (High to Low)' }
  ];

  // Filter and search functionality
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, priceRange, sortBy, showDiscountOnly, products]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, setSearchParams]);

  const applyFilters = () => {
    let filtered = searchBooks(searchTerm, {
      category: selectedCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      hasDiscount: showDiscountOnly
    });

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'price-low':
          return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
        case 'price-high':
          return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
        case 'rating':
          return (b.averageRating || 0) - (a.averageRating || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setPage(1); // Reset to first page when filters change
  };

  const getMockProducts = () => {
    return [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 299,
        discountedPrice: 249,
        imageUrl: "https://via.placeholder.com/200x300?text=Book+1",
        description: "A classic American novel"
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 399,
        discountedPrice: 349,
        imageUrl: "https://via.placeholder.com/200x300?text=Book+2",
        description: "A gripping tale of racial injustice"
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 349,
        discountedPrice: 299,
        imageUrl: "https://via.placeholder.com/200x300?text=Book+3",
        description: "A dystopian social science fiction novel"
      },
      {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 279,
        discountedPrice: 229,
        imageUrl: "https://via.placeholder.com/200x300?text=Book+4",
        description: "A romantic novel of manners"
      },
      {
        id: 5,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 329,
        discountedPrice: 279,
        imageUrl: "https://via.placeholder.com/200x300?text=Book+5",
        description: "A controversial coming-of-age story"
      },
      {
        id: 6,
        title: "Lord of the Flies",
        author: "William Golding",
        price: 299,
        discountedPrice: 249,
        imageUrl: "https://via.placeholder.com/200x300?text=Book+6",
        description: "A novel about the dark side of human nature"
      }
    ];
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      alert(`${product.title} added to cart!`);
    } else {
      alert('Failed to add product to cart');
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        Discover Amazing Books
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterList /> Filters
            </Typography>
            
            {/* Search */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Search books..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>

            {/* Category Filter */}
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Price Range */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">Price Range</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ px: 1 }}>
                  <Slider
                    value={priceRange}
                    onChange={(e, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={50}
                    marks={[
                      { value: 0, label: '₹0' },
                      { value: 500, label: '₹500' },
                      { value: 1000, label: '₹1000+' }
                    ]}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2">₹{priceRange[0]}</Typography>
                    <Typography variant="body2">₹{priceRange[1]}</Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Discount Filter */}
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showDiscountOnly}
                    onChange={(e) => setShowDiscountOnly(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show discounted books only"
              />
            </Box>

            {/* Clear Filters */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange([0, 1000]);
                setShowDiscountOnly(false);
                setSortBy('title');
              }}
              sx={{ mt: 2 }}
            >
              Clear All Filters
            </Button>
          </Paper>
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={9}>
          {/* Results Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              {filteredProducts.length} books found
              {selectedCategory !== 'all' && (
                <Chip 
                  label={categories.find(c => c.value === selectedCategory)?.label}
                  onDelete={() => setSelectedCategory('all')}
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
            
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Products Grid */}
              <Grid container spacing={3}>
                {paginatedProducts.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} lg={4}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="280"
                          image={product.imageUrl}
                          alt={product.title}
                          sx={{ objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/280x280/f5f5f5/666666?text=${encodeURIComponent(product.title.substring(0, 20))}`;
                          }}
                        />
                        {product.discountedPrice && product.discountedPrice < product.price && (
                          <Chip
                            label={`${Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF`}
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
                            WebkitBoxOrient: 'vertical',
                            minHeight: '3.2em'
                          }}
                        >
                          {product.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          by {product.author}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {product.genre}
                        </Typography>
                        
                        {/* Rating */}
                        {product.averageRating && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Star sx={{ color: 'gold', fontSize: 16 }} />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {product.averageRating.toFixed(1)} ({product.numRatings})
                            </Typography>
                          </Box>
                        )}
                        
                        {/* Price */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          {product.discountedPrice && product.discountedPrice < product.price ? (
                            <>
                              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                ₹{product.discountedPrice}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  textDecoration: 'line-through', 
                                  color: 'text.secondary' 
                                }}
                              >
                                ₹{product.price}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                              ₹{product.price}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          size="small" 
                          component={Link} 
                          to={`/products/${product.id}`}
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
                            onClick={() => handleAddToCart(product)}
                            startIcon={<ShoppingCart />}
                            sx={{ ml: 1, minWidth: 'auto', px: 1 }}
                          >
                            Buy Now
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <Paper sx={{ p: 6, textAlign: 'center', mt: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No books found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Try adjusting your search criteria or browse our categories.
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange([0, 1000]);
                      setShowDiscountOnly(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Paper>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;