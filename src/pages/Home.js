import React, { useEffect, useState } from "react";
import "../App.css";
import { Filters } from "../features/filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { selectSiteData } from "../reusable_components/site_data/siteDataSlice";
import {getOrganization, selectOrganization} from "../features/organization/organizationSlice";
import { EventsTable } from "../features/events/EventsTable";
import SideNav from "../Headers/SideNav/SideNav";
import { LineChart } from "../features/linechart/LineChart";
import { PieChart } from "../features/piechart/PieChart";
import { Maps } from "../features/maps/Maps";
import {EventsTableWWF} from "../features/events/EventsTableWWF";
import {selectFilters} from "../features/filters/filterSlice";

export default function Home() {
  const dispatch = useDispatch();
  const organization = useSelector(selectOrganization);
  useEffect(() => {
    dispatch(getOrganization());
  }, []);
  const {eventComponent, setEventComponent} = useState(null);
  if(eventComponent === 'WWF'){
    setEventComponent(<EventsTableWWF/>)
  }
  if (eventComponent === 'CVGL'){
    setEventComponent(<EventsTable/>)
  }
  let event_component = organization.name === "CVGL" ? <EventsTable/> : <EventsTableWWF/>;
  const { side_nav: side_nav_check } = useSelector(selectSiteData);
  let side_nav = side_nav_check ? <SideNav /> : null;
  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          {side_nav}
          <div className="main" style={{ backgroundColor: "var(--dark-mode-gray)", minHeight: "100vh" }}>
            <div className="container l mb7">
              <header className="row mb4 db">
                <div className="col s12 m6">
                  <h2 className="bold">Dashboard</h2>
                </div>
                <div className="fr">
                  <Filters />
                </div>
              </header>
              {/*<div className="content">*/}
              <div className="row">
                <div className="shadow border rounded-sm db mb1">
                  <div className="content tc">
                    <div className="pa3">
                      <div className="mv3">
                        <LineChart />
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
                          <PieChart />
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
                          <Maps />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*<EventsTable />*/}
              {event_component}
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
