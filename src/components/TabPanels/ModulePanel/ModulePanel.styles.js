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
    lowerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    card: {
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5)
    },
    select: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    loadButton: {
        whiteSpace: 'nowrap',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    addButton: {
        marginTop: theme.spacing(1),
        float: 'right'
    }
}));

export default useStyles;