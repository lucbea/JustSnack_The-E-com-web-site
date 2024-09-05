
import { useContext } from 'react';
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
  const { cantItems } = useContext(OrdenShopContext)

  return (
    <StyledBadge badgeContent={cantItems}
      sx={{
        paddingInline: '4px'
      }}>
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
        < BsCart
          style={{
            fontSize: '25px',
            color: theme.palette.primary.grisMuyOsc,
            backgroundColor: theme.palette.primary.transparent,
          }} />
      </TransitionEfect>
    </StyledBadge>
  );
}