import React, { useState } from 'react';
import { basicGet } from '../../api/axiosGet'
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from '@material-table/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    progress: {
        margin: theme.spacing(2),
      },
}));

export const GenericTable = ({ urlData, type, title,rowCount }) => {


    const classes = useStyles();

    if (rowCount==undefined)
    rowCount=20

    console.log("urlData", urlData)
    console.log("type", type)
    console.log("title", title)

    //whenever url changes, fetch data
    const { data, loading } = basicGet({ urlData: urlData, consoleOn: true })
    //console.log("data", data)
    

    // function that generates columns names based off data returned
    let columnNames = []

    if (data !== undefined && data !== null) {
        if (data.length > 0) columnNames = Object.keys(data[0])
    }
   // console.log("columnNames", columnNames)

    let columns = [];
    columnNames.map(name => {
        if (name=="tableData")return
        let tempColumn = { title: name, field: name }
        columns.push(tempColumn)
    })

 //   console.log("columns",columns)

    return <div className={classes.root}>

        {loading &&     <div> 
            <p>{title}</p>
            <CircularProgress className={classes.progress} />
            </div> }
        {data !== undefined && data !== null && <MaterialTable
            title={title}
            columns={columns}
            data={data}
            options={{
                pageSize: rowCount
              }}
        />
        }
    </div>


};