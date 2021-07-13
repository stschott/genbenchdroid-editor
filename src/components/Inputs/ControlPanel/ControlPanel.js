import React from 'react';
import useStyles from './ControlPanel.styles';
import { Button } from '@material-ui/core';

const ControlPanel = ({ handleGenerateClick, handleClearClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleClearClick}
            >
                Clear
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleGenerateClick}
            >
                Generate
            </Button>
        </div>
    );
};

export default ControlPanel;
