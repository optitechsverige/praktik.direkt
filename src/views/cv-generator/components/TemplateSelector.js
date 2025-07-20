import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Chip,
  Paper,
  Avatar,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design with sections clearly separated and professional styling',
    preview: 'modern-preview',
    features: ['Profile Picture', 'Progress Bars for Skills', 'Clean Typography', 'Color Accents'],
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple, elegant design focusing on content with minimal visual elements',
    preview: 'minimal-preview',
    features: ['Centered Layout', 'Simple Typography', 'Skill Tags', 'Clean Lines'],
  },
  {
    id: 'creative',
    name: 'Creative Design',
    description: 'Eye-catching design with creative elements for design and creative roles',
    preview: 'creative-preview',
    features: ['Creative Layout', 'Color Blocks', 'Visual Elements', 'Bold Typography'],
    comingSoon: true,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional executive-level template with sophisticated styling',
    preview: 'executive-preview',
    features: ['Executive Style', 'Professional Layout', 'Elegant Typography', 'Business Focus'],
    comingSoon: true,
  },
];

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const renderTemplatePreview = (template) => {
    if (template.id === 'modern') {
      return (
        <Paper elevation={1} sx={{ p: 2, height: 200, overflow: 'hidden' }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }} />
            <Box>
              <Typography variant="caption" fontWeight="bold">John Doe</Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                Software Engineer
              </Typography>
            </Box>
          </Box>
          <Box sx={{ height: 4, bgcolor: 'primary.main', mb: 1, borderRadius: 2 }} />
          <Typography variant="caption" display="block" mb={1}>
            Professional Summary
          </Typography>
          <Box sx={{ height: 2, bgcolor: 'grey.300', mb: 1, width: '80%' }} />
          <Box sx={{ height: 2, bgcolor: 'grey.300', mb: 1, width: '60%' }} />
          <Typography variant="caption" display="block" mb={1}>
            Experience
          </Typography>
          <Box sx={{ height: 2, bgcolor: 'grey.300', mb: 0.5, width: '70%' }} />
          <Box sx={{ height: 2, bgcolor: 'grey.300', mb: 1, width: '50%' }} />
          <Typography variant="caption" display="block" mb={1}>
            Skills
          </Typography>
          <Box display="flex" gap={0.5} mb={1}>
            <Box sx={{ height: 8, bgcolor: 'success.main', width: 20, borderRadius: 1 }} />
            <Box sx={{ height: 8, bgcolor: 'info.main', width: 15, borderRadius: 1 }} />
            <Box sx={{ height: 8, bgcolor: 'warning.main', width: 18, borderRadius: 1 }} />
          </Box>
        </Paper>
      );
    }

    if (template.id === 'minimal') {
      return (
        <Paper elevation={1} sx={{ p: 2, height: 200, overflow: 'hidden', textAlign: 'center' }}>
          <Avatar sx={{ width: 20, height: 20, mx: 'auto', mb: 1, bgcolor: 'grey.400' }} />
          <Typography variant="caption" fontWeight="300" display="block" mb={1}>
            JOHN DOE
          </Typography>
          <Box sx={{ height: 1, bgcolor: 'grey.300', mb: 1, mx: 2 }} />
          <Typography variant="caption" display="block" mb={1} sx={{ fontStyle: 'italic' }}>
            Professional summary text here
          </Typography>
          <Box sx={{ height: 1, bgcolor: 'grey.300', mb: 1, mx: 2 }} />
          <Typography variant="caption" display="block" mb={1} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            EXPERIENCE
          </Typography>
          <Box sx={{ height: 1, bgcolor: 'grey.300', mb: 0.5, width: '60%', mx: 'auto' }} />
          <Box sx={{ height: 1, bgcolor: 'grey.300', mb: 1, width: '40%', mx: 'auto' }} />
          <Typography variant="caption" display="block" mb={1} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            SKILLS
          </Typography>
          <Box display="flex" justifyContent="center" gap={0.5}>
            <Box sx={{ height: 6, bgcolor: 'grey.400', width: 12, borderRadius: 3, border: '1px solid grey' }} />
            <Box sx={{ height: 6, bgcolor: 'grey.400', width: 10, borderRadius: 3, border: '1px solid grey' }} />
            <Box sx={{ height: 6, bgcolor: 'grey.400', width: 14, borderRadius: 3, border: '1px solid grey' }} />
          </Box>
        </Paper>
      );
    }

    // Coming soon templates
    return (
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          height: 200, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'grey.50',
          border: '2px dashed',
          borderColor: 'grey.300'
        }}
      >
        <Box textAlign="center">
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This template is under development
          </Typography>
        </Box>
      </Paper>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose Template
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select a template that best fits your profession and style
      </Typography>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid xs={12} md={6} key={template.id}>
            <Card 
              variant="outlined"
              sx={{ 
                position: 'relative',
                border: selectedTemplate === template.id ? 2 : 1,
                borderColor: selectedTemplate === template.id ? 'primary.main' : 'divider',
                opacity: template.comingSoon ? 0.7 : 1,
              }}
            >
              <CardActionArea 
                onClick={() => !template.comingSoon && onChange(template.id)}
                disabled={template.comingSoon}
              >
                <CardContent>
                  {/* Selection Indicator */}
                  {selectedTemplate === template.id && (
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8, 
                        zIndex: 1 
                      }}
                    >
                      <CheckCircleIcon color="primary" />
                    </Box>
                  )}

                  {/* Template Preview */}
                  <Box mb={2}>
                    {renderTemplatePreview(template)}
                  </Box>

                  {/* Template Info */}
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6" component="h3">
                        {template.name}
                      </Typography>
                      {template.comingSoon && (
                        <Chip label="Coming Soon" size="small" color="default" />
                      )}
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {template.description}
                    </Typography>

                    {/* Features */}
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {template.features.map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Template Info */}
      <Box mt={3} p={2} bgcolor="background.paper" borderRadius={1} border="1px solid" borderColor="divider">
        <Typography variant="body2" color="text.secondary">
          <strong>Note:</strong> You can switch between templates at any time. Your content will be automatically 
          adapted to the selected template style. More templates are coming soon!
        </Typography>
      </Box>
    </Box>
  );
};

export default TemplateSelector;
