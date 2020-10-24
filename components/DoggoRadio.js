import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const DoggoRadio = (props) => {
    const DRadio = withStyles({
        root: {
            color: '#E0802B',
            '&$checked': {
                color: '#E0802B',
            },
        },
        checked: {}
    })((props) => <Radio color="default" {...props} />);

    return <DRadio {...props}></DRadio>
}

export default DoggoRadio;