import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Divider,
  Alert,
  Fab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Save as SaveIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import LanguageSwitcher from '../../components/shared/LanguageSwitcher';
import PersonalInfoForm from './components/PersonalInfoForm';
import WorkExperienceForm from './components/WorkExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import CVPreview from './components/CVPreview';
import TemplateSelector from './components/TemplateSelector';

// Initial CV data structure
const initialCVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    profilePicture: null,
  },
  workExperience: [],
  education: [],
  skills: [],
  selectedTemplate: 'modern',
};

const CVGenerator = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [cvData, setCvData] = useState(initialCVData);
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('cvGeneratorData');
    if (savedData) {
      try {
        setCvData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved CV data:', error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever cvData changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('cvGeneratorData', JSON.stringify(cvData));
      setSaveStatus('Draft saved automatically');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cvData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const updateCVData = (section, data) => {
    setCvData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('cvGeneratorData', JSON.stringify(cvData));
    setSaveStatus('CV saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleExportPDF = () => {
    // PDF export functionality will be implemented
    console.log('Exporting PDF...');
    setSaveStatus('PDF export feature coming soon!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const tabContent = [
    {
      label: t('Personal Information'),
      component: (
        <PersonalInfoForm
          data={cvData.personalInfo}
          onChange={(data) => updateCVData('personalInfo', data)}
        />
      ),
    },
    {
      label: t('Work Experience'),
      component: (
        <WorkExperienceForm
          data={cvData.workExperience}
          onChange={(data) => updateCVData('workExperience', data)}
        />
      ),
    },
    {
      label: t('Education'),
      component: (
        <EducationForm
          data={cvData.education}
          onChange={(data) => updateCVData('education', data)}
        />
      ),
    },
    {
      label: t('Skills'),
      component: (
        <SkillsForm
          data={cvData.skills}
          onChange={(data) => updateCVData('skills', data)}
        />
      ),
    },
    {
      label: t('Template Selector'),
      component: (
        <TemplateSelector
          selectedTemplate={cvData.selectedTemplate}
          onChange={(template) => updateCVData('selectedTemplate', template)}
        />
      ),
    },
  ];

  return (
    <PageContainer title={t('CV Generator')} description={t('Create and customize your professional CV')}>
      <Box>
        {/* Header with actions */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            {t('CV Generator')}
          </Typography>
          <Box display="flex" gap={1}>
            <LanguageSwitcher variant="menu" />
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              size={isMobile ? 'small' : 'medium'}
            >
              {t('Save')}
            </Button>
            <Button
              variant="outlined"
              startIcon={<PreviewIcon />}
              onClick={() => setShowPreview(!showPreview)}
              size={isMobile ? 'small' : 'medium'}
            >
              {showPreview ? t('Edit') : t('Preview')}
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              size={isMobile ? 'small' : 'medium'}
            >
              {t('Print')}
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleExportPDF}
              size={isMobile ? 'small' : 'medium'}
            >
              {t('Export PDF')}
            </Button>
          </Box>
        </Box>

        {/* Save status alert */}
        {saveStatus && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {saveStatus}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Form Section */}
          {!showPreview && (
            <Grid xs={12} lg={8}>
              <DashboardCard>
                <Box>
                  {/* Tabs */}
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant={isMobile ? 'scrollable' : 'standard'}
                    scrollButtons="auto"
                    sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
                  >
                    {tabContent.map((tab, index) => (
                      <Tab key={index} label={tab.label} />
                    ))}
                  </Tabs>

                  {/* Tab Content */}
                  <Box>{tabContent[activeTab].component}</Box>
                </Box>
              </DashboardCard>
            </Grid>
          )}

          {/* Preview Section */}
          <Grid xs={12} lg={showPreview ? 12 : 4}>
            <DashboardCard>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {t('Preview')}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <CVPreview cvData={cvData} />
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>

        {/* Floating Action Button for mobile */}
        {isMobile && !showPreview && (
          <Fab
            color="primary"
            aria-label="preview"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={() => setShowPreview(true)}
          >
            <PreviewIcon />
          </Fab>
        )}
      </Box>
    </PageContainer>
  );
};

export default CVGenerator;
