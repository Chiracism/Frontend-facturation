import { useRef, useState, useEffect, React } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import editOutline from '@iconify/icons-eva/edit-outline';
import bookOpenOutline from '@iconify/icons-eva/book-open-outline';

import ReactToPrint from 'react-to-print';

// modal
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';

// material
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Menu,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
  ListItemIcon,
  ListItemText,
  TextField,
  Select
} from '@material-ui/core';

// import ComponentToPrintBill from '../../../pages/exportation/ComponentToPrintBill';
import ComponentToPrintBill from './ComponentToPrintBill';
import ComponentToPrintBad from './ComponentToPrintBad';

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
    padding: theme.spacing(4, 4, 3),
    width: 1200,
    height: 700,
    // paddingTop: 50,
    // overflow: 'scroll'
    // overflow: 'auto'
    overflowY: 'scroll',
    overflow: 'scroll'
  }
}));

// ----------------------------------------------------------------------

export default function UserMoreMenu({ idHistoric, nameAgence, sendInformation }) {
  // const ref = useRef(null);
  // const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const [name, setName] = useState(nameAgence);

  /**
   * Informations for Client
   */
  const [clientTab, setClientTab] = useState([]);
  const [client, setClient] = useState(null);
  const [consignee, setConsignee] = useState(null);
  const [consigneeAddress, setConsigneeAddress] = useState(null);
  const [feriNumber, setFeriNumber] = useState('');
  const [freight, setFreight] = useState('Payé');
  const [dataPrint, setDataPrint] = useState({});

  const componentBillRef = useRef();
  const componentNoteRef = useRef();

  const printFacture = () => {};

  useEffect(() => {
    // Fetch datas for the current exportation
    axios(`${process.env.REACT_APP_BASE_URL}/historic/${idHistoric}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        console.log('Datas stored : ', value.data);
        setDataPrint(value.data);
      })
      .catch(() => {});

    axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setClientTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Vessel
   */
  const [vesselTab, setVesselTab] = useState([]);
  const [vessel, setVessel] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/vessel/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setVesselTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for POL
   */
  const [polTab, setPolTab] = useState([]);
  const [pol, setPol] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/pol/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setPolTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for POD
   */
  const [podTab, setPodTab] = useState([]);
  const [pod, setPod] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/pol/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setPodTab(value.data);
      })
      .catch(() => {});
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteAgence = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/historic/${idHistoric}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete Operation success !');
        sendInformation(value);
        showSuccessToastSupprimer();
      })
      .catch(() => {});
  };

  const modifyAgence = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/historic/${idHistoric}`,
        {
          name
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
    toast.warning('Opération a été supprimée avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const showSuccessToastModifier = () => {
    toast.success('Opération a été modifiée avec succès', {
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
            <h2 align="center" id="simple-modal-title">
              Modification
            </h2>
            <Card className="card-wrapper">
              <Box className="box-wrapper">
                <div className="input-label-wrapper">
                  Chargeur :{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={clientTab}
                    value={clientTab.id}
                    onChange={(event, newType) => {
                      if (newType) {
                        setClient(newType);
                      } else {
                        setClient(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le chargeur" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Consignee :{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez la consignée"
                    variant="outlined"
                    value={consignee}
                    onChange={(e) => setConsignee(e.target.value)}
                  />
                </div>
                <div className="input-label-wrapper">
                  Adresse Consignée :{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez l'adresse du consignée"
                    variant="outlined"
                    value={consigneeAddress}
                    onChange={(e) => setConsigneeAddress(e.target.value)}
                  />
                </div>
                <div className="input-label-wrapper">
                  N° Féri :{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le numéro Féri"
                    variant="outlined"
                    value={feriNumber}
                    onChange={(e) => {
                      setFeriNumber(e.target.value);
                    }}
                  />
                </div>
              </Box>
              <Box className="box-wrapper">
                <div className="input-label-wrapper">
                  Vessel :{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={vesselTab}
                    value={vesselTab.id}
                    onChange={(event, newType) => {
                      if (newType) {
                        setVessel(newType);
                      } else {
                        setVessel(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le vessel" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  POL :{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={polTab}
                    value={polTab.id}
                    onChange={(event, newType) => {
                      if (newType) {
                        setPol(newType);
                      } else {
                        setPol(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner un POL" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  POD :{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={podTab}
                    value={podTab.id}
                    onChange={(event, newType) => {
                      if (newType) {
                        setPod(newType);
                      } else {
                        setPod(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner un POD" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Freight :{' '}
                  <FormControl className="combo-box-completion">
                    <InputLabel id="demo-simple-select-label">Freight</InputLabel>
                    <Select
                      value={freight}
                      label="Freight"
                      onChange={(e) => setFreight(e.target.value)}
                    >
                      <MenuItem value="Payé">PREPAID</MenuItem>
                      <MenuItem value="Non Payé">Non Payé</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Box>
            </Card>
            {/* <TextField
              label="Saisissez le nom de Port"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> */}
            <Button onClick={() => modifyAgence()} variant="contained">
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
        <MenuItem sx={{ color: 'green' }}>
          <ListItemIcon>
            <ReactToPrint
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              trigger={() => <Icon icon={bookOpenOutline} width={30} height={30} />}
              content={() => componentBillRef.current}
              suppressErrors
              onAfterPrint={() => printFacture()}
            />
          </ListItemIcon>
          <ReactToPrint
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            trigger={() => (
              <ListItemText
                primary="Bill of Lading"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            )}
            content={() => componentBillRef.current}
            suppressErrors
            onAfterPrint={() => printFacture()}
          />
          <ComponentToPrintBill
            ref={componentBillRef}
            rows={[
              {
                description: dataPrint.description,
                quantity: dataPrint.quantity,
                unit: dataPrint.unit
              }
            ]}
            client={dataPrint.client}
            address={dataPrint.address}
            consignee={dataPrint.consignee}
            consigneeAddress={dataPrint.consigneeAddress}
            vessel={dataPrint.vesseld}
            portl={dataPrint.portl}
            portd={dataPrint.portd}
            feri={dataPrint.feri}
            serie={dataPrint.serie}
            freight={dataPrint.freight}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'orange' }}>
          <ListItemIcon>
            <ReactToPrint
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              trigger={() => <Icon icon={bookOpenOutline} width={30} height={30} />}
              content={() => componentNoteRef.current}
              suppressErrors
              onAfterPrint={() => printFacture()}
            />
          </ListItemIcon>
          <ReactToPrint
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            trigger={() => (
              <ListItemText
                primary="Bon à délivrer"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            )}
            content={() => componentNoteRef.current}
            suppressErrors
            onAfterPrint={() => printFacture()}
          />
          <ComponentToPrintBad
            ref={componentNoteRef}
            rows={[
              {
                description: dataPrint.description,
                quantity: dataPrint.quantity,
                unit: dataPrint.unit
              }
            ]}
            client={dataPrint.client}
            address={dataPrint.address}
            consignee={dataPrint.consignee}
            consigneeAddress={dataPrint.consigneeAddress}
            vessel={dataPrint.vesseld}
            portl={dataPrint.portl}
            portd={dataPrint.portd}
            feri={dataPrint.feri}
            serie={dataPrint.serie}
            freight={dataPrint.freight}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'blue' }} onClick={() => handleOpen()}>
          <ListItemIcon>
            <Icon icon={editOutline} width={30} height={30} />
          </ListItemIcon>
          <ListItemText primary="Modifier" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'red' }} onClick={() => deleteAgence()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={30} height={30} />
          </ListItemIcon>
          <ListItemText primary="Effacer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
