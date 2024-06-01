import { useEffect, useState } from 'react';
import { useTheme } from 'remix-theme';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  // const isSystemTheme = theme === 'system';
  // const renderedTheme = isSystemTheme ? resolvedTheme : theme;
  const isDarkMode = resolvedTheme === 'dark';
  // const toggleColorScheme = () => {
  //   setTheme(isDarkMode ? 'light' : 'dark');
  // };

  // const toggleSystemTheme = () => {
  //   setTheme(isSystemTheme ? 'light' : 'dark');
  // };

  // To identify if it's safe to render theme on client
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <button
        className={`relative flex gap-1 p-1 pill bg-milder`}
        type="button"
        title="Toggle Theme"
        onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
      >
        <img
          className="h-7 w-7"
          src="/assets/icons/sun.png"
          alt="Light Mode"
          sizes="1.75rem"
        />
        <img
          className="h-7 w-7"
          src="/assets/icons/half-moon.png"
          alt="Dark Mode"
          sizes="1.75rem"
        />
        <div
          className={`absolute bg-base-dark ${
            isDarkMode ? 'translate-x-0' : 'translate-x-8'
          } text-accent transition-transform duration-500 ease-in-out rounded-full h-7 w-7`}
        />
      </button>
      {/* <button
        type="button"
        title="Toggle System Theme"
        onClick={toggleColorScheme}
      >
        <img
          className={`relative h-8 w-8 rounded-full ${
            !isSystemTheme && 'filter grayscale'
          }`}
          src="/assets/icons/sun-and-moon.png"
          alt="Toggle System Theme"
          sizes="2rem"
        />
      </button> */}
    </div>
  );
};

export default ThemeToggle;
