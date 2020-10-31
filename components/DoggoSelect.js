import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

const DoggoSelect = withStyles({
    root: {
        '& .MuiInput-underline:after': {
            borderBottomColor: '#E0802B',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#E0802B',
            },
        },
    },
})(Select);

export default DoggoSelect;
