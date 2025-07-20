import React, { useContext, useState, useEffect } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { CustomizerContext } from '@/context/CustomizerContext';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import LanguageData from '@/components/language/LanguageData';

const Language = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLanguage, setIsLanguage } = useContext(CustomizerContext);
  const { i18n } = useTranslation();
  
  const open = Boolean(anchorEl);
  const currentLang = LanguageData.find((lang) => lang.locale === isLanguage) || LanguageData[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang.locale);
    setIsLanguage(lang.locale);
    localStorage.setItem('i18nextLng', lang.locale);
    handleClose();
  };
  useEffect(() => {
    i18n.changeLanguage(isLanguage);
  }, [isLanguage, i18n]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Avatar
          src={currentLang.icon}
          alt={currentLang.locale}
          sx={{ width: 20, height: 20 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 20,
              height: 20,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LanguageData.map((lang) => (
          <MenuItem
            key={lang.id}
            onClick={() => handleLanguageChange(lang)}
            selected={isLanguage === lang.locale}
            sx={{ py: 1, px: 2, display: 'flex', gap: 1 }}
          >
            <Avatar src={lang.icon} sx={{ width: '20px', height: '20px' }} />
            <Typography variant="subtitle2" fontWeight={600}>
              {lang.flagname}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Language;
