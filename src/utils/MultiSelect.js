import React from "react";
import {MenuItem, TextField} from "@mui/material";


export default function MultiSelect(){
      <TextField
    select
    name="userRoles"
    id="userRoles"
    variant="outlined"
    label="userRoles"
    SelectProps={{
      multiple: true,
      value: [],
      onChange: ()=>{}
    }}
  >
    <MenuItem value="admin">Admin</MenuItem>
    <MenuItem value="user1">User1</MenuItem>
    <MenuItem value="user2">User2</MenuItem>
  </TextField>
}