import React, { useState, useRef } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Autocomplete, Circle, Marker } from '@react-google-maps/api';
import Cropper from 'react-easy-crop';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';

import DoggoInput from './DoggoInput';
import DoggoBtn from './DoggoBtn/DoggoBtn';
import Map from './map/Map';
import { loadImage, getCroppedImg } from '../lib/image';

const useStyles = makeStyles((theme) => ({
    stepper: {
        marginTop: '15px',
        backgroundColor: 'white'
    },
    dotActive: {
        backgroundColor: '#E0802B'
    },
    card: {
        border: 'none',
        height: '320px'
    },
    greenBtn: {
        color: 'white',
        backgroundColor: green[600],
        '&:hover': {
            backgroundColor: green[800],
        }
    }
}));


const DogownerStepper = (props) => {
    const fileInput = useRef(null);

    const classes = useStyles();
    const theme = useTheme();

    const [autocomplete, setAutocomplete] = useState(null);

    const [isCropped, setIsCropped] = useState(false);
    const [cropDimensions, setCropDimensions] = useState({});
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAvatar, setCroppedAvatar] = useState("");

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 3;
    const marks = [
        { value: 0, label: '0' },
        { value: 1000, label: '1 км' },
        { value: 2000, label: '2 км' },
        { value: 3000, label: '3 км' },
        { value: 4000, label: '4 км' },
        { value: 5000, label: '5 км' }
    ];

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        description: '',
        position: { lat: 0, lng: 0 },
        radius: 100,
        avatar: null,
        croppedAvatar: null
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        if (activeStep === 0) {
            props.revertRole();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };
    const handleInputChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };
    const handleRadiusChange = (_, value) => {
        setUserData({ ...userData, radius: value });
    };
    const onAutocompleteLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    };
    const onPlacePicked = () => {
        if (autocomplete !== null) {
            const { geometry } = autocomplete.getPlace();

            if (geometry) {
                setUserData({
                    ...userData, position: {
                        lat: geometry.location.lat(),
                        lng: geometry.location.lng()
                    }
                });
            }
        }
    };
    const onCropChange = (crop) => {
        setCrop(crop);
    };
    const handleRotateRight = () => {
        setRotation(rotation + 90);
    }
    const handleDelete = () => {
        setUserData({ ...userData, avatar: null, croppedAvatar: null });
        setCroppedAvatar("");
        setRotation(0);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setIsCropped(false);
        fileInput.current.value = "";
    }
    const handleZoom = (val) => () => {
        if (!(zoom + val > 3) && !(zoom + val < 1)) {
            setZoom(zoom + val);
        }
    }
    const handleCrop = (_, croppedAreaInPixels) => {
        setCropDimensions(croppedAreaInPixels)
    }
    const handleLoad = async e => {
        const imageBASE = await loadImage(e);
        setUserData({ ...userData, avatar: imageBASE });
    };
    const wasCropped = async () => {
        const { blob, base64 } = await getCroppedImg(userData.avatar, cropDimensions, rotation);

        setIsCropped(true);
        setUserData({ ...userData, croppedAvatar: blob });
        setCroppedAvatar(base64);
    }

    return (
        <div className="DogwalkerStepper">
            <Card variant="outlined" classes={{ root: classes.card }}>
                <CardContent style={{ display: activeStep === 0 ? 'block' : 'none' }}>
                    <Grid container spacing={2} justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <DoggoInput onChange={handleInputChange} name="firstName" fullWidth variant="outlined" label="Ваше ім'я" type="text" />
                        </Grid>
                        <Grid item xs={12}>
                            <DoggoInput onChange={handleInputChange} name="lastName" fullWidth variant="outlined" label="Ваша фамілія" type="text" />
                        </Grid>
                        <Grid item xs={12}>
                            <DoggoInput onChange={handleInputChange} rows={5} name="description" fullWidth multiline variant="outlined" label="Декілька слів про себе" />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent style={{ display: activeStep === 1 ? 'block' : 'none' }}>
                    <Grid container spacing={2} justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <Map containerStyle={{ width: "100%", height: "200px" }} options={{ streetViewControl: false, mapTypeControl: false }} center={userData.position}>
                                <Autocomplete
                                    onLoad={onAutocompleteLoad}
                                    onPlaceChanged={onPlacePicked}
                                    restrictions={{ country: 'ua' }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Введіть вашу приблизну адресу"
                                        style={{
                                            boxSizing: `border-box`,
                                            border: `1px solid #E0802B`,
                                            width: `80%`,
                                            height: `32px`,
                                            padding: `0 12px`,
                                            borderRadius: `3px`,
                                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                            fontSize: `14px`,
                                            outline: `none`,
                                            textOverflow: `ellipses`,
                                            position: "absolute",
                                        }}
                                    />
                                </Autocomplete>
                                <Circle center={userData.position} radius={userData.radius} />
                                <Marker position={userData.position} />
                            </Map>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="discrete-slider" gutterBottom>
                                Радіус місцевості
                            </Typography>
                            <Slider
                                onChange={handleRadiusChange}
                                defaultValue={100}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                marks={marks}
                                step={100}
                                min={100}
                                max={5000}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent style={{ display: activeStep === 2 ? 'block' : 'none' }}>
                    <Grid container>
                        <Grid item container xs={12} alignItems="center" justify="center">
                            <Box>
                                <input type="file" onChange={handleLoad} accept="image/*" style={{ display: userData.avatar ? 'none' : 'block' }} ref={fileInput} />
                            </Box>
                            <Box display={userData.avatar ? 'flex' : 'none'} flexDirection="column" alignItems="center" justify="center">
                                <Box position="relative" width={250} height={250}>
                                    <Box display={!isCropped ? 'block' : 'none'}>
                                        <Cropper
                                            image={userData.avatar}
                                            crop={crop}
                                            aspect={1}
                                            onCropChange={onCropChange}
                                            cropShape='round'
                                            zoom={zoom}
                                            rotation={rotation}
                                            showGrid={false}
                                            restrictPosition={true}
                                            onCropComplete={handleCrop}
                                        />
                                    </Box>
                                    <Box display={isCropped ? 'block' : 'none'} textAlign="center">
                                        <img src={croppedAvatar} style={{ borderRadius: '50%', width: '250px', height: 'auto' }} />
                                    </Box>
                                </Box>
                                <Box textAlign="center" mt={2}>
                                    <Button variant="contained" color="secondary" onClick={handleDelete}><DeleteIcon /></Button>
                                    <Box display={!isCropped ? 'inline' : 'none'}>
                                        <Button color="primary" onClick={handleZoom(-0.5)}><ZoomOutIcon /></Button>
                                        <Button color="primary" onClick={handleZoom(0.5)}><ZoomInIcon /></Button>
                                        <Button color="primary" onClick={handleRotateRight}><RotateRightIcon /></Button>
                                        <Button color="primary" variant="contained" onClick={wasCropped} classes={{ root: classes.greenBtn }}><DoneIcon /></Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <MobileStepper
                classes={{ root: classes.stepper, dotActive: classes.dotActive }}
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                    <DoggoBtn size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Далі
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </DoggoBtn>
                }
                backButton={
                    <DoggoBtn size="small" onClick={handleBack}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Назад
                    </DoggoBtn>
                }
            />
        </div >
    );
};

export default DogownerStepper;
