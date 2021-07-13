import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    list: {
        listStyleType: 'none',
    },
    listItem: {
        display: 'inline-block',
        marginRight: theme.spacing(1)
    }
}));

export default useStyles;