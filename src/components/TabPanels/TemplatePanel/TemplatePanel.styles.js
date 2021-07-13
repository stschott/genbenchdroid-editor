import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        alignItems: 'space-between',
        margin: theme.spacing(1)
    },
    upperContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    card: {
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5)
    },
    loadButton: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        whiteSpace: 'nowrap'
    },
    generateButton: {
        marginTop: theme.spacing(1),
        float: 'right'
        
    }
}));

export default useStyles;