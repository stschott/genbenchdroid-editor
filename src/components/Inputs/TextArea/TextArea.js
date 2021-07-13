import React from 'react';
import { TextField } from '@material-ui/core';
import useStyles from './TextArea.styles';

const TextArea = ({ value, onChange, label, name, rows = 8, tabs = false, ...other }) => {
    const classes = useStyles();

    const handleKeyDown = event => {
        // prevent tab focus switch
        if (tabs && event.keyCode === 9 && !event.shiftKey) {
            document.execCommand('insertText', false, "\t");
            event.preventDefault();
        }
    };

    return (
            <TextField  
                className={classes.textarea}
                label={label}
                name={name}
                value={value} 
                variant="outlined"
                onChange={onChange}
                multiline={rows > 1}
                rows={rows}
                onKeyDown={handleKeyDown}
                margin="dense"
                inputProps={{
                    autoComplete: 'off',
                    spellCheck: 'false'
                 }}
                {...other}
            />
    );
};

export default TextArea;
