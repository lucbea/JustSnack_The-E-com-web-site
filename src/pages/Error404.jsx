import { useEffect } from 'react';
import { Box } from '@mui/material';
import Emoji404 from '../assets/emoji404.png';

export const Error404 = () => {
    useEffect(() => {
        localStorage.setItem('404', JSON.stringify(true));
        console.log("404");
    }, []);
    return (
        <Box sx={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }}>
            <h2>Uuups!</h2>
            <h2>404 - NOT FOUND</h2>
            
            <Box sx={{height:'200px', }}>
                <img src={Emoji404} alt="404 Emoji" style={{ maxWidth: '100%', height: 'inherit' }} />
            </Box>
        </Box>
    );
}
