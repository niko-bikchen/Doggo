import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
    },
}));
const PageCard = ({ children }) => {
    const classes = useStyles();
    return (
        <Grid style={{ padding: '20px' }} container>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {children}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default PageCard;
