import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatars(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src={require('../images/' + props.src)}
        sx={{ width: {xs: 100, sm: 150, md: 300}, height: {xs: 100, sm: 150, md: 300}}}
      />
    </Stack>
  );
}
