import React from 'react';
import useStyles from './EditorArea.styles';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/show-hint.css';


const EditorArea = ({ value, mode, onChange, name, size = 'medium' }) => {
    const classes = useStyles();

    const handleChange = (editor, data, value) => {
        console.log(editor);
        onChange(name, value);
    };

    return (
        <CodeMirror
            className={classes[size]}
            value={value}
            options={{
                mode,
                theme: 'material',
                lineNumbers: true,
                lineWrapping: true,
                autoCloseBrackets: true,
                autoCloseTags: true,
                showHint: true,
                extraKeys: {
                    'Ctrl-Space': 'autocomplete'
                }
            }}
            
            onBeforeChange={handleChange}
            onChange={(editor, data,value) => {}}
        />
    );
};

export default EditorArea;
