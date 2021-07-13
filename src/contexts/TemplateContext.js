import React, { createContext, useState } from 'react';

export const TemplateContext = createContext();

const emptyTemplate = {
    name: '',
    template: '',
    manifest: '',
    layout: '',
    className: '',
    methodSignature: ''
};

const TemplateContextProvider = ({ children }) => {
    const [template, setTemplate] = useState(emptyTemplate);

    const resetTemplate = () => {
        setTemplate(emptyTemplate);
    };

    return (
        <TemplateContext.Provider value={{
            template,
            setTemplate,
            resetTemplate
        }}>
            {children}
        </TemplateContext.Provider>
    );
};

export default TemplateContextProvider;