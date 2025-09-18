import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import {
  MenuBook,
  People,
  LocalShipping,
  Star,
  Timeline,
  Favorite
} from '@mui/icons-material';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Book lover with 15+ years in publishing industry",
      avatar: "https://via.placeholder.com/150?text=SJ"
    },
    {
      name: "Michael Chen",
      role: "Head of Curation",
      description: "Literature expert specializing in contemporary fiction",
      avatar: "https://via.placeholder.com/150?text=MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience",
      description: "Ensuring every reader finds their perfect book",
      avatar: "https://via.placeholder.com/150?text=ER"
    }
  ];

  const values = [
    {
      icon: <MenuBook sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: "Curated Selection",
      description: "Every book in our collection is carefully selected by our team of literary experts."
    },
    {
      icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: "Community First",
      description: "We believe in building a community of readers who share their passion for great stories."
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: "Fast Delivery",
      description: "Get your books delivered quickly and safely, so you can start reading sooner."
    },
    {
      icon: <Star sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: "Quality Guarantee",
      description: "We stand behind every book we sell with our satisfaction guarantee."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          About Our Bookstore
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
          We're passionate about connecting readers with the books they'll love. 
          Since 2020, we've been curating an exceptional collection of books across all genres.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
          <Chip label="10,000+ Books" color="primary" />
          <Chip label="50,000+ Happy Readers" color="secondary" />
          <Chip label="4.8★ Rating" color="success" />
        </Box>
      </Box>

      {/* Our Story Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Our Story
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              height: 400, 
              bgcolor: 'primary.light', 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Timeline sx={{ fontSize: 100 }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              From Book Lovers to Book Sellers
            </Typography>
            <Typography variant="body1" paragraph>
              What started as a small passion project among friends has grown into one of the most 
              trusted online bookstores. We began with a simple mission: make it easier for people 
              to discover and access great books.
            </Typography>
            <Typography variant="body1" paragraph>
              Today, we serve thousands of readers worldwide, offering everything from bestsellers 
              to hidden gems, from classic literature to the latest releases. Our team of book 
              enthusiasts works tirelessly to ensure every customer finds exactly what they're looking for.
            </Typography>
            <Typography variant="body1">
              We believe that books have the power to transform lives, spark imagination, and 
              connect people across cultures and generations.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Our Values Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          What We Stand For
        </Typography>
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  src={member.avatar}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ 
        textAlign: 'center', 
        bgcolor: 'primary.main', 
        color: 'white', 
        p: 6, 
        borderRadius: 2 
      }}>
        <Favorite sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Join Our Reading Community
        </Typography>
        <Typography variant="h6" paragraph>
          Discover your next favorite book and connect with fellow readers
        </Typography>
        <Typography variant="body1">
          Whether you're looking for the latest bestseller, a classic you've always meant to read, 
          or something completely new, we're here to help you find it.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;