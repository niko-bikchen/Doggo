import React, { useState } from 'react';
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

import DoggoInput from './DoggoInput';
import DoggoBtn from './DoggoBtn/DoggoBtn';
import Map from './map/Map';

const useStyles = makeStyles(() => ({
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
    }
}));


const DogownerStepper = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [autocomplete, setAutocomplete] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        description: '',
        position: { lat: 0, lng: 0 },
        radius: 100
    });
    const maxSteps = 3;
    const marks = [
        { value: 0, label: '0' },
        { value: 1000, label: '1 км' },
        { value: 2000, label: '2 км' },
        { value: 3000, label: '3 км' },
        { value: 4000, label: '4 км' },
        { value: 5000, label: '5 км' }
    ]

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
