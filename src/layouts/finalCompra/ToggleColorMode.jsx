import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import { PiMoonStarsThin } from "react-icons/pi";
import { PiSunThin } from "react-icons/pi";

function ToggleColorMode({ mode, toggleColorMode }) {
  return (
    <IconButton
      onClick={toggleColorMode}
      color="primary"
      aria-label="Theme toggle button"
    >
      {mode === 'dark' ? (
        <PiSunThin fontSize="small" />
      ) : (
        <PiMoonStarsThin fontSize="small" />
      )}
    </IconButton>
  );
}

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;