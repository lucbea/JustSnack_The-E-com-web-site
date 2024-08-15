
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';





export default function FiltroNombre({ pag, setPag, URL, setURL, URLBase, pagTotal }) {

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        // color: '#F2F2F2',
        width: '100%',
        height:'10px',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
                '&:focus': {
                    width: '200px',
                },
            },
        },
    }));

    const handleWord = (e) => {
        let URLAux = `${URLBase}?name=${e.target.value}`;
        console.log("handleWord", URLAux);
        console.log("handleWord", e.target.value);
        setURL(URLAux)
    }
    return (
        <>
          
                
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch', bg:'pink' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="filled-basic" label="Búsqueda por nombre" variant="filled"  onChange={handleWord} sx={{ width:'100px', fontSize:'8px'}}/>
                </Box>
            
        </>
    );
}
