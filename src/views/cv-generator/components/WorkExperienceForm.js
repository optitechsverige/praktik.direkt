import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
  FormControlLabel,
  Checkbox,
  Collapse,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const WorkExperienceForm = ({ data, onChange }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [errors, setErrors] = useState({});

  const addWorkExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
    };

    onChange([...data, newExperience]);
    setExpandedItems(prev => ({ ...prev, [newExperience.id]: true }));
  };

  const updateWorkExperience = (id, field, value) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        
        // If current job is checked, clear end date
        if (field === 'isCurrentJob' && value) {
          updated.endDate = '';
        }
        
        return updated;
      }
      return item;
    });

    onChange(updatedData);

    // Clear errors for this field
    if (errors[`${id}-${field}`]) {
      setErrors(prev => ({ ...prev, [`${id}-${field}`]: '' }));
    }
  };

  const removeWorkExperience = (id) => {
    onChange(data.filter(item => item.id !== id));
    setExpandedItems(prev => {
      const newExpanded = { ...prev };
      delete newExpanded[id];
      return newExpanded;
    });
  };

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const validateDates = (startDate, endDate, isCurrentJob) => {
    if (!startDate) return 'Start date is required';
    if (!isCurrentJob && !endDate) return 'End date is required for past positions';
    if (!isCurrentJob && endDate && new Date(startDate) > new Date(endDate)) {
      return 'Start date cannot be after end date';
    }
    return '';
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Work Experience
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your professional work experience in reverse chronological order
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addWorkExperience}
          size="small"
        >
          Add Experience
        </Button>
      </Box>

      {data.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          No work experience added yet. Click "Add Experience" to get started.
        </Alert>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="work-experience">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((experience, index) => (
                  <Draggable
                    key={experience.id}
                    draggableId={experience.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        variant="outlined"
                        sx={{
                          mb: 2,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                          transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
                        }}
                      >
                        <CardContent>
                          {/* Header */}
                          <Box display="flex" alignItems="center" mb={2}>
                            <Box {...provided.dragHandleProps} sx={{ mr: 1 }}>
                              <DragIcon color="action" />
                            </Box>
                            <Box flexGrow={1}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {experience.title || 'New Position'}
                                {experience.company && ` at ${experience.company}`}
                              </Typography>
                              {(experience.startDate || experience.endDate) && (
                                <Typography variant="body2" color="text.secondary">
                                  {formatDate(experience.startDate)} - {
                                    experience.isCurrentJob ? 'Present' : formatDate(experience.endDate)
                                  }
                                </Typography>
                              )}
                            </Box>
                            <Box>
                              <IconButton
                                size="small"
                                onClick={() => toggleExpanded(experience.id)}
                              >
                                {expandedItems[experience.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => removeWorkExperience(experience.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Expandable Content */}
                          <Collapse in={expandedItems[experience.id]} timeout="auto">
                            <Grid container spacing={2}>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Job Title"
                                  value={experience.title}
                                  onChange={(e) => updateWorkExperience(experience.id, 'title', e.target.value)}
                                  placeholder="e.g., Software Engineer"
                                  required
                                  size="small"
                                />
                              </Grid>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Company"
                                  value={experience.company}
                                  onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                                  placeholder="e.g., Tech Corp Inc."
                                  required
                                  size="small"
                                />
                              </Grid>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Location"
                                  value={experience.location}
                                  onChange={(e) => updateWorkExperience(experience.id, 'location', e.target.value)}
                                  placeholder="e.g., New York, NY"
                                  size="small"
                                />
                              </Grid>
                              <Grid xs={12} sm={6}>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={experience.isCurrentJob}
                                        onChange={(e) => updateWorkExperience(experience.id, 'isCurrentJob', e.target.checked)}
                                        size="small"
                                      />
                                    }
                                    label="Current Job"
                                  />
                                </Box>
                              </Grid>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Start Date"
                                  type="month"
                                  value={experience.startDate}
                                  onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                                  required
                                  size="small"
                                  InputLabelProps={{ shrink: true }}
                                />
                              </Grid>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="End Date"
                                  type="month"
                                  value={experience.endDate}
                                  onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                                  disabled={experience.isCurrentJob}
                                  required={!experience.isCurrentJob}
                                  size="small"
                                  InputLabelProps={{ shrink: true }}
                                  helperText={experience.isCurrentJob ? 'Current position' : ''}
                                />
                              </Grid>
                              <Grid xs={12}>
                                <TextField
                                  fullWidth
                                  label="Job Description"
                                  value={experience.description}
                                  onChange={(e) => updateWorkExperience(experience.id, 'description', e.target.value)}
                                  placeholder="Describe your key responsibilities and achievements..."
                                  multiline
                                  rows={3}
                                  size="small"
                                  helperText="Use bullet points to highlight your key achievements and responsibilities"
                                />
                              </Grid>
                            </Grid>
                          </Collapse>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {data.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DragIcon fontSize="small" />
            Drag and drop to reorder your work experience
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WorkExperienceForm;
