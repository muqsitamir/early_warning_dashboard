import React, { useEffect, useState } from "react";
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs, Tab, Box } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarIcon from "@mui/icons-material/Star";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, selectEvents, resetEvents, updateEventStatus } from "./eventsSlice";
import { selectFilters, setFilterApplied, resetFilters } from "../filters/filterSlice";

export function EventsTable() {
  const [state, setState] = useState({ page: 0, rowsPerPage: 10 });
  const [selected, setSelected] = useState([]);
  const [tab, setTab] = useState(0);
  const prevTab = React.useRef(tab);
  const { results: events, count } = useSelector(selectEvents);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const status = (tab) => {
    switch (tab) {
      case 0:
        return "";
      case 1:
        return "ARCHIVED";
      case 2:
        return "FEATURED";
      default:
        return "NONE";
    }
  };

  const reloadEvents = () => {
    setState({ page: 0, rowsPerPage: 10 });
    setSelected([]);
    dispatch(resetEvents());
    dispatch(resetFilters());
  };

  useEffect(() => {
    dispatch(getEvents(state.page + 1, filters.filterApplied, status(tab), rowsPerPage));
    let check = filters.filterApplied ? false : filters.filterApplied;
    dispatch(setFilterApplied(check));
  }, [filters]);

  useEffect(() => {
    if (prevTab !== tab) {
      prevTab.current = tab;
      reloadEvents();
    }
  }, [tab]);

  const handleChangePage = (event, newPage) => {
    if (newPage > state.page) dispatch(getEvents(newPage + 1, filters.filterApplied, status(tab), rowsPerPage));
    setState({ page: newPage, rowsPerPage: state.rowsPerPage });
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
  };

  const handleArchive = () => {
    if (tab !== 1) {
      dispatch(updateEventStatus(selected, "archive"));
    } else {
      dispatch(updateEventStatus(selected, "restore"));
    }
    reloadEvents();
  };

  const handleStar = () => {
    if (tab !== 2) {
      dispatch(updateEventStatus(selected, "feature"));
    } else {
      dispatch(updateEventStatus(selected, "restore"));
    }
    reloadEvents();
  };

  const { page, rowsPerPage } = state;
  return (
    <Paper className="mb4">
      <TableContainer style={{ maxHeight: 1200 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="basic tabs example" sx={{ flex: 9.3 }}>
            <Tab label="All" />
            <Tab label="Archived" />
            <Tab label="Featured" />
          </Tabs>
          {selected.length > 0 && (
            <div style={{ flex: 0.7, alignSelf: "center", display: "flex", justifyContent: "space-between", paddingRight: "3vw" }}>
              <div onClick={handleArchive}>{tab === 1 ? <UnarchiveIcon style={{ color: "red" }} /> : <ArchiveIcon />}</div>
              <StarIcon onClick={handleStar} style={{ color: tab === 2 ? "red" : "black" }} />
            </div>
          )}
        </Box>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <input
                  type="checkbox"
                  checked={events
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((event) => event.uuid)
                    .every((item) => selected.includes(item))}
                  onChange={() => {
                    if (selected.length === rowsPerPage) setSelected([]);
                    else setSelected(events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => event.uuid));
                  }}
                />
              </TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Specie</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Camera</TableCell>
            </TableRow>
          </TableHead>

          {events.length !== 0 ? (
            <TableBody>
              {(rowsPerPage > 0 ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : events).map((row) => {
                // debugger;
                return (
                  <TableRow key={row.uuid}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selected.includes(row.uuid)}
                        onChange={() => {
                          if (selected.includes(row.uuid)) {
                            setSelected(selected.filter((item) => item !== row.uuid));
                          } else {
                            setSelected([...selected, row.uuid]);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <a target="_blank" href={row.file}>
                        <img src={row.thumbnail} height={80} />
                      </a>
                    </TableCell>
                    <TableCell>
                      {row.species.map((item) => (
                        <Chip className="mr1" style={{ backgroundColor: item.color }} color="primary" key={item.key} label={item.name} />
                      ))}
                    </TableCell>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell>{row.updated_at}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.camera_name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <div className="container tc">Loading Data....</div>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={count !== null ? count : "loading..."}
        rowsPerPage={rowsPerPage}
        page={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
