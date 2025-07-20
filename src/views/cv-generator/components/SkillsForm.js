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
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Databases',
  'Tools & Technologies',
  'Cloud Platforms',
  'Operating Systems',
  'Soft Skills',
  'Languages',
  'Other',
];

const proficiencyLevels = [
  { value: 1, label: 'Beginner' },
  { value: 2, label: 'Basic' },
  { value: 3, label: 'Intermediate' },
  { value: 4, label: 'Advanced' },
  { value: 5, label: 'Expert' },
];

const commonSkills = [
  // Programming Languages
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'TypeScript',
  // Frameworks
  'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot',
  // Databases
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server',
  // Tools
  'Git', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Azure', 'Google Cloud', 'Linux',
  // Soft Skills
  'Leadership', 'Communication', 'Problem Solving', 'Team Work', 'Project Management',
];

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState({ name: '', category: '', proficiency: 3 });

  const addSkill = () => {
    if (!newSkill.name.trim()) return;

    const skill = {
      id: Date.now().toString(),
      name: newSkill.name.trim(),
      category: newSkill.category || 'Other',
      proficiency: newSkill.proficiency,
    };

    onChange([...data, skill]);
    setNewSkill({ name: '', category: '', proficiency: 3 });
  };

  const updateSkill = (id, field, value) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });

    onChange(updatedData);
  };

  const removeSkill = (id) => {
    onChange(data.filter(item => item.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSkill();
    }
  };

  const getProficiencyColor = (level) => {
    const colors = {
      1: 'error',
      2: 'warning',
      3: 'info',
      4: 'success',
      5: 'primary',
    };
    return colors[level] || 'default';
  };

  const getProficiencyLabel = (level) => {
    const labels = {
      1: 'Beginner',
      2: 'Basic',
      3: 'Intermediate',
      4: 'Advanced',
      5: 'Expert',
    };
    return labels[level] || 'Unknown';
  };

  // Group skills by category
  const groupedSkills = data.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skills & Competencies
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Add your technical and soft skills with proficiency levels
      </Typography>

      {/* Add New Skill */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Add New Skill
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid xs={12} sm={4}>
              <Autocomplete
                freeSolo
                options={commonSkills}
                value={newSkill.name}
                onInputChange={(event, newValue) => {
                  setNewSkill(prev => ({ ...prev, name: newValue || '' }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skill Name"
                    placeholder="e.g., JavaScript"
                    size="small"
                    onKeyPress={handleKeyPress}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                  label="Category"
                >
                  {skillCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={3}>
              <Box sx={{ px: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Proficiency: {getProficiencyLabel(newSkill.proficiency)}
                </Typography>
                <Slider
                  value={newSkill.proficiency}
                  onChange={(e, value) => setNewSkill(prev => ({ ...prev, proficiency: value }))}
                  min={1}
                  max={5}
                  step={1}
                  marks={proficiencyLevels}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid xs={12} sm={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addSkill}
                fullWidth
                size="small"
                disabled={!newSkill.name.trim()}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Skills List */}
      {data.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          No skills added yet. Add your first skill above to get started.
        </Alert>
      ) : (
        <Box>
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <Card key={category} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {category} ({skills.length})
                </Typography>
                
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId={`skills-${category}`}>
                    {(provided) => (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {skills.map((skill, index) => (
                          <Draggable
                            key={skill.id}
                            draggableId={skill.id}
                            index={data.indexOf(skill)}
                          >
                            {(provided, snapshot) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  mb: 1,
                                  p: 1,
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  borderRadius: 1,
                                  backgroundColor: snapshot.isDragging ? 'action.hover' : 'transparent',
                                }}
                              >
                                <Box {...provided.dragHandleProps}>
                                  <DragIcon color="action" fontSize="small" />
                                </Box>
                                
                                <Box flexGrow={1}>
                                  <TextField
                                    value={skill.name}
                                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                    size="small"
                                    variant="standard"
                                    sx={{ mr: 2, minWidth: 120 }}
                                  />
                                </Box>

                                <Chip
                                  label={getProficiencyLabel(skill.proficiency)}
                                  color={getProficiencyColor(skill.proficiency)}
                                  size="small"
                                  sx={{ minWidth: 80 }}
                                />

                                <Box sx={{ width: 100, mx: 1 }}>
                                  <Slider
                                    value={skill.proficiency}
                                    onChange={(e, value) => updateSkill(skill.id, 'proficiency', value)}
                                    min={1}
                                    max={5}
                                    step={1}
                                    size="small"
                                  />
                                </Box>

                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                  <Select
                                    value={skill.category}
                                    onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                                    variant="standard"
                                  >
                                    {skillCategories.map((cat) => (
                                      <MenuItem key={cat} value={cat}>
                                        {cat}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => removeSkill(skill.id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {data.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DragIcon fontSize="small" />
            Drag and drop to reorder your skills within each category
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SkillsForm;
