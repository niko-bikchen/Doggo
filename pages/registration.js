import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import DogownerStepper from '../components/DogownerStepper';
import DoggoRadio from '../components/DoggoRadio';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import Footer from '../components/Footer/Footer';
import styles from './styles/registration.module.css';

const Registration = () => {
    const [userRole, setUserRole] = useState('dogowner');
    const [showStepper, setShowStepper] = useState(false);

    const handleRoleChange = (event) => {
        setUserRole(event.target.value);
    };
    const initStepper = (isVisible) => () => {
        setShowStepper(isVisible);
    }

    return (
        <div>
            <div className={styles["Registration"]}>
                <Card className={styles["Registration-container"]}>
                    <Box textAlign="center" style={{ display: showStepper ? 'none' : 'block' }}>
                        <Typography variant="h5">
                            Ваша роль?
                        </Typography>
                    </Box>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} style={{ display: showStepper ? 'none' : 'block' }}>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="Роль" name="userRole" value={userRole} onChange={handleRoleChange}>
                                        <FormControlLabel value="dogowner" control={<DoggoRadio />} label="Власник собаки" />
                                        <FormControlLabel value="dogwalker" control={<DoggoRadio />} label="Догвокер" />
                                    </RadioGroup>
                                </FormControl>
                                <Box textAlign="center" mt={2}>
                                    <DoggoBtn onClick={initStepper(true)}>
                                        Далі
                                        <KeyboardArrowRight />
                                    </DoggoBtn>
                                </Box>
                            </Grid>
                            <Grid item xs={12} style={{ display: showStepper ? 'block' : 'none' }}>
                                {userRole === 'dogowner' ? <DogownerStepper revertRole={initStepper(false)} /> : null}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    )
};

export default Registration;
