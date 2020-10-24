import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const DoggoBtn = (props, ref) => {
    const DBtn = withStyles({
        root: {
            backgroundColor: '#E0802B',
            borderRadius: 5,
            color: 'white',
            padding: '10px',
            '&:hover': {
                backgroundColor: '#af6523'
            }
        },
        label: {
            textTransform: 'uppercase'
        }
    })(Button);

    return <DBtn {...props}></DBtn>
}

export default React.forwardRef(DoggoBtn);
