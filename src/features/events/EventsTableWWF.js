import React, {useEffect, useState} from "react";
import {
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getEvents, selectEvents} from "./eventsSlice";
import {selectFilters, setFilterApplied} from "../filters/filterSlice";

export function EventsTableWWF(){

    const [state, setState] = useState({page: 0, rowsPerPage: 10});
    const {results: events, count} = useSelector(selectEvents);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents(state.page + 1, filters.filterApplied));
        let check = filters.filterApplied ? false : filters.filterApplied;
        dispatch(setFilterApplied(check));
    }, [filters])


    const handleChangePage = (event, newPage) => {
        if (newPage > state.page)
            dispatch(getEvents(newPage + 1, filters.filterApplied));
        setState({page: newPage, rowsPerPage: state.rowsPerPage});
    };

    const handleChangeRowsPerPage = (event) => {
        setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
    };
    const {page, rowsPerPage} = state;
    return (
            <Paper className="mb4">
                <TableContainer style={{maxHeight: 1200}}>
                    <Table size="small" stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event</TableCell>
                                <TableCell>Specie</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Camera</TableCell>
                            </TableRow>
                        </TableHead>

                        {   events.length !== 0 ?
                            <TableBody>{(rowsPerPage > 0
                                    ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : events
                            ).map((row) => {
                                // debugger;
                                return <TableRow key={row.uuid}>
                                    <TableCell>
                                        <a target="_blank" href={row.file}>
                                        <img
                                            src={row.thumbnail}
                                            height={80}/>
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        {row.species.map((item) => (
                                            <Chip
                                                className="mr1"
                                                style={{backgroundColor: item.color}}
                                                color="primary"
                                                key={item.key}
                                                label={item.name}
                                            />))}
                                    </TableCell>
                                    <TableCell>
                                        {row.created_at}
                                    </TableCell>
                                    <TableCell>
                                        {row.updated_at}
                                    </TableCell>
                                    <TableCell>
                                        {row.date}
                                    </TableCell>
                                    <TableCell>
                                        {row.camera_name}
                                    </TableCell>
                                </TableRow>
                            })}</TableBody> :
                            <div className="container tc">Loading Data....</div>}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={count !== null ? count : "loading..."}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    onPageChange = {handleChangePage}/>
            </Paper>
        );
}
