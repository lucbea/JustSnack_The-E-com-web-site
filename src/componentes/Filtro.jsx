import { AppBar, Box } from "@mui/material";
import FiltroNombre from "./FiltroNombre";
import FiltroGender from "./FiltroGender";


export const Filtro = ({pag, setPag, URL, setURL, URLBase, pagTotal}) => {
    return( 
        <Box sx={{height:'30px', display:'flex', justifyContent:'space-evenly'}}>
            <FiltroNombre sx={{height:'10px', width: '50px'}}  pag={pag} setPag={setPag} URL={URL} setURL={setURL} URLBase={URLBase} pagTotal={pagTotal}/>
            <FiltroGender sx={{height:'10px', width: '50px'}}/>
            </Box>
    )
   
}