import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const FiltroCateg = () => {
  return (
    <FormControl sx={{fontSize:'8px'}}>
      <FormLabel  sx={{backgroundColor:'#c5c2c2', fontSize:'12px'}} id="demo-form-control-label-placement">Categoría</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="top"
      >
        <FormControlLabel sx={{fontSize:'8px'}}
            value="Todas"
             control={<Radio sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 18,
                  color: '#f305b6',
                },
              }}/>} 
             label="Todas" 
             labelPlacement="top"
        />
        <FormControlLabel
          value="Frutos secos"
          control={<Radio   sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: '#f305b6',
            },
          }} />}
          label="Frutos secos"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Deshidratados"
          control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: '#f305b6', //color del radioButton
            },
          }}/>}
          label="Deshidratados"
          labelPlacement="top"
        />
        {/* <FormControlLabel
          value="Genderless"
          control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: '#f305b6',
            },
          }}/>}
          label="Genderless"
          labelPlacement="top"
        />
        <FormControlLabel 
            value="Unknow"
             control={<Radio sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 18,
                  color: '#f305b6',
                },
              }}/>} 
             label="Unknow" 
             labelPlacement="top"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}
