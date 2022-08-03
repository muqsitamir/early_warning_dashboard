import React, {useState} from "react";
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
import {useDispatch} from "react-redux";
import {useEffect} from "@types/react";
import {getOrganization} from "../organization/organizationSlice";
import {getEvents} from "./eventsSlice";

export function EventTable(props){

    const [state, setState] = useState({page: 0, rowsPerPage: 10});
    const { getEventTable, start_date, end_date, event_table} = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents())
    })
    const componentDidMount = () => {
        getEventTable(start_date, end_date, (state.page + 1))
    }
    const componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.start_date !== start_date || prevProps.end_date !== end_date) {
            getEventTable( start_date, end_date, 1)
            setState({page: 0});
        }
    }

    const handleChangePage = (event, newPage) => {
        if (newPage > state.page)
            getEventTable( start_date, end_date, (newPage + 1))
        setState({page: newPage});
    };

    const handleChangeRowsPerPage = (event) => {
        setState({rowsPerPage: parseInt(event.target.value, 10)});
        setState({page: 0});
    };

    const {page, rowsPerPage} = state;

    return (
            <Paper className="mb4">
                <TableContainer style={{maxHeight: 500}}>
                    <Table size="small" stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event</TableCell>
                                <TableCell>Specie</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Camera</TableCell>
                            </TableRow>
                        </TableHead>

                        {event_table.results.length !== 0 ?
                            <TableBody>{(rowsPerPage > 0
                                    ? event_table.results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : event_table.results
                            ).map((row) => {

                                return <TableRow key={row.uuid}>
                                    <TableCell>
                                        <a target="_blank" href={row.file.replace("http://127.0.0.1:8000/media", "https://tpilums.org.pk/media")}>
                                        <img
                                            src={row.thumbnail.replace("http://127.0.0.1:8000/media", "https://tpilums.org.pk/media")}
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
                    count={event_table.count !== null ? event_table.count : "loading..."}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}/>
            </Paper>
        );
}
