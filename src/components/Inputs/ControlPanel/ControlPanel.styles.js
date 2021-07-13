import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        whiteSpace: 'nowrap'
    }
}));

export default useStyles;