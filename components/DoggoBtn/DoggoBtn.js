import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const DoggoBtn = (props) => {
    const DBtn = withStyles({
        root: {
            backgroundColor: '#E0802B',
            borderRadius: 15
        },
        label: {
            textTransform: 'capitalize'
        }
    })(Button);

    return <DBtn {...props}></DBtn>
}

export default DoggoBtn;
