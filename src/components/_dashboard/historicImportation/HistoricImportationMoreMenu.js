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
  Button,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField
} from '@material-ui/core';

// import ComponentToPrint from '../../../pages/importation/ComponentToPrint';
import ComponentToPrint from './ComponentToPrint';

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

export default function HistoricImportationMoreMenu({
  idHistoric,
  // nameChargeur,
  // addressChargeur,
  // commissionChargeur,
  // extraFacChargeur,
  sendInformation
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  // Modal
  const [openModal, setOpenModal] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const ref = useRef(null);

  // const [name, setName] = useState(nameChargeur);
  // const [address, setAddress] = useState(addressChargeur);
  // const [commission, setCommission] = useState(commissionChargeur);
  // const [extrafac, setExtraFac] = useState(extraFacChargeur);
  const [dataPrint, setDataPrint] = useState({});

  const componentToPrintRef = useRef();

  const printFacture = () => {};

  useEffect(() => {
    // Fetch datas for the current importation
    axios(`${process.env.REACT_APP_BASE_URL}/historic2/${idHistoric}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        console.log('Datas stored : ', value.data);
        setDataPrint(value.data);
      })
      .catch(() => {});
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteHistoric = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/historic2/${idHistoric}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete element success !');
        sendInformation(value);
        showSuccessToastSupprimer();
      })
      .catch(() => {});
  };

  // const modifyChargeur = () => {
  //   axios
  //     .put(
  //       `${process.env.REACT_APP_BASE_URL}/client/${idChargeur}`,
  //       {
  //         name,
  //         address,
  //         extrafac,
  //         commission
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //         }
  //       }
  //     )
  //     .then((value) => {
  //       console.log('Value : ', value);
  //       sendInformation(value.data);
  //       setIsOpen(false);
  //       handleClose();
  //       showSuccessToastModifier();
  //     })
  //     .catch(() => {});
  // };

  // React-Toastify-Notification
  const showSuccessToastSupprimer = () => {
    toast.warning('Element a été supprimé avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const showSuccessToastModifier = () => {
    toast.success('Element a été modifié avec succès', {
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
            {/* <TextField
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
            /> */}
            {/* <Button onClick={() => modifyChargeur()} variant="contained">
              Sauvegarder
            </Button> */}
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
              content={() => componentToPrintRef.current}
              suppressErrors
              onAfterPrint={() => printFacture()}
            />
          </ListItemIcon>
          <ReactToPrint
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            trigger={() => (
              <ListItemText primary="Note de Débit" primaryTypographyProps={{ variant: 'body2' }} />
            )}
            content={() => componentToPrintRef.current}
            suppressErrors
            onAfterPrint={() => printFacture()}
          />
          <ComponentToPrint
            ref={componentToPrintRef}
            client={dataPrint.pol}
            agence={dataPrint.agence}
            port={dataPrint.pod}
            vessel={dataPrint.vessel}
            send={dataPrint.serie}
            lettre={dataPrint.lettre}
            blNumb={dataPrint.serie}
            total={dataPrint.total}
            tva={dataPrint.tva}
            tvadgrkc={dataPrint.tvadgrkc}
            dates={dataPrint.dates}
            qteAuthentificationConnaissement={dataPrint.qteauthentificationconnaissement}
            dollarTaux={dataPrint.dollar_taux}
            rows={[
              {
                number: 0,
                description: 'Authentification Connaissement',
                weight: dataPrint.qteauthentificationconnaissement,
                price: dataPrint.dollar_taux * 60
              },
              {
                number: 1,
                description: 'Conventionnel < 50 T',
                weight: dataPrint.qteconventionnel50tconsignation,
                price: dataPrint.dollar_taux * 5 * dataPrint.qteconventionnel50tconsignation
              },
              {
                number: 2,
                description: 'Conventionnel > 50 T < 500 T',
                weight: dataPrint.qteconventionnelmilieuconsignation,
                price: dataPrint.dollar_taux * 5 * dataPrint.qteconventionnelmilieuconsignation
              },
              {
                number: 3,
                description: 'Convention => 500 T',
                weight: dataPrint.qteconventionnel500tconsignation,
                price: dataPrint.dollar_taux * 5 * dataPrint.qteconventionnel500tconsignation
              },
              {
                number: 4,
                description: 'Véhicule (Frais Traitement Consignation)',
                weight: dataPrint.qtevehiculeconsignation,
                price: dataPrint.dollar_taux * 65 * dataPrint.qtevehiculeconsignation
              },
              {
                number: 5,
                description: "Conteneur 20' (Frais Traitement Consignation)",
                weight: dataPrint.qteconteneur20consignation,
                price: dataPrint.dollar_taux * 110 * dataPrint.qteconteneur20consignation
              },
              {
                number: 6,
                description: "Conteneur 40' (Frais Traitement Consignation)",
                weight: dataPrint.qteconteneur40consignation,
                price: dataPrint.dollar_taux * 220 * dataPrint.qteconteneur40consignation
              },
              {
                number: 7,
                description: "Conteneur 20' (Frais Tracking Structurel)",
                weight: dataPrint.qteconteneur20tracking,
                price: dataPrint.dollar_taux * 150 * dataPrint.qteconteneur20tracking
              },
              {
                number: 8,
                description: "Conteneur 40' (Frais Tracking Structurel)",
                weight: dataPrint.qteconteneur40tracking,
                price: dataPrint.dollar_taux * 300 * dataPrint.qteconteneur40tracking
              },
              {
                number: 9,
                description: "Conteneur 20' (Frais Gestion Equipement)",
                weight: dataPrint.qteconteneur20equipement,
                price: dataPrint.dollar_taux * 90 * dataPrint.qteconteneur20equipement
              },
              {
                number: 10,
                description: "Conteneur 40' (Frais Gestion Equipement)",
                weight: dataPrint.qteconteneur40equipement,
                price: dataPrint.dollar_taux * 180 * dataPrint.qteconteneur40equipement
              },
              {
                number: 11,
                description: 'Frais Correction Manifeste',
                weight: dataPrint.qtefraiscorrectionmanifesteequipement,
                price: dataPrint.dollar_taux * 25 * dataPrint.qtefraiscorrectionmanifesteequipement
              },
              {
                number: 12,
                description: 'Frais Lettre Garantie Simple',
                weight: dataPrint.qtefraislettregarantiesimpleequipement,
                price: dataPrint.dollar_taux * 50 * dataPrint.qtefraislettregarantiesimpleequipement
              },
              {
                number: 13,
                description: 'Conventionnel (Redevance De Navigation)',
                weight: dataPrint.qteconventionnelnavigation,
                price: dataPrint.euro_taux * 5 * dataPrint.qteconventionnelnavigation
              },
              {
                number: 14,
                description: 'Vehicule (Redevance De Navigation)',
                weight: dataPrint.qtevehiculenavigation,
                price: dataPrint.euro_taux * 60 * dataPrint.qtevehiculenavigation
              },
              {
                number: 15,
                description: "Conteneur 20' (Redevance De Navigation)",
                weight: dataPrint.qteconteneur20navigation,
                price: dataPrint.euro_taux * 70 * dataPrint.qteconteneur20navigation
              },
              {
                number: 16,
                description: "Conteneur 40' (Redevance De Navigation)",
                weight: dataPrint.qteconteneur40navigation,
                price: dataPrint.euro_taux * 140 * dataPrint.qteconteneur40navigation
              }
            ]}
            // consignee={dataPrint.consignee}
            // portl={dataPrint.portl}
            // pod={dataPrint.portd}
            // feri={dataPrint.feri}
            // serie={dataPrint.serie}
            // freight={dataPrint.freight}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'blue' }} onClick={() => handleOpen()}>
          <ListItemIcon>
            <Icon icon={editOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Modifier" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'red' }} onClick={() => deleteHistoric()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Effacer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
