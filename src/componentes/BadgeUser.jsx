
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { TransitionEfect } from './TransitionEfect';
import { ThemeCustom } from '../context/ThemeCustom';
import { BiUserX  } from "react-icons/bi";


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
    return (
        <StyledBadge badgeContent={0}>
          <TransitionEfect
            sx={{
              width: 'auto',
              height: 'auto',
              backgroundColor: theme.palette.primary.transparent,
              color: theme.palette.primary.grisOsc,
              fontWeight:'400',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: theme.palette.primary.hoverBtn,
              }
            }}>
          <BiUserX style={{ fontSize:'28px', color:theme.palette.primary.grisMuyOsc, backgroundColor: theme.palette.primary.transparent }}/>
        </TransitionEfect>
          </StyledBadge >
    )
}