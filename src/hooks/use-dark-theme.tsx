import { useState, useEffect } from 'react';

export default function useDarkTheme() {
  const currentTheme = localStorage.getItem('ms-theme');
  const condition = currentTheme === 'dark' ? 'dark' : 'light';
  const [isDark, setIsDark] = useState(condition);
  const providerValue = { isDark, setIsDark };

  useEffect(() => document.documentElement.setAttribute('ms-theme', condition), [isDark]);

  return { providerValue };
}
