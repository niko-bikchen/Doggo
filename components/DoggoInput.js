import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const DoggoInput = withStyles({
        root: {
            '& label.Mui-focused': {
                color: '#E0802B',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#E0802B',
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: '#E0802B',
                },
            },
        },
    })(TextField);

export default DoggoInput;
