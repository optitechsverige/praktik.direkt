import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  Alert,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const PersonalInfoForm = ({ data, onChange }) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (field, value) => {
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Validate on change
    let newErrors = { ...errors };
    if (field === 'email' && value && !validateEmail(value)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (field === 'phone' && value && !validatePhone(value)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if ((field === 'firstName' || field === 'lastName') && value && value.length < 2) {
      newErrors[field] = 'Name must be at least 2 characters long';
    }

    setErrors(newErrors);

    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePicture: 'Please select a valid image file' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'Image size should be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({
          ...data,
          profilePicture: e.target.result,
        });
        setErrors(prev => ({ ...prev, profilePicture: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    onChange({
      ...data,
      profilePicture: null,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('Personal Information')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('Add your basic information and professional summary')}
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Picture Section */}
        <Grid xs={12} md={4}>
          <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Avatar
                src={data.profilePicture}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-picture-upload"
                type="file"
                onChange={handleProfilePictureChange}
              />
              <label htmlFor="profile-picture-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                  size="small"
                  sx={{ mb: 1 }}
                >
                  {t('Upload Photo')}
                </Button>
              </label>
              {data.profilePicture && (
                <Box>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={handleRemoveProfilePicture}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              {errors.profilePicture && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.profilePicture}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Basic Information */}
        <Grid xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={data.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={data.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={data.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={data.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="City, State, Country"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Professional Summary */}
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Professional Summary"
            value={data.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
            multiline
            rows={4}
            helperText={`${data.summary.length}/500 characters`}
            inputProps={{ maxLength: 500 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm;
