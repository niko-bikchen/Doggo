import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import DoggoInput from '../components/DoggoInput';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';

const useStyles = makeStyles(() => ({
    root: {
        marginTop: '15px',
        backgroundColor: 'white'
    },
    dotActive: {
        backgroundColor: '#E0802B'
    }
}));


const DogownerStepper = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 5;

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

    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <form autoComplete="off">
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={12}>
                                <DoggoInput name="name" fullWidth variant="outlined" label="Ваше Ім'я" type="text" />
                            </Grid>
                            <Grid item xs={12}>
                                <DoggoInput name="surname" fullWidth variant="outlined" label="Ваша Фамілія" type="text" />
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <MobileStepper
                classes={{ root: classes.root, dotActive: classes.dotActive }}
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