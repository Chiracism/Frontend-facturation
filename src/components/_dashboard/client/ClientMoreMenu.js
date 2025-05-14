import { useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import editOutline from '@iconify/icons-eva/edit-outline';

// modal
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
// material
import {
  Button,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'scroll'
  }
}));

// ----------------------------------------------------------------------

export default function ClientMoreMenu({
  idChargeur,
  nameChargeur,
  addressChargeur,
  commissionChargeur,
  extraFacChargeur,
  sendInformation
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  // Modal
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState(nameChargeur);
  const [address, setAddress] = useState(addressChargeur);
  const [commission, setCommission] = useState(commissionChargeur);
  const [extrafac, setExtraFac] = useState(extraFacChargeur);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteClient = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/client/${idChargeur}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete Client success !');
        sendInformation(value);
        showSuccessToastSupprimer();
      })
      .catch(() => {});
  };

  const modifyChargeur = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/client/${idChargeur}`,
        {
          name,
          address,
          extrafac,
          commission
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }
        }
      )
      .then((value) => {
        console.log('Value : ', value);
        sendInformation(value.data);
        setIsOpen(false);
        handleClose();
        showSuccessToastModifier();
      })
      .catch(() => {});
  };

  // React-Toastify-Notification
  const showSuccessToastSupprimer = () => {
    toast.warning('Le Chargeur a été supprimé avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const showSuccessToastModifier = () => {
    toast.success('Le Chargeur a été modifié avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  return (
    <>
      <ToastContainer />
      {openModal ? (
        <Modal
          aria-describedby="simple-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <h2 id="simple-modal-title"> Modifier le Chargeur </h2>
            <TextField
              label="Saisissez le nom de Chargeur"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Saisissez son adresse"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="Saisissez la Commission"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
            />
            <TextField
              label="Saisissez Extra Fac"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={extrafac}
              onChange={(e) => setExtraFac(e.target.value)}
            />
            <Button onClick={() => modifyChargeur()} variant="contained">
              Sauvegarder
            </Button>
          </div>
        </Modal>
      ) : null}
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'blue' }} onClick={() => handleOpen()}>
          <ListItemIcon>
            <Icon icon={editOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Modifier" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'red' }} onClick={() => deleteClient()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Effacer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
