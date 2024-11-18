import React, {useEffect, useState, useRef} from "react";
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
  FormControlLabel, Grid,
} from "@mui/material";
import { selectOrganization } from "../organization/organizationSlice";
import { backend_url } from '../../App';  
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {getEvents, resetEvents, selectEvents,deleteEvent,annotateEvents,
  removeAnnotations,updateEventStatus,
  setEvents} from "./eventsSlice";
import {selectFilters, setFilterApplied} from "../filters/filterSlice";
import GridViewIcon from "@mui/icons-material/GridView";
import ReorderIcon from "@mui/icons-material/Reorder";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";

export function EventsTableWWF(){
    const [listView, setListView] = useState(true);
    const isFirstRun = useRef(true);
    const isFirstRender = useRef(true);
    const justRan = useRef(false);
    const [tab, setTab] = useState(0);
    const prevTab = useRef(tab);
    const [selected, setSelected] = useState([]);
    const [selectMode, setSelectMode] = useState(false);
    const [state, setState] = useState({page: 0, rowsPerPage: 10});
    const {results: events, count} = useSelector(selectEvents);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showAnnotateMenu, setShowAnnotateMenu] = useState(false);
    const [selectedAnnotations, setSelectedAnnotations] = useState([]);
    const [requests,setRequests]=useState([])
    const user=JSON.parse(localStorage['user']);
    const can_annotate=user.can_annotate;
    const can_unannotate=user.can_unannotate;
    const can_feature=user.can_feature;
    const can_delete=user.can_delete;
    const[countR,setCount]=useState(0)
    const { species: allSpecies } = useSelector(selectOrganization); 
    //console.log(allSpecies) 
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();
    const [requestsPage, setRequestsPage] = useState(0);
      const status = (tab) => {
        switch (tab) {
          case 0:
            return "";
          case 1:
            return "FEATURED";
          case 2:
            return "REQUETS";
          default:
            return "NONE";
        }
      };

    const {page, rowsPerPage} = state;

    useEffect(() => {
        if(prevTab != tab) {
            prevTab.current = tab;
            dispatch(resetEvents());
            setState({page: 0, rowsPerPage: 10});
        }
        if(tab===2){
          dispatch(getEvents(state.page + 1, filters.filterApplied, status(0)));
        }else{dispatch(getEvents(state.page + 1, filters.filterApplied, status(tab)));}
        
    }, [tab])

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        dispatch(resetEvents());
        if(tab===2){
          dispatch(getEvents(state.page + 1, filters.filterApplied, status(0), rowsPerPage));
      
        }else{
          dispatch(getEvents(state.page + 1, filters.filterApplied, status(tab), rowsPerPage));
      
        }
        }, [rowsPerPage]);
      useEffect(() => {
        fetchRequest();
      }, [tab,requestsPage]);
    useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }
        if (justRan.current) {
          justRan.current = false;
          return;
        }
        dispatch(resetEvents());
        if(tab===2){
          dispatch(getEvents(state.page + 1, filters.filterApplied, status(0), rowsPerPage));
        
        }else{
          dispatch(getEvents(state.page + 1, filters.filterApplied, status(tab), rowsPerPage));
        
        }
        justRan.current = true;
        let check = filters.filterApplied ? false : filters.filterApplied;
        dispatch(setFilterApplied(check));
        }, [filters]);

      const handleChangePage = (event, newPage) => {
        if(tab!==2){
        if (newPage > state.page && newPage + 1 > events.length/rowsPerPage) dispatch(getEvents(newPage + 1, filters.filterApplied, status(tab), rowsPerPage));
        setState({ page: newPage, rowsPerPage: state.rowsPerPage });
      }else{
        if (newPage > requestsPage && newPage + 1 > requests.length / rowsPerPage) {
          fetchRequest(newPage + 1); // Fetch requests with updated page number
        }
        setRequestsPage(newPage);
       }
      };

    const handleChangeRowsPerPage = (event) => {
        setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
    };

    const fetchRequest=async()=>{
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User is not authenticated');
      }
  
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
  
     let response= await axios.get(`${backend_url}/core/api/request/?page=${requestsPage+1}&page_size=${rowsPerPage}`, config);
     console.log(response.data.results)
     setRequests(response.data.results)
     setCount(response.data.count);

    }
    const handleDelete = () => {
      let requestCreated = false;
      selected.forEach((eventId) => {
        // Find if the selected event has a corresponding request
        const existingRequest = requests.find((request) => request.id === eventId);
    
        if (existingRequest) {
          // Check the request status
          if (existingRequest.request_status === "PENDING") {
            console.log(`Request for event ${eventId} is pending. Creating a new request.`);
            // Call the createRequest function with the event id
            alert(`Request for event ${eventId} is pending. You cannot delete this event until the request is approved by the admin.`);
     
          } else if (existingRequest.request_status === "APPROVED") {
            // Proceed with deleting the event if the request status is COMPLETED
          
            dispatch(deleteEvent([eventId]));
            setShowDeleteConfirmation(false);
            setSelected([]);
            showChanges();
            alert(`Request for event ${eventId} is completed. Deleting the event.`);
          }else if (existingRequest.request_status === "REJECTED") {
            // Proceed with deleting the event if the request status is COMPLETED
            setShowDeleteConfirmation(false);
            showChanges();
            alert(`Request for event ${eventId} is rejected by admin.you dont have permission to delete this event.`);
          }
        } else {
          // If no existing request, create a new request for the event
          console.log(`No request found for event ${eventId}. Creating a new request.`);
          createRequest(eventId);
          setState({ page: 0, rowsPerPage: 10 });
          fetchRequest()
          setShowDeleteConfirmation(false);
          setSelected([]);
          showChanges();
        }
      });
    
      // Close the delete confirmation modal and clear the selection
      
    };
    
    const showChanges = async (tabChange = false) => {
      if(!tabChange) {
        if (events.length <= rowsPerPage) {
          dispatch(resetEvents());
        } else {
          dispatch(setEvents({results: events.slice(0, rowsPerPage * page), count: count, filterApplied: true}))
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if(tab===2){
        dispatch(getEvents(state.page + 1, filters.filterApplied, status(0), rowsPerPage));
    
      }else{ dispatch(getEvents(state.page + 1, filters.filterApplied, status(tab), rowsPerPage));
      }
     };
    const handleArchive = () => {
      if (tab !== 1) {
        dispatch(updateEventStatus(selected, "archive"));
      } else {
        dispatch(updateEventStatus(selected, "restore"));
      }
      setSelected([])
      if(tab == 2 || tab == 1){
        showChanges();
      }
    };
  
    const handleStar = () => {
      if (tab !== 2) {
        dispatch(updateEventStatus(selected, "feature"));
      } else {
        dispatch(updateEventStatus(selected, "restore"));
      }
      setSelected([])
      if(tab == 2 || tab == 1){
        showChanges();
      }
    };
  
  
    const handleAnnotate = () => {
      dispatch(annotateEvents(selected, selectedAnnotations));
      setShowAnnotateMenu(false);
      setSelected([]);
      showChanges();
    };
  
    const handleUnAnnotate = () => {
      dispatch(removeAnnotations(selected, selectedAnnotations));
      setShowAnnotateMenu(false);
      setSelected([]);
      showChanges();
    }
  
    const createRequest = async (eventId) => {
      try {
        const token = localStorage.getItem('token');
        const event = events.find((e) => e.uuid === eventId);
        console.log(event.species)
        if (!token) {
          throw new Error('User is not authenticated');
        }
    
        const config = {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        };
    
        const requestData = {
          id: eventId,
          request_status: "PENDING",
          request_type: "DELETE",
          thumbnail: `https://api.tpilums.org.pk/media/thumbnails/${eventId}.gif`,
          species: event.species, 
        };
    
        const response = await axios.post(`${backend_url}/core/api/request/`, requestData, config);
    
        console.log('Request created:', response.data);
        alert(`Request for event ${eventId} is created.`);
        fetchRequest()
        return response.data;
    
      } catch (error) {
        console.error('Error creating request:', error);
        throw error;
      }
    };

    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };
    return (
        <Paper className="mb4">
        {can_delete&&(<Dialog
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
      </Dialog>)}
      {can_annotate&&(
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
                disabled={species.name === "Animal"} 
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
          {can_unannotate&&( <Button onClick={handleUnAnnotate} disabled={selectedAnnotations.includes("Animal")}>
      UnAnnotate
    </Button>)}
          <Button onClick={handleAnnotate} autoFocus>
            Annotate
          </Button>
        </DialogActions>
      </Dialog>)}
            <TableContainer style={{maxHeight: 1200}}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
              <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="basic tabs example" sx={{ flex: 9.3 }}>
                <Tab label="All" />
                <Tab label="Featured" />
                <Tab label="Requests" />
                {tab!==2&&(
                   <Button onClick={()=>setSelectMode(!selectMode)} variant="text" sx={{ position: 'absolute', right: 45, top: 5 }}>Select</Button>
                )}
               
                {listView ? <GridViewIcon sx={{ position: 'absolute', right: 15, top: 12, color: "#1a76d2", '&:hover': {boxShadow: '0 0 5px 2px skyblue'} }} onClick={() => setListView(!listView)} /> : 
                  <ReorderIcon sx={{ position: 'absolute', right: 15, top: 12, color: "#1a76d2", '&:hover': {boxShadow: '0 0 5px 2px skyblue'} }} onClick={() => setListView(!listView)}/>}
              </Tabs>
              {selected.length > 0 && (
            <div style={{ flex: 5.5, alignSelf: "center", display: "flex", justifyContent: "space-between", paddingRight: "3vw" }}>
              <h6 style={{alignSelf: "center"}}>{selected.length > 0 && (`${selected.length} selected`)}</h6>
             {can_annotate&&(<Button
                onClick={() => {
                  setShowAnnotateMenu(true);
                  setSelectedAnnotations([]);
                }}
              >
                Annotations Menu
              </Button>)} 
              <div style={{ alignSelf: "center", flex: 0.7, display: "flex", justifyContent: "space-between" }}>
                <div onClick={handleArchive}>{tab === 1 ? <UnarchiveIcon style={{ color: "red" }} /> : <ArchiveIcon />}</div>
                 {can_feature&&(<StarIcon onClick={handleStar} style={{ color: tab === 2 ? "red" : "black" }} />)} 
                {can_delete&&(<DeleteIcon onClick={() => setShowDeleteConfirmation(true)} style={{ color: "red" }} />)}
              </div>
            </div>
          )}
            </Box>
            {listView ?
                 // List View
              (<Table size="small" stickyHeader aria-label="sticky table">
              <TableHead>
                {tab===2?(
                  <TableRow>
                   <TableCell>Event</TableCell>
                  <TableCell>Specie</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                </TableRow>):(
                  <TableRow>
                  <TableCell>
                  {selectMode ? (
                  <Checkbox
                    checked={events
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((event) => event.uuid)
                      .every((item) => selected.includes(item))}
                    onChange={() => {
                      if (selected.length === rowsPerPage) setSelected([]);
                      else setSelected(events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => event.uuid));
                    }}
                  /> ) : null}
                </TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>Specie</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Confidence</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Camera</TableCell>
                  </TableRow>
                )}
                
              </TableHead>
              {tab === 2 ? (
 <TableBody>
 {requests.length !== 0 ? (
 
   requests.map((row) => {
    return(
       <TableRow key={row.id}>
         <TableCell>
           <a target="_blank" rel="noopener noreferrer" href={row.thumbnail}>
             <img src={row.thumbnail} height={80} alt="" />
           </a>
         </TableCell>
         <TableCell>
         {row.species.map((item) => (
              <Chip
                className="mr1"
                style={{ backgroundColor: item.color }}
                color="primary"
                key={item.key}
                label={item.name}
              />
            ))}
         </TableCell>
         <TableCell>{row.request_status}</TableCell>
         <TableCell>{row.request_type}</TableCell>
         <TableCell>{formatDateTime(row.created_at)}</TableCell>
         <TableCell>{formatDateTime(row.updated_at)}</TableCell>
       </TableRow>
     
   )})
 ) : (
   <div className="container tc">Loading Data....</div>
 )}
</TableBody>
) : (
  <TableBody>
    {events.length !== 0 ? (
  (rowsPerPage > 0 ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : events).map((row) => {
    const animalSpecies = ["animal", "black bear", "coyote", "fire", "leopard", "other_animals", "spiderweb"];
    const excludedTags = ["Daytime false", "false", "fire", "rain"];

    const hasAnimal = row.species.some(item => animalSpecies.includes(item.name.toLowerCase()));

    // Check if row.uuid exists in requests with a status that is not "PENDING"
    const requestForRow = requests.find(request => request.id === row.uuid);
    if (requestForRow && requestForRow.request_status !== "PENDING") {
      return null; // Skip rendering this row
    }

    return (
      <TableRow key={row.uuid}>
        <TableCell>
          {selectMode ? (
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
          ) : null}
        </TableCell>
        <TableCell>
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            href={row.file.replace("http://127.0.0.1:8000", "https://api.tpilums.org.pk")}
          >
            <img 
              src={row.thumbnail.replace("http://127.0.0.1:8000", "https://api.tpilums.org.pk")} 
              height={80} 
              alt="" 
            />
          </a>
        </TableCell>
        <TableCell>
          {hasAnimal ? (
            <Chip 
              className="mr1"
              style={{ backgroundColor: 'desiredColorForAnimalTag' }}
              color="primary"
              label="Animal"
            />
          ) : (
            row.species.map((item) => (
              !excludedTags.includes(item.name) && !animalSpecies.includes(item.name.toLowerCase()) && (
                <Chip
                  className="mr1"
                  style={{ backgroundColor: item.color }}
                  color="primary"
                  key={item.key}
                  label={item.name} 
                />
              )
            ))
          )}
        </TableCell>
        <TableCell>{row.created_at}</TableCell>
        <TableCell>{row.confidence.toFixed(2)}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.camera_name}</TableCell>
      </TableRow>
    );
  })
) : (
  <div className="container tc">Loading Data....</div>
)}
  </TableBody>
)}
              
            </Table>)
                :
            (
             <div>
              <Grid container sx={{paddingTop: 3, paddingLeft: 5, paddingRight: 5}} spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 14 }}>
              {(rowsPerPage > 0 ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : events).map((row, index) => (
                <Grid item xs={2} sm={4} md={2} key={index} >
                  <a target="_blank" href={row.file} style={{marginTop: 20 }}>
                     <img style={{ border: "groove", borderColor: "gray", borderRadius: 10, marginBottom: 2 }} src={row.thumbnail} height={100} />
                  </a>
                </Grid>
              ))}
            </Grid>
          </div>
            )
            }
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100]}
            component="div"
            count={tab === 2 ? (countR !== null ? countR : "loading...") : (count !== null ? count : "loading...")}
            rowsPerPage={rowsPerPage}
            page={tab===2 ?requestsPage:page}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
            showFirstButton
            />
    </Paper>
    );
}
