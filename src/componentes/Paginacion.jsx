import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginacion ({pag, setPag, URL, setURL, URLBase, pagTotal}) {
  let URLAux = URLBase;

  const handleChange = (e, value) => {
      setPag(value);
      let URLAux = `${URLBase}?page=${value}`;
      setURL(URLAux)
      };

  return (
    <Stack spacing={2} sx={{padding:'10px', dispay:'flex',  alignItems:'center', outline: '0px auto -webkit-focus-ring-color'}}>
      <p style={{fontSize:'8px'}}>Paginacion {URLAux} *** {URL}</p>
      <Pagination  onChange={handleChange} 
      sx={{
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root:focus-visible': {
            outline: '4px auto -webkit-focus-ring-color',
          },
        }} 
      count={pagTotal}  
      defaultPage={1} 
      siblingCount={0} 
      boundaryCount={0}  
      showFirstButton 
      showLastButton 
      variant="outlined" 
      color="primary"  
      />
   
    </Stack>
  );
}

