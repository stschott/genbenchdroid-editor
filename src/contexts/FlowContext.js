import React, { createContext, useState } from 'react';

export const FlowContext = createContext();

const emptyFlow = {
    className: '',
    methodSignature: '',
    statementSignature: '',
    leaking: true,
    reachable: true
}

const FlowContextProvider = ({ children }) => {
    const [flow, setFlow] = useState(emptyFlow);

    const resetFlow = () => {
        setFlow(emptyFlow);
    };

    return (
        <FlowContext.Provider value={{
            flow,
            setFlow,
            resetFlow
        }}>
            {children}
        </FlowContext.Provider>
    );
};

export default FlowContextProvider;