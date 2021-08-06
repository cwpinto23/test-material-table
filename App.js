import React, {Component, Suspense} from 'react';
import './App.scss'
import Routes from './routes/Routes'
import {RenderLoader} from "./utils/SkeletonLoaders";

function App({location}) {
    return (
        <div>
            <div>
                <div>
                        <Suspense fallback={RenderLoader()}>
                            <Routes location={location}/>
                        </Suspense>
                </div>
            </div>
        </div>
    );
}

export default App;
