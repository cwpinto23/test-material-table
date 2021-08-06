import React from 'react'
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

export const RenderLoader=()=>  <div>
        <Box display="flex" alignItems="center">
            <Skeleton variant="circle" width={40} height={40}/>
            <Skeleton style={{marginLeft: "10px"}} variant="text" width={160}/>
        </Box>
        <Skeleton variant="text" width={210}/>
        <Skeleton variant="text" width={210}/>
        <Skeleton variant="rect" height={70} width={210}/>
    </div>;



export const renderLoaderFullScreen = () =>   <div style={{ margin:"5%", display:"flex"}}>
    <div style={{width:"-webkit-fill-available"}}>
        <Box display="flex" alignItems="center">
            <Skeleton variant="circle" width={80} height={80}/>
            <Skeleton style={{marginLeft: "10px"}} height={80} variant="text" width={"100%"}/>
        </Box>
        <Skeleton variant="text" height={80} width={"100%"}/>
        <Skeleton variant="text" height={80} width={"100%"}/>
        <Skeleton variant="rect" height={200} width={"100%"}/>
    </div>
</div>;