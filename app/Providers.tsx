import { LazyMotion, domMax } from 'framer-motion';
import { ThemeProvider } from 'remix-theme';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={domMax} strict>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  </LazyMotion>
);

export default Providers;
