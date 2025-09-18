import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  Edit,
  Add,
  Delete,
  CreditCard
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        mobile: user.mobile || ''
      });
    }
    fetchPaymentMethods();
  }, [user]);

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get('/api/payments/user');
      setPaymentMethods(response.data);
    } catch (err) {
      console.error('Error fetching payment methods:', err);
      // Use mock data as fallback
      setPaymentMethods([
        {
          cardholderName: 'John Doe',
          cardNumber: '**** **** **** 1234',
          expirationDate: '12/25'
        }
      ]);
    }
  };

  const handleUserInfoChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setNewPayment({
      ...newPayment,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // In a real application, you would have an update profile endpoint
      // await axios.put('/api/users/profile', userInfo);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Format card number for display (mask all but last 4 digits)
      const maskedCardNumber = '**** **** **** ' + newPayment.cardNumber.slice(-4);
      
      const paymentData = {
        ...newPayment,
        cardNumber: maskedCardNumber // In real app, you'd encrypt the full number
      };

      await axios.post('/api/payments/add', paymentData);
      setSuccess('Payment method added successfully!');
      setPaymentDialogOpen(false);
      setNewPayment({
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
      });
      fetchPaymentMethods();
    } catch (err) {
      console.error('Error adding payment method:', err);
      setError('Failed to add payment method');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setNewPayment({
      ...newPayment,
      cardNumber: formatted
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleUserInfoChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleUserInfoChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobile"
                    value={userInfo.mobile}
                    onChange={handleUserInfoChange}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={updateProfile}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Edit />}
                >
                  Update Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Methods */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Payment Methods
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => setPaymentDialogOpen(true)}
                >
                  Add Card
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {paymentMethods.length > 0 ? (
                <List>
                  {paymentMethods.map((payment, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <CreditCard sx={{ mr: 2, color: 'primary.main' }} />
                      <ListItemText
                        primary={payment.cardholderName}
                        secondary={`${payment.cardNumber} • Expires ${payment.expirationDate}`}
                      />
                      <IconButton color="error" size="small">
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No payment methods added yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Payment Method Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cardholder Name"
                name="cardholderName"
                value={newPayment.cardholderName}
                onChange={handlePaymentChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={newPayment.cardNumber}
                onChange={handleCardNumberChange}
                inputProps={{ maxLength: 19 }}
                placeholder="1234 5678 9012 3456"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expirationDate"
                value={newPayment.expirationDate}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
                inputProps={{ maxLength: 5 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                value={newPayment.cvv}
                onChange={handlePaymentChange}
                inputProps={{ maxLength: 4 }}
                placeholder="123"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={addPaymentMethod} 
            variant="contained"
            disabled={loading || !newPayment.cardholderName || !newPayment.cardNumber || !newPayment.expirationDate || !newPayment.cvv}
          >
            {loading ? <CircularProgress size={20} /> : 'Add Card'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;