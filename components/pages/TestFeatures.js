import React, {lazy, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {GenericTable} from '../table-components/generic-table';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing.unit,
        backgroundColor: '#1498d5',
        '&:hover': {
            backgroundColor: '#1976d2'
        }
    },
    buttonPrimary: {
        margin: theme.spacing.unit,
        backgroundColor: '#1498d5',
        '&:hover': {
            backgroundColor: '#1976d2'
        },
        width: "-webkit-fill-available"
    },
    input: {
        display: 'none',
    },
}));

function TestFeatures() {

    const classes = useStyles();

    //grabbing random url for public library

    return (

        <div>
            <GenericTable urlData={"https://google.com"}
                          type={"danger"} title={"Sample Title"} grouper="grouper"/>

        </div>
    );
}


export default TestFeatures;
