import type { PropsWithChildren } from 'react';
 
import { Box } from '@mui/material';
 
// import { Header, Footer } from './components';
 
type ContentType = PropsWithChildren & { header?: boolean; footer?: boolean; };
 
export default function Content({ children }: ContentType) {
  return (
    <Box component="main">
      {/* {header && <Header />} */}
      {children}
      {/* {footer && <Footer />} */}
    </Box>
  );
}
