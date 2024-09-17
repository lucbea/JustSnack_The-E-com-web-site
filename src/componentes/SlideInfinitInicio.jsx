import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Box } from '@mui/material';
import { ThemeCustom } from '../context/ThemeCustom';
import imUno from '../assets/imagen1.png';
import imDos from '../assets/imagen2.png';
import imTres from '../assets/imagen3.png';
import imCuatro from '../assets/imagen4.png';
import imCinco from '../assets/imagen5.png';
import imSeis from '../assets/imagen6.png';
import imSiete from '../assets/imagen7.png';
import imOcho from '../assets/imagen8.png';
import imNueve from '../assets/imagen9.png';
import imDiez from '../assets/imagen10.png';

export const SlideInfinit = () => {
    const theme = ThemeCustom();
    return (
        <Box>
            <Box
                sx={{
                    heigth: '90px',
                    backgroundColor: theme.palette.primary.blanco
                }}>
            </Box>
            <Box
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    marginTop: '0px'
                }}>
                <Splide
                    options={{
                        rewind: true,
                        type: 'loop', 
                        perPage: 1, 
                        gap: '1rem',
                        width: '100%',
                        pagination: true, 
                        arrows: true, 
                        autoplay: true, 
                        interval: 3000, 
                        pauseOnHover: true,
                    }}
                    aria-label="Image Carousel"
                >
                    <SplideSlide>
                        <img src={imUno} alt="Image 1"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={imDos} alt="Image 2"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={imTres} alt="Image 3"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={imCuatro} alt="Image 4"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                </Splide>
            </Box>
            <Box
                sx={{
                    display: { xs: 'flex', sm: 'none' }
                }}>
                <Splide
                    options={{
                        rewind: true,
                        type: 'loop',
                        perPage: 1,
                        gap: '1rem',
                        width: '100%',
                        pagination: true,
                        arrows: true,
                        autoplay: true,
                        interval: 3000,
                        pauseOnHover: true,
                    }}
                    aria-label="Image Carousel"
                >
                    <SplideSlide>
                        <img src={imCinco} alt="Image 1"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={imSeis} alt="Image 2"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={imSiete} alt="Image 3"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={imOcho} alt="Image 4"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={imNueve} alt="Image 3"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={imDiez} alt="Image 3"
                            style={{
                                width: '100%',
                                objectFit: 'cover'
                            }} />
                    </SplideSlide>
                </Splide>
            </Box>
        </Box>
    );
};
