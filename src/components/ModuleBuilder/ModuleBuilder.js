import React, { useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import TabPanel from '../TabPanels/TabPanel';
import TemplatePanel from '../TabPanels/TemplatePanel/TemplatePanel';
import ModulePanel from '../TabPanels/ModulePanel/ModulePanel';


const ModuleBuilder = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Template" id={0}/>
                    <Tab label="Module" id={1}/>
                </Tabs>
                
            </AppBar>
            <TabPanel value={selectedTab} index={0}>
                {/* Template Tab */}
                <TemplatePanel/>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                {/* Module Tab */}
                <ModulePanel/>
            </TabPanel>
        </div>
    );
};

export default ModuleBuilder;
