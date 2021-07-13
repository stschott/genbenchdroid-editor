import React, { useRef, useContext } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { TemplateContext } from '../../../contexts/TemplateContext';
import TextArea from '../../Inputs/TextArea/TextArea';
import useStyles from './TemplatePanel.styles';
import ControlPanel from '../../Inputs/ControlPanel/ControlPanel';
import EditorArea from '../../Inputs/EditorArea/EditorArea';
import { loadFile, openFileDownload } from '../../../helpers/FileHelpers';
import { joinStringProps, splitStringProps } from '../../../helpers/StringHelper';
import FileLoader from '../../FileLoader/FileLoader';


const TemplatePanel = () => {
    const editorFields = [
        { name: 'template', label: 'Source Code Template', mode: 'text/x-java' },
        { name: 'manifest', label: 'Android Manifest Template', mode: 'xml' },
        { name: 'layout', label: 'Layout Template', mode: 'xml' }
    ];
    const classes = useStyles();
    const { template, setTemplate, resetTemplate } = useContext(TemplateContext);
    const fileUploadRef = useRef(null);

    const handleTemplateChange = event => {
        event.persist();
        setTemplate(prevValue => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }));
    };

    const handleTemplateChangeCodemirror = (name, value) => {
        setTemplate(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleLoadClick = () => {
        fileUploadRef.current.click();
    };

    const loadTemplate = async event => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];
        const templateData = await loadFile(file.path);
        
        templateData.name = file.name.replace(/\.[^/.]+$/, ''); 
        const joinedTemplate = joinStringProps(templateData, ['template', 'layout', 'manifest']);
        setTemplate(joinedTemplate);
    };

    const generateTemplate = () => {
        const splitTemplate = splitStringProps(template, ['template', 'layout', 'manifest']);
        delete splitTemplate.name;
        const fileContentString = JSON.stringify(splitTemplate, null, 4);
        openFileDownload(template.name, fileContentString);
    };

    return (
        <div className={classes.root}>
            {/* Template name and load button */}
            <Card className={classes.card}>
                <CardContent>
                    <div className={classes.upperContainer}>
                        <TextArea
                            value={template.name}
                            onChange={handleTemplateChange}
                            name="name"
                            label="Template Name"
                            rows={1}
                        />
                        <Button
                            className={classes.loadButton}
                            variant="contained"
                            color="primary"
                            onClick={handleLoadClick}
                        >
                            Load
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {/* Source, Manifest and Layout template */}
            {editorFields.map(({ name, label, mode }) => (
                <Card className={classes.card} key={name}>
                    <CardContent>
                        <Typography>{label}</Typography>
                        <EditorArea
                            value={template[name]}
                            onChange={handleTemplateChangeCodemirror}
                            name={name}
                            mode={mode}
                            size='large'
                        />
                    </CardContent>
                </Card>
            ))}
            {/* Flow */}
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2">Flow</Typography>
                    <TextArea
                        value={template.className}
                        onChange={handleTemplateChange}
                        name="className"
                        label="Class Name"
                        rows={1}
                    />
                    <TextArea
                        value={template.methodSignature}
                        onChange={handleTemplateChange}
                        name="methodSignature"
                        label="Method Signature"
                        rows={1}
                    />
                </CardContent>
            </Card>
            <ControlPanel
                handleGenerateClick={generateTemplate}
                handleClearClick={resetTemplate}
            />
            {/* Hidden element for file upload */}
            <FileLoader
                ref={fileUploadRef}
                cb={loadTemplate}
            />
        </div>
    );
};

export default TemplatePanel;
