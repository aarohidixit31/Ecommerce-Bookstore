import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Box,
  Divider,
  TextField,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCartCheckout
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const [updating, setUpdating] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { 
    cartItems, 
    loading, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useCart();

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Please login to view your cart
          </Typography>
          <Button variant="contained" href="/login">
            Login
          </Button>
        </Paper>
      </Container>
    );
  }

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (err) {
      console.error('Error updating cart item:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setUpdating(true);
    try {
      await removeFromCart(itemId);
    } catch (err) {
      console.error('Error removing cart item:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setUpdating(true);
      try {
        await clearCart();
      } catch (err) {
        console.error('Error clearing cart:', err);
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleCheckout = () => {
    // In a real application, this would navigate to a checkout page
    alert('Checkout functionality would be implemented here!');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Add some books to your cart to get started!
          </Typography>
          <Button variant="contained" href="/products">
            Browse Books
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart ({cartItems.length} items)
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Items in your cart</Typography>
            {cartItems.length > 0 && (
              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                onClick={handleClearCart}
                disabled={updating}
              >
                Clear Cart
              </Button>
            )}
          </Box>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {/* Product Image */}
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={item.product.imageUrl}
                      alt={item.product.title}
                      sx={{ objectFit: 'cover', borderRadius: 1 }}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150x200/f5f5f5/666666?text=${encodeURIComponent(item.product.title.substring(0, 15))}`;
                      }}
                    />
                  </Grid>

                  {/* Product Details */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                      {item.product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      by {item.product.author}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      {item.product.discountedPrice && item.product.discountedPrice < item.product.price ? (
                        <>
                          <Typography variant="h6" color="primary">
                            ₹{item.product.discountedPrice}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                          >
                            ₹{item.product.price}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h6" color="primary">
                          ₹{item.product.price}
                        </Typography>
                      )}
                    </Box>

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={updating || item.quantity <= 1}
                        size="small"
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        size="small"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          handleUpdateQuantity(item.id, newQuantity);
                        }}
                        inputProps={{ 
                          min: 1, 
                          style: { textAlign: 'center', width: '60px' } 
                        }}
                      />
                      <IconButton 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={updating}
                        size="small"
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Price and Actions */}
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" gutterBottom>
                        ₹{item.price * item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        ₹{item.price} each
                      </Typography>
                      <IconButton 
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={updating}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                </Typography>
                <Typography variant="body1">
                  ₹{getCartTotal()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Shipping
                </Typography>
                <Typography variant="body1" color="success.main">
                  FREE
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">
                  Total
                </Typography>
                <Typography variant="h6" color="primary">
                  ₹{getCartTotal()}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<ShoppingCartCheckout />}
                onClick={handleCheckout}
                disabled={updating}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;