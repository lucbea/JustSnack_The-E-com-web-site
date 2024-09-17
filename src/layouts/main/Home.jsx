import Grilla from './Grid';
import { Box } from '@mui/material';
import { SlideInfinit } from '../../componentes/SlideInfinitInicio';
import '@splidejs/react-splide/css';


export const Home = ({ products }) => {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          marginBottom: '30px',
          height: 'auto',
        }}>
        <SlideInfinit />
      </Box>
      <Box>
        <Grilla products={products} />
      </Box>
    </Box>
  );
}
