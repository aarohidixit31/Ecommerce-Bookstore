import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  MenuBook
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MenuBook sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="div">
                Bookstore
              </Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Your trusted partner in discovering amazing books. 
              We've been connecting readers with great stories since 2020.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" size="small">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" size="small">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="hover"
                variant="body2"
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/products"
                color="inherit"
                underline="hover"
                variant="body2"
              >
                All Books
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                underline="hover"
                variant="body2"
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/cart"
                color="inherit"
                underline="hover"
                variant="body2"
              >
                Shopping Cart
              </Link>
            </Box>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/products?category=fiction"
                color="inherit"
                underline="hover"
                variant="body2"
              >
                Fiction
              </Link>
              <Link
                component={RouterLink}
                to="/products?category=non-fiction"
                color="inherit"
                underline="hover"
                variant="body2"
              >
                Non-Fiction
              </Link>
              <Link
                component={RouterLink}
                to="/products?category=comics"
                color="inherit"
                underline="hover"
                variant="body2"
              >
                Comics & Graphic Novels
              </Link>
              <Link
                component={RouterLink}
                to="/products?category=feel-good"
                color="inherit"
                underline="hover"
                variant="body2"
              >
                Feel-Good Books
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  support@bookstore.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  123 Book Street, Reading City, RC 12345
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'grey.700' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="grey.400">
            © 2024 Bookstore. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="grey.400" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" color="grey.400" underline="hover" variant="body2">
              Terms of Service
            </Link>
            <Link href="#" color="grey.400" underline="hover" variant="body2">
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;