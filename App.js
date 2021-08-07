import React, {Component, Suspense} from 'react';
import './App.scss'
import Routes from './routes/Routes'
import MaterialTable from '@material-table/core';
import {RenderLoader} from "./utils/SkeletonLoaders";

function App({location}) {
    return (
        <div>
            <div>
                <div>
                        <Suspense fallback={RenderLoader()}>
                            <Routes location={location}/>
                            <MaterialTable />
                        </Suspense>
                </div>
            </div>
        </div>
    );
}

export default App;
