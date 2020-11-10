import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Map from "./Map.js"
import {Circle, Marker} from "@react-google-maps/api";

import Dialog from "@material-ui/core/Dialog";


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


const LocationLink = ({text="Location", center, radius}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <Button color={"primary"} onClick={handleClick}>
                {text}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                    <Map zoom={16} containerStyle={{width: "500px", height:"500px",borderRadius:"4px"}} center={center}>
                        <Circle
                            options={
                                {
                                    strokeColor:"#3573FF",
                                    strokeOpacity: 0.8,
                                    strokeWeight: 10,
                                    fillColor:"#3573FF"}
                            }
                            center={center}
                            radius={radius}/>
                    </Map>
            </Dialog>
        </div>
    );
}
export default LocationLink
