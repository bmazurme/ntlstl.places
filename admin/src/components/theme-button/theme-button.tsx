import { useContext } from 'react';
 
import { IconButton } from '@mui/material';
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
 
import { ThemeContext } from '../../context';
 
export default function ThemeButton() {
  const { isDark, toggleIsDark } = useContext(ThemeContext);
 
  return (
    <IconButton
      size="small"
      aria-label="theme"
      title={`Перейти на ${isDark === 'light' ? 'тёмную' : 'светлую'} сторону`}
      onClick={toggleIsDark}
    >
      {isDark === 'light'
        ? <DarkModeIcon fontSize="inherit" />
        : <LightModeIcon fontSize="inherit" />}
    </IconButton>
  );
}
