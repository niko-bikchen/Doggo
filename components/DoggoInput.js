import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const DoggoInput = (props) => {
    const DInput = withStyles({
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

    return <DInput {...props}></DInput>
}

export default DoggoInput;