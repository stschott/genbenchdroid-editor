import React from 'react';
import useStyles from './TabPanel.styles';

const TabPanel = ({ children, value, index, ...other }) => {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
            role="tabpanel"
            hidden={value !== index}
            {...other}    
        >
            {value === index && (
                children
            )}
        </div>
    );
};

export default TabPanel;
