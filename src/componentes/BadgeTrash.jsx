
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ThemeCustom } from '../context/ThemeCustom';
import { BsTrash3 } from "react-icons/bs";
import { TransitionEfect } from './TransitionEfect';

const theme = ThemeCustom()
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function BadgeTrash
  () {
  return (
    <StyledBadge badgeContent={0}>
      <TransitionEfect
        sx={{
          width: 'auto',
          height: 'auto',
          padding: '10px', 
          backgroundColor: theme.palette.primary.transparent,
          color: theme.palette.primary.grisOsc,
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: theme.palette.primary.hoverBtn
          }
        }}>
      <BsTrash3 style={{ fontSize:'24px', color:theme.palette.primary.grisMuyOsc, backgroundColor: theme.palette.primary.transparent }}/>
    </TransitionEfect>
      </StyledBadge >
  );
}