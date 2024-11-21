
import { useContext, useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { TransitionEfect } from './TransitionEfect';
import { ThemeCustom } from '../context/ThemeCustom';
import { OrdenShopContext } from '../context/OrdenShop';
import { PiUserCircleLight } from "react-icons/pi";
import { PiUserCircleCheckLight } from "react-icons/pi";


const theme = ThemeCustom()
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export const BadgeUser = () => {
  
  const { isLoggedIn, setIsLoggedIn } = useContext(OrdenShopContext);
  const [ badgeIn, setBadgeIn] = useState (false);

  useEffect(() => {
    // Obtener el valor de 'isLoggedIn' desde el localStorage
    const isLoggedInLS = JSON.parse(localStorage.getItem('isLoggedIn'));
  
    // Si 'isLoggedInLS' es un valor válido (booleano), actualizar el estado de 'badgeIn'
    if (isLoggedInLS !== null) {
      setBadgeIn(isLoggedInLS === true); // Asegúrate de que sea un valor booleano
    }
  }, [isLoggedIn]); // Dependencia: el useEffect se ejecutará cuando 'isLoggedIn' cambie
  
  
  return (
    <StyledBadge badgeContent={0}>
      <TransitionEfect
        sx={{
          width: 'auto',
          height: 'auto',
          backgroundColor: theme.palette.primary.transparent,
          color: theme.palette.primary.grisOsc,
          fontWeight: '400',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: theme.palette.primary.hoverBtn,
          }
        }}>
        {badgeIn ?
          <PiUserCircleCheckLight
            style={{
              fontSize: '32px',
              color: theme.palette.primary.grisMuyOsc,
              backgroundColor: theme.palette.primary.transparent
            }} />
          : <PiUserCircleLight
            style={{
              fontSize: '32px',
              color: theme.palette.primary.grisMuyOsc,
              backgroundColor: theme.palette.primary.transparent
            }} />
        }
      </TransitionEfect>
    </StyledBadge >
  )
}





