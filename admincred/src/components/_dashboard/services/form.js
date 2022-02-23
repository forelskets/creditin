import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField } from '@mui/material';
import Iconify from '../../Iconify';

export default function FormModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        to="#"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}
      >
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack
          alignItems="center"
          spacing={2}
          sx={{
            p: 2.5,
            pt: 2,
            borderRadius: 1,
            position: 'relative',
            bgcolor: 'grey.200'
          }}
        >
          <DialogTitle id="alert-dialog-title">Add Services</DialogTitle>

          <TextField helperText="Enter Services" id="demo-helper-text-aligned" label="Service" />
          <TextField helperText=" Note" id="demo-helper-text-aligned-no-helper" label="Note" />

          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
}
