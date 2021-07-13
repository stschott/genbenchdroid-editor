import React, { createContext, useState } from 'react';

export const ModuleContext = createContext();

const emptyModule = {
    name: '',
    type: 'source',
    imports: '',
    globals: '',
    module: '',
    methods: '',
    classes: '',
    permissions: '',
    components: '',
    views: '',
    flows: []
};

const ModuleContextProvider = ({ children }) => {
    const [module, setModule] = useState(emptyModule);

    const resetModule = () => {
        setModule(prevValue => ({
            ...emptyModule,
            type: prevValue.type
        }));
    };

    return (
        <ModuleContext.Provider value={{
            module,
            setModule,
            resetModule
        }}>
            {children}
        </ModuleContext.Provider>
    );
};

export default ModuleContextProvider;