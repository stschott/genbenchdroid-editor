import { ThemeProvider } from '@material-ui/styles';
import theme from './res/theme';
import ModuleBuilder from './components/ModuleBuilder/ModuleBuilder';
import { CssBaseline } from '@material-ui/core';
import TemplateContextProvider from './contexts/TemplateContext';
import ModuleContextProvider from './contexts/ModuleContext';
import FlowContextProvider from './contexts/FlowContext';

const App = () => {
    return (
        <div>
            <TemplateContextProvider>
                <ModuleContextProvider>
                    <FlowContextProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <ModuleBuilder />
                        </ThemeProvider>
                    </FlowContextProvider>
                </ModuleContextProvider>
            </TemplateContextProvider>
        </div>
    );
};

export default App;
