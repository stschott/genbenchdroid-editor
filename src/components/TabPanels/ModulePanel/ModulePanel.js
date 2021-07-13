import React, { useContext, useRef } from 'react';
import { Button, Card, CardContent, Typography, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { ModuleContext } from '../../../contexts/ModuleContext';
import { FlowContext } from '../../../contexts/FlowContext';
import ControlPanel from '../../Inputs/ControlPanel/ControlPanel';
import TextArea from '../../Inputs/TextArea/TextArea';
import FlowList from '../../FlowList/FlowList';
import useStyles from './ModulePanel.styles';
import { loadFile, openFileDownload } from '../../../helpers/FileHelpers';
import { joinStringProps, splitStringProps, upperCaseFirstLetter } from '../../../helpers/StringHelper';
import FileLoader from '../../FileLoader/FileLoader';
import EditorArea from '../../Inputs/EditorArea/EditorArea';

const ModulePanel = () => {
    const editorFields = [
        { name: 'imports', mode: 'text/x-java', size: 'small' },
        { name: 'globals', mode: 'text/x-java', size: 'small' },
        { name: 'module', mode: 'text/x-java', size: 'medium' },
        { name: 'methods', mode: 'text/x-java', size: 'medium' },
        { name: 'classes', mode: 'text/x-java', size: 'medium' },
        { name: 'permissions', mode: 'xml', size: 'small' },
        { name: 'components', mode: 'xml', size: 'small' },
        { name: 'views', mode: 'xml', size: 'small' },
    ];
    const classes = useStyles();
    const { module, setModule, resetModule } = useContext(ModuleContext);
    const { flow, setFlow, resetFlow } = useContext(FlowContext);
    const fileUploadRef = useRef(null);


    const handleModuleChange = event => {
        event.persist();
        setModule(prevValue => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }));
    };

    const handleModuleChangeCodemirror = (name, value) => {
        setModule(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleFlowChange = event => {
        event.persist();
        setFlow(prevValue => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }));
    };

    const handleCheckboxChange = event => {
        event.persist();
        setFlow(prevValue => ({
            ...prevValue,
            [event.target.name]: event.target.checked
        }));
    };

    const addFlow = () => {
        setModule(prevValue => ({
            ...prevValue,
            flows: [...prevValue.flows, flow]
        }));

        resetFlow();
    };

    const handleLoadClick = () => {
        fileUploadRef.current.click();
    };

    const loadModule = async event => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];
        const moduleData = await loadFile(file.path);

        moduleData.name = file.name.replace(/\.[^/.]+$/, '');
        const joinedModule = joinStringProps(moduleData, 
            ['imports', 'globals', 'module', 'methods', 'classes', 'permissions', 'components', 'views']
        );
        setModule(joinedModule);
    };

    const generateModule = () => {
        const splitModule = splitStringProps(module, 
            ['imports', 'globals', 'module', 'methods', 'classes', 'permissions', 'components', 'views']
        );
        delete splitModule.name;
        const fileContentString = JSON.stringify(splitModule, null, 4);
        openFileDownload(module.name, fileContentString);
    };

    const clearValues = () => {
        resetModule();
        resetFlow();
    };


    // Flow functions 

    const deleteFlow = index => {
        setModule(prevValue => ({
            ...prevValue,
            flows: prevValue.flows.filter((flow, flowIdx) => flowIdx !== index)
        }));
    };

    const reorderFlow = (startIndex, endIndex) => {
        const flows = [...module.flows];
        const [removed] = flows.splice(startIndex, 1);
        flows.splice(endIndex, 0, removed);

        setModule(prevValue => ({
            ...prevValue,
            flows
        }));
    };

    return (
        <div className={classes.root}>
            {/* Module name, type and load button */}
            <Card className={classes.card}>
                <CardContent>
                    <div className={classes.upperContainer}>
                        <Select
                            className={classes.select}
                            value={module.type.toLowerCase()}
                            onChange={handleModuleChange}
                            name="type"
                            variant="outlined"
                            margin="dense"
                            autoWidth
                        >
                            <MenuItem value="source">Source</MenuItem>
                            <MenuItem value="bridge">Bridge</MenuItem>
                            <MenuItem value="sink">Sink</MenuItem>
                        </Select>
                        <TextArea
                            value={module.name}
                            onChange={handleModuleChange}
                            name="name"
                            label="Module Name"
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
            {/* Imports, Globals, Module, Methods, Classes, Permissions, Components, Views */}
            {editorFields.map(({ name, mode, size }) => (
                <Card className={classes.card} key={name}>
                    <CardContent>
                        <Typography>{upperCaseFirstLetter(name)}</Typography>
                        <EditorArea
                            value={module[name]}
                            onChange={handleModuleChangeCodemirror}
                            name={name}
                            mode={mode}
                            size={size}
                        />
                    </CardContent>
                </Card>
            ))}
            {/* Flow */}
            <Card className={classes.card}>
                <FlowList
                    flows={module.flows}
                    deleteFlow={deleteFlow}
                    reorderFlow={reorderFlow}
                />
                <CardContent>
                    <Typography variant="body2">Flow</Typography>
                    <TextArea
                        value={flow.className}
                        onChange={handleFlowChange}
                        name="className"
                        label="Class Name"
                        rows={1}
                    />
                    <TextArea
                        value={flow.methodSignature}
                        onChange={handleFlowChange}
                        name="methodSignature"
                        label="Method Signature"
                        rows={1}
                    />
                    <TextArea
                        value={flow.statementSignature}
                        onChange={handleFlowChange}
                        name="statementSignature"
                        label="Statement Signature"
                        rows={1}
                    />
                    <div>
                        <FormControlLabel
                            control={<Checkbox
                                checked={flow.leaking}
                                onChange={handleCheckboxChange}
                                name="leaking"
                                color="primary"
                            />}
                            label="Leaking"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={flow.reachable}
                                onChange={handleCheckboxChange}
                                name="reachable"
                                color="primary"
                            />}
                            label="Reachable"
                        />
                        <Button
                            className={classes.addButton}
                            variant="contained"
                            color="primary"
                            onClick={addFlow}
                        >
                            Add Flow
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <ControlPanel
                handleGenerateClick={generateModule}
                handleClearClick={clearValues}
            />
            {/* Hidden element for file upload */}
            <FileLoader
                ref={fileUploadRef}
                cb={loadModule}
            />
        </div>
    );
};

export default ModulePanel;
