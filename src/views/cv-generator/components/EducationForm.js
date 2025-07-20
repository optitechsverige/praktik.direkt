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
  Collapse,
  Alert,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const degreeTypes = [
  'High School Diploma',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctoral Degree',
  'Certificate',
  'Professional Certification',
  'Other',
];

const EducationForm = ({ data, onChange }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: '',
      field: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };

    onChange([...data, newEducation]);
    setExpandedItems(prev => ({ ...prev, [newEducation.id]: true }));
  };

  const updateEducation = (id, field, value) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });

    onChange(updatedData);
  };

  const removeEducation = (id) => {
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
            Education
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your educational background in reverse chronological order
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addEducation}
          size="small"
        >
          Add Education
        </Button>
      </Box>

      {data.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          No education added yet. Click "Add Education" to get started.
        </Alert>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="education">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((education, index) => (
                  <Draggable
                    key={education.id}
                    draggableId={education.id}
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
                                {education.degree || 'New Education'}
                                {education.field && ` in ${education.field}`}
                              </Typography>
                              {education.institution && (
                                <Typography variant="body2" color="text.secondary">
                                  {education.institution}
                                  {education.location && `, ${education.location}`}
                                </Typography>
                              )}
                              {(education.startDate || education.endDate) && (
                                <Typography variant="body2" color="text.secondary">
                                  {formatDate(education.startDate)} - {formatDate(education.endDate)}
                                </Typography>
                              )}
                            </Box>
                            <Box>
                              <IconButton
                                size="small"
                                onClick={() => toggleExpanded(education.id)}
                              >
                                {expandedItems[education.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => removeEducation(education.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Expandable Content */}
                          <Collapse in={expandedItems[education.id]} timeout="auto">
                            <Grid container spacing={2}>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  select
                                  label="Degree Type"
                                  value={education.degree}
                                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                                  required
                                  size="small"
                                >
                                  {degreeTypes.map((degree) => (
                                    <MenuItem key={degree} value={degree}>
                                      {degree}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Grid>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Field of Study"
                                  value={education.field}
                                  onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                                  placeholder="e.g., Computer Science"
                                  size="small"
                                />
                              </Grid>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Institution"
                                  value={education.institution}
                                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                                  placeholder="e.g., University of Technology"
                                  required
                                  size="small"
                                />
                              </Grid>
                              <Grid xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Location"
                                  value={education.location}
                                  onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                                  placeholder="e.g., Boston, MA"
                                  size="small"
                                />
                              </Grid>
                              <Grid xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  label="Start Date"
                                  type="month"
                                  value={education.startDate}
                                  onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                                  required
                                  size="small"
                                  InputLabelProps={{ shrink: true }}
                                />
                              </Grid>
                              <Grid xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  label="End Date"
                                  type="month"
                                  value={education.endDate}
                                  onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                                  size="small"
                                  InputLabelProps={{ shrink: true }}
                                  helperText="Leave empty if ongoing"
                                />
                              </Grid>
                              <Grid xs={12} sm={4}>
                                <TextField
                                  fullWidth
                                  label="GPA (Optional)"
                                  value={education.gpa}
                                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                                  placeholder="e.g., 3.8/4.0"
                                  size="small"
                                  helperText="Include if 3.5+ or relevant"
                                />
                              </Grid>
                              <Grid xs={12}>
                                <TextField
                                  fullWidth
                                  label="Additional Details"
                                  value={education.description}
                                  onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                                  placeholder="Relevant coursework, honors, achievements, thesis topic..."
                                  multiline
                                  rows={2}
                                  size="small"
                                  helperText="Include honors, relevant coursework, or notable achievements"
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
            Drag and drop to reorder your education
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EducationForm;
