import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import DoggoInput from './DoggoInput';
import DoggoBtn from './DoggoBtn/DoggoBtn';
import Map from './Map';

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
    const [activeStep, setActiveStep] = useState(0);
    const [userData, setUserData] = useState({ firstName: '', lastName: '', description: '' });
    const maxSteps = 3;

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
                            <DoggoInput rows={5} name="description" fullWidth multiline variant="outlined" label="Декілька слів про себе" />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent style={{ display: activeStep === 1 ? 'block' : 'none' }}>
                    <Grid container spacing={2} justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <Map containerStyle={{ width: "100%", height: "250px" }}></Map>
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
        </div>
    );
};

export default DogownerStepper;