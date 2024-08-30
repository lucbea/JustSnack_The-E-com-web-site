import React, { useContext, useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import { TransitionEfect } from './TransitionEfect';
import { ThemeCustom } from '../context/ThemeCustom';
import { BsCart } from "react-icons/bs";
import { OrdenShopContext } from '../context/OrdenShop';

const theme = ThemeCustom()
const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: 2,
    top: 3,
    border: `2px solid ${theme.palette.primary.negro}`,
    padding: '1px',
    height: '20px',
    fontSize: '11px',
    fontWeigth: '700',
    backgroundColor: `${theme.palette.primary.grisMuyOsc}`,
    color: `${theme.palette.primary.main}`,
  },
}));

export default function BadgeShop() {
  const [badgeCount, setBadgeCount] = useState(0);
  const { ordenCarro, cantItems, setCantItems, agregarCarro, quitarCarro, setTotalCarro } = useContext(OrdenShopContext)
 
  useEffect(() => {
    let totalAuxCarro =0;
    const cantItemsAux = ordenCarro.reduce((acum, o) => acum + o.cantidadPedida, 0);
    setCantItems(cantItemsAux)
    console.log("UseEffect - cantItems:", cantItems, ordenCarro.length, ordenCarro, "cantItemsAux:", cantItemsAux)
    // console.log("badge - cantItemsAux", cantItemsAux)
    setBadgeCount(cantItems);
    totalAuxCarro = ordenCarro.reduce((acum, o) => acum + (o.totalItem || 0), 0);
    console.log("estoy en BadgeShop - totalAux:", totalAuxCarro)
    setTotalCarro(totalAuxCarro);
    // const cantItemsAux = ordenCarro.reduce((acum, o) => acum + o.cantidadPedida, 0);
    // setCantItems(cantItemsAux)
  }, [cantItems, ordenCarro ]);

  return (

      <StyledBadge badgeContent={badgeCount} sx={{paddingInline:'4px',}}>
        <TransitionEfect
          sx={{
            width: 'auto',
            height: 'auto',
            backgroundColor: theme.palette.primary.transparent,
            color: theme.palette.primary.grisOsc,
            transition: 'transform 0.3s',
            borderRadius: '0%',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: theme.palette.primary.hoverBtn
            }
          }}>
          < BsCart style={{
            fontSize: '25px',
            color: theme.palette.primary.grisMuyOsc,
            backgroundColor: theme.palette.primary.transparent,
          }} />
        </TransitionEfect>
      </StyledBadge>

  );
}