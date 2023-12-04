import React, {useEffect, useState, useRef} from "react";
import {
    Button,
    Chip,
    Paper, Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, Tabs
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getEvents, resetEvents, selectEvents} from "./eventsSlice";
import {selectFilters, setFilterApplied} from "../filters/filterSlice";
import GridViewIcon from "@mui/icons-material/GridView";
import ReorderIcon from "@mui/icons-material/Reorder";

export function EventsTableWWF(){
    const [tab, setTab] = useState(0);
    const prevTab = useRef(tab);
    const [state, setState] = useState({page: 0, rowsPerPage: 10});
    const {results: events, count} = useSelector(selectEvents);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

      const status = (tab) => {
        switch (tab) {
          case 0:
            return "";
          case 1:
            return "FEATURED";
          default:
            return "NONE";
        }
      };

    useEffect(() => {
        if(prevTab != tab){
            prevTab.current = tab;
            dispatch(resetEvents());
            setState({ page: 0, rowsPerPage: 10 });
        }
        dispatch(getEvents(state.page + 1, filters.filterApplied, status(tab)));
        let check = filters.filterApplied ? false : filters.filterApplied;
        dispatch(setFilterApplied(check));
    }, [filters, tab])


      const handleChangePage = (event, newPage) => {
        if (newPage > state.page && newPage + 1 > events.length/rowsPerPage) dispatch(getEvents(newPage + 1, filters.filterApplied, status(tab), rowsPerPage));
        setState({ page: newPage, rowsPerPage: state.rowsPerPage });
      };

    const handleChangeRowsPerPage = (event) => {
        setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
    };
    const {page, rowsPerPage} = state;
    return (
            <Paper className="mb4">
                <TableContainer style={{maxHeight: 1200}}>
                    <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="basic tabs example" sx={{ flex: 9.3 }}>
                        <Tab label="All" />
                        <Tab label="Featured" />
                    </Tabs>
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
