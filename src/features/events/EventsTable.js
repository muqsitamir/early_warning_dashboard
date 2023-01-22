import React, { useEffect, useState, useRef } from "react";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Tab,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarIcon from "@mui/icons-material/Star";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, selectEvents, resetEvents, updateEventStatus, deleteEvent, annotateEvents, removeAnnotations } from "./eventsSlice";
import { selectFilters, setFilterApplied, resetFilters } from "../filters/filterSlice";
import { selectOrganization } from "../organization/organizationSlice";
import { TextFormat } from "@mui/icons-material";

export function EventsTable() {
  const [state, setState] = useState({ page: 0, rowsPerPage: 10 });
  const [selected, setSelected] = useState([]);
  const [tab, setTab] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAnnotateMenu, setShowAnnotateMenu] = useState(false);
  const [selectedAnnotations, setSelectedAnnotations] = useState([]);
  const { species: allSpecies } = useSelector(selectOrganization);
  const prevTab = useRef(tab);
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

  const reloadEvents = (pageSize = 10) => {
    setState({ page: 0, rowsPerPage: pageSize });
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
    reloadEvents(parseInt(event.target.value, 10));
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

  const handleDelete = () => {
    dispatch(deleteEvent(selected));
    setShowDeleteConfirmation(false);
    reloadEvents();
  };

  const handleAnnotate = () => {
    dispatch(annotateEvents(selected, selectedAnnotations));
    setShowAnnotateMenu(false);
    reloadEvents();
  };

  const handleUnAnnotate = () => {
    dispatch(removeAnnotations(selected, selectedAnnotations));
    setShowAnnotateMenu(false);
    reloadEvents();
  }

  const { page, rowsPerPage } = state;
  return (
    <Paper className="mb4">
      <Dialog
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Event?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete {selected.length} selected event(s)?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showAnnotateMenu}
        onClose={() => setShowAnnotateMenu(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Annotate Event(s)</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">Select all the labels you want to apply (or remove)!</DialogContentText>
          <FormGroup>
            {allSpecies.map((species) => (
              <FormControlLabel
                control={<Checkbox name={species.name} />}
                label={species.name}
                key={species.name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAnnotations([...selectedAnnotations, species.name]);
                  } else {
                    setSelectedAnnotations(selectedAnnotations.filter((item) => item !== species.name));
                  }
                }}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAnnotateMenu(false);
              setSelectedAnnotations([]);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUnAnnotate}>UnAnnotate</Button>
          <Button onClick={handleAnnotate} autoFocus>
            Annotate
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer style={{ maxHeight: 1200 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="basic tabs example" sx={{ flex: 9.3 }}>
            <Tab label="All" />
            <Tab label="Archived" />
            <Tab label="Featured" />
          </Tabs>
          {selected.length > 0 && (
            <div style={{ flex: 5.5, alignSelf: "center", display: "flex", justifyContent: "space-between", paddingRight: "3vw" }}>
              <h6 style={{alignSelf: "center"}}>{selected.length > 0 && (`${selected.length} selected`)}</h6>
              <Button
                onClick={() => {
                  setShowAnnotateMenu(true);
                  setSelectedAnnotations([]);
                }}
              >
                Annotations Menu
              </Button>
              <div style={{ alignSelf: "center", flex: 0.7, display: "flex", justifyContent: "space-between" }}>
                <div onClick={handleArchive}>{tab === 1 ? <UnarchiveIcon style={{ color: "red" }} /> : <ArchiveIcon />}</div>
                <StarIcon onClick={handleStar} style={{ color: tab === 2 ? "red" : "black" }} />
                <DeleteIcon onClick={() => setShowDeleteConfirmation(true)} style={{ color: "red" }} />
              </div>
            </div>
          )}
        </Box>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
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
                      <Checkbox
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
        showFirstButton
      />
    </Paper>
  );
}
