import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  Paper,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const CVPreview = ({ cvData }) => {
  const { personalInfo, workExperience, education, skills, selectedTemplate } = cvData;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getProficiencyPercentage = (level) => {
    return (level / 5) * 100;
  };

  const getProficiencyColor = (level) => {
    if (level >= 4) return 'success';
    if (level >= 3) return 'info';
    if (level >= 2) return 'warning';
    return 'error';
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const renderModernTemplate = () => (
    <Paper elevation={2} sx={{ p: 4, maxWidth: '210mm', mx: 'auto', backgroundColor: 'background.paper' }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={4}>
        {personalInfo.profilePicture && (
          <Avatar
            src={personalInfo.profilePicture}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
        )}
        <Box flexGrow={1}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {personalInfo.firstName} {personalInfo.lastName}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
            {personalInfo.email && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <EmailIcon fontSize="small" color="action" />
                <Typography variant="body2">{personalInfo.email}</Typography>
              </Box>
            )}
            {personalInfo.phone && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="body2">{personalInfo.phone}</Typography>
              </Box>
            )}
            {personalInfo.address && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <LocationIcon fontSize="small" color="action" />
                <Typography variant="body2">{personalInfo.address}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <Box mb={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
            Professional Summary
          </Typography>
          <Typography variant="body1" paragraph>
            {personalInfo.summary}
          </Typography>
          <Divider />
        </Box>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <Box mb={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
            Work Experience
          </Typography>
          {workExperience.map((exp, index) => (
            <Box key={exp.id} mb={3}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {exp.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.company}{exp.location && `, ${exp.location}`}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                </Typography>
              </Box>
              {exp.description && (
                <Typography variant="body2" paragraph>
                  {exp.description}
                </Typography>
              )}
              {index < workExperience.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
          <Divider />
        </Box>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Box mb={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
            Education
          </Typography>
          {education.map((edu, index) => (
            <Box key={edu.id} mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.institution}{edu.location && `, ${edu.location}`}
                  </Typography>
                  {edu.gpa && (
                    <Typography variant="body2" color="text.secondary">
                      GPA: {edu.gpa}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate) || 'Present'}
                </Typography>
              </Box>
              {edu.description && (
                <Typography variant="body2" paragraph>
                  {edu.description}
                </Typography>
              )}
              {index < education.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
          <Divider />
        </Box>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
            Skills & Competencies
          </Typography>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Box key={category} mb={3}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                {category}
              </Typography>
              <Grid container spacing={2}>
                {categorySkills.map((skill) => (
                  <Grid xs={12} sm={6} key={skill.id}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="body2" sx={{ minWidth: 100 }}>
                        {skill.name}
                      </Typography>
                      <Box flexGrow={1}>
                        <LinearProgress
                          variant="determinate"
                          value={getProficiencyPercentage(skill.proficiency)}
                          color={getProficiencyColor(skill.proficiency)}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                      <Chip
                        label={skill.proficiency}
                        size="small"
                        color={getProficiencyColor(skill.proficiency)}
                        sx={{ minWidth: 30, height: 20, fontSize: '0.7rem' }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );

  const renderMinimalTemplate = () => (
    <Paper elevation={1} sx={{ p: 3, maxWidth: '210mm', mx: 'auto', backgroundColor: 'background.paper' }}>
      {/* Header */}
      <Box textAlign="center" mb={3}>
        {personalInfo.profilePicture && (
          <Avatar
            src={personalInfo.profilePicture}
            sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
          />
        )}
        <Typography variant="h5" fontWeight="300" gutterBottom>
          {personalInfo.firstName} {personalInfo.lastName}
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
          {personalInfo.email && <Typography variant="body2">{personalInfo.email}</Typography>}
          {personalInfo.phone && <Typography variant="body2">{personalInfo.phone}</Typography>}
          {personalInfo.address && <Typography variant="body2">{personalInfo.address}</Typography>}
        </Box>
      </Box>

      {personalInfo.summary && (
        <Box mb={3} textAlign="center">
          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            {personalInfo.summary}
          </Typography>
        </Box>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Content in simple format */}
      {workExperience.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" fontWeight="300" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            Experience
          </Typography>
          {workExperience.map((exp) => (
            <Box key={exp.id} mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {exp.title} • {exp.company}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
              </Typography>
              {exp.description && (
                <Typography variant="body2">{exp.description}</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {education.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" fontWeight="300" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            Education
          </Typography>
          {education.map((edu) => (
            <Box key={edu.id} mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {edu.degree}{edu.field && ` in ${edu.field}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.institution} • {formatDate(edu.startDate)} - {formatDate(edu.endDate) || 'Present'}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {skills.length > 0 && (
        <Box>
          <Typography variant="h6" fontWeight="300" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            Skills
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {skills.map((skill) => (
              <Chip
                key={skill.id}
                label={skill.name}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimal':
        return renderMinimalTemplate();
      case 'modern':
      default:
        return renderModernTemplate();
    }
  };

  return (
    <Box sx={{ minHeight: 400 }}>
      {!personalInfo.firstName && !personalInfo.lastName ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            CV Preview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start filling out your information to see the preview
          </Typography>
        </Box>
      ) : (
        renderTemplate()
      )}
    </Box>
  );
};

export default CVPreview;
