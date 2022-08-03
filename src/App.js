import React, {useEffect} from 'react';
import './App.css';
import {Filters} from "./features/filters/Filters";
import {useDispatch, useSelector} from "react-redux";
import {getOrganization} from "./features/organization/organizationSlice";
import {EventsTable} from './features/events/EventsTable'
import SideNav from "./features/components/SideNav";
import {LineChart} from "./features/linechart/LineChart";
import {PieChart} from "./features/piechart/PieChart";
import {Maps} from "./features/maps/Maps";


function App() {
    localStorage.setItem("token", 'cec1f9c4f9d97b72d08a0a188b27a97ca80f5a79')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrganization())
    }, [])


  return (
      <div className="page">
        <div className="page__content">
            <div className="main-wrapper">
                <SideNav/>
                <div className="main" style={{backgroundColor: 'var(--dark-mode-gray)', minHeight: '100vh'}}>
                    <div className="container l mb7">
                      <header className="row mb4 db">
                        <div className="col s12 m6">
                            <h2 className="bold">Dashboard</h2>
                        </div>
                        <div className="fr">
                            <Filters/>
                        </div>
                      </header>
                        {/*<div className="content">*/}
                                    <div className="row">
                                        <div className="shadow border rounded-sm db mb1">
                                            <div className="content tc">
                                                <div className="pa3">
                                                    <div className="mv3">
                                                        <LineChart/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                     <div className="row">
                                        <div className="col s12 m6">
                                            <div className="shadow border rounded-sm db mb3">
                                                <div className="content tc">
                                                    <div className="pa3">
                                                        <div className="mv3">
                                                            <PieChart/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col s12 m6">
                                            <div className="shadow border rounded-sm db mb3">
                                                <div className="content tc">
                                                    <div className="pa3">
                                                        <div className="mv3">
                                                            <Maps/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <EventsTable/>

                                    {/*{/<div className="row">/}*/}
                                    {/*/!*    <div className="col s12">*!/*/}
                                    {/*/!*        <h1 className="bold pb2">Loreum Ipsum</h1>*!/*/}
                                    {/*/!*    </div>*!/*/}
                                    {/*{/</div>/}*/}

                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default App;
