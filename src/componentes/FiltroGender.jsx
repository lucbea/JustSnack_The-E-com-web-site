import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FiltroGender() {
  return (
    <FormControl sx={{fontSize:'8px'}}>
      <FormLabel  sx={{backgroundColor:'#c5c2c2', fontSize:'12px'}} id="demo-form-control-label-placement">Filtro por Género</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="top"
      >
        <FormControlLabel sx={{fontSize:'8px'}}
            value="Todos"
             control={<Radio sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 18,
                  color: '#f305b6',
                },
              }}/>} 
             label="Todos" 
             labelPlacement="top"
        />
        <FormControlLabel
          value="Male"
          control={<Radio   sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: '#f305b6',
            },
          }} />}
          label="Male"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Female"
          control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: '#f305b6', //color del radioButton
            },
          }}/>}
          label="Female"
          labelPlacement="top"
        />
        <FormControlLabel
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
        />
      </RadioGroup>
    </FormControl>
  );
}
