import React, { useState } from 'react';
import {Dialog} from "@mui/material";
import DatePicker from "../../utils/DatePicker";
import {useDispatch, useSelector} from "react-redux";
import {setCameras, setDateRange, setSpecies, setFilterApplied} from "./filterSlice";
import MultiSelect from "../../utils/MultiSelect";
import {selectOrganization} from "../organization/organizationSlice";
import FilterListIcon from '@mui/icons-material/FilterList';


export function Filters() {
    const [state, setState] = useState({open: false});
    const {cameras:availCameras, species:availSpecies} = useSelector(selectOrganization);
    const cameraItems = availCameras.map((v,i)=>({key:v.id,value:v.description}));
    const speciesItems = availSpecies.map((v,i)=>({key:v.id,value:v.name}));
    const dispatch = useDispatch();
    const [newRange, setNewRange] = useState({
      startDate: null,
      endDate: new Date(),
      key: 'range'
    });
    const [newCameras, setNewCameras] = useState([]);
    const [newSpecies, setNewSpecies] = useState([]);

    const handleClose = () => {
        setState({open: false})
    }
    const handleOpen = (e) => {
        setState({open: true})
    }
    const handleDateChange = (range) => {
        setNewRange({startDate: range.range.startDate, endDate: range.range.endDate, key: 'range'})
    }
    const handleSpecieSelect = (e) => {
        setNewSpecies(e.target.value)
    }
    const handleCameraSelect = (e) => {
        setNewCameras(e.target.value)
    }
    const handleApplyFilter = () => {
        dispatch(setDateRange(newRange));
        dispatch(setCameras(newCameras));
        dispatch(setSpecies(newSpecies));
        dispatch(setFilterApplied(true));
        setState({open: false});
    }
    return(
        <div>
            <button onClick={handleOpen} className="mdc-button mdc-top-app-bar__action-item mdc-button__ripple">
              <FilterListIcon className='v-mid mr2'/>
                <span>Filter</span>
            </button>
            <Dialog
                open={state.open}
                onClose={handleClose}
                closeAfterTransition>
                        <DatePicker ranges={newRange} onChange={handleDateChange}/>
                        <MultiSelect label={"Cameras"} onChange={handleCameraSelect} values={newCameras} items={cameraItems}  />
                        <MultiSelect label={"Species"} onChange={handleSpecieSelect} values={newSpecies} items={speciesItems}/>
                        <div className="center tc pv3 ph2">
                            <button className="btn btn-outline-primary" onClick={handleApplyFilter}>Apply Filter</button>
                        </div>
            </Dialog>
        </div>
    );
}
