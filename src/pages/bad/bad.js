import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// Material UI Component
import { Card, Stack, Container, Typography, Autocomplete } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

import './Importation.css';
import { numberValidation } from '../../utils/validate';

// components
import Page from '../../components/Page';
import { CheckUserAuth } from '../../utils/auth';

// ----------------------------------------------------------------------

export default function Bad() {
  const componentRef = useRef();
  const [user, setUser] = useState(null);
  const [blNumb, setBlNumb] = useState('');
  const [fileNumb, setFileNumb] = useState('');
  const [send, setSend] = useState('');

  function disabledPrint() {
    if (serieTab.id !== '' && serieTab.id !== null) return false;
    return true;
  }

  // Print Facture
  function printFacture() {
    console.log('port : ', port);
    console.log('user : ', user.name);

    const current = new Date();
    // const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bad/`,
        {
          seriedab: fileNumb,
          blnumber: blnumberdab,
          client: clientdab,
          address: addressdab,
          consignee: consigneedab,
          consigneeAddress: consigneeAddressdab,
          vesseld: vesselddab,
          portl: portldab,
          portd: portddab,
          feri: feridab,
          description: descriptiondab,
          quantity: quantitydab,
          freight: freightdab,
          unit: unitdab,
          price: pricedab,
          total: totaldab,
          user: user.name,
          date: new Date()
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }
        }
      )
      .then(() => {})
      .catch(() => {});
  }

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/historic/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setSerieTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Port
   */
  const [portTab, setPortTab] = useState([]);
  const [port, setPort] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/pol/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setPortTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Beach
   */
  const [serieTab, setSerieTab] = useState([]);
  const [clientdab, setClientdab] = useState(null);
  const [blnumberdab, setBlNumberdab] = useState(null);
  const [addressdab, setAddressdab] = useState(null);
  const [consigneedab, setConsigneedab] = useState(null);
  const [consigneeAddressdab, setConsigneeAddressdab] = useState(null);
  const [feridab, setFeridab] = useState('');
  const [vesselddab, setVesselddab] = useState(null);
  const [portldab, setPortldab] = useState(null);
  const [portddab, setPortddab] = useState(null);
  const [datesdab, setDatesdab] = useState(null);
  const [descriptiondab, setDescriptiondab] = useState(null);
  const [quantitydab, setQuantitydab] = useState(null);
  const [unitdab, setUnitdab] = useState(null);
  const [pricedab, setPricedab] = useState(null);
  const [totaldab, setTotaldab] = useState(null);
  const [datedab, setDatedab] = useState(null);
  const [solde, setSoldedab] = useState(null);
  const [freightdab, setFreightdab] = useState('Payé');

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/historic/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setSerieTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  useEffect(() => {
    // Get User Auth
    const tokenData = localStorage.getItem('lmc_token');

    if (tokenData) {
      const user = jwt.verify(JSON.parse(tokenData), process.env.REACT_APP_JWT_KEY);

      setUser(user);
    }
  }, []);

  function renderText(number) {
    if (number === 1) {
      return 'CONVENTIONNEL < 50 T :';
    }

    if (number === 2) {
      return 'CONVENTIONNEL > 50 T < 500 T :';
    }

    if (number === 3) {
      return '16%';
    }

    if (number === 4) {
      return '10%';
    }

    return '';
  }

  return (
    <Page title="BAD | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bon à délivrer
          </Typography>
        </Stack>

        <CheckUserAuth />
        <Card className="card-wrapper">
          <Box className="box-wrapper">
            <div className="input-label-wrapper">
              B/L N°:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={serieTab}
                value={serieTab.id}
                onChange={(event, newType) => {
                  if (newType) {
                    setClientdab(newType.client);
                    setAddressdab(newType.address);
                    setConsigneedab(newType.consignee);
                    setConsigneeAddressdab(newType.consigneeAddress);
                    setVesselddab(newType.vesseld);
                    setPortldab(newType.portl);
                    setPortddab(newType.portd);
                    setDescriptiondab(newType.description);
                    setFeridab(newType.feri);
                    setQuantitydab(newType.quantity);
                    setUnitdab(newType.unit);
                    setPricedab(newType.price);
                    setTotaldab(newType.total);
                    setFreightdab(newType.freight);
                    setSoldedab(newType.solde);
                    // setUserdab(newType.user.name);
                  } else {
                    setClientdab(null);
                    setAddressdab(null);
                    setConsigneedab(null);
                    setConsigneeAddressdab(null);
                    setVesselddab(null);
                    setPortldab(null);
                    setPortddab(null);
                    setDescriptiondab(null);
                    setFeridab(null);
                    setQuantitydab(null);
                    setUnitdab(null);
                    setPricedab(null);
                    setTotaldab(null);
                    setFreightdab(null);
                    // setUserdab(null);
                  }
                }}
                getOptionLabel={(option) => option.serie}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sélectionner le numéro de connaissement ou B/L"
                    variant="outlined"
                  />
                )}
              />
            </div>
            {/* <div className="input-label-wrapper">
              Envoi :{' '}
              <TextField
                className="basic-input"
                label="Saisissez ce champ"
                variant="outlined"
                value={send}
                onChange={(e) => setSend(e.target.value)}
              />
            </div> */}
          </Box>
        </Card>
        <Card className="card-wrapper">
          <Box className="box-wrapper">
            <div className="input-label-wrapper">
              Client :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={clientdab}
                onChange={(e) => setClientdab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Adresse :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={addressdab}
                onChange={(e) => setAddressdab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Vessel :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={vesselddab}
                onChange={(e) => setVesselddab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Féri N°:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={feridab}
                onChange={(e) => setFeridab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Description :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={descriptiondab}
                onChange={(e) => setDescriptiondab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Montant :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={pricedab}
                onChange={(e) => setPricedab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Total :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={totaldab}
                onChange={(e) => setTotaldab(e.target.value)}
              />
            </div>
            {/* <div className="input-label-wrapper">
              Freight :{' '}
              <TextField
                className="basic-input"
                label="Saisissez ce champ"
                variant="outlined"
                value={freight}
                onChange={(e) => setFreight(e.target.value)}
              />
            </div> */}
          </Box>
          <Box className="box-wrapper">
            <div className="input-label-wrapper">
              Consignée :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={consigneedab}
                onChange={(e) => setConsigneedab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Adresse :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={consigneeAddressdab}
                onChange={(e) => setConsigneeAddressdab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Port Charg.:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={portldab}
                onChange={(e) => setPortldab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Port Décharg.:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={portddab}
                onChange={(e) => setPortddab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Quantité :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={quantitydab}
                onChange={(e) => setQuantitydab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Unité :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={unitdab}
                onChange={(e) => setUnitdab(e.target.value)}
              />
            </div>
            <div className="input-label-wrapper">
              Freight :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={freightdab}
                onChange={(e) => setFreightdab(e.target.value)}
              />
            </div>
            {/* <div className="input-label-wrapper">
              Validé par :{' '}
              <TextField
                className="basic-input"
                // label="Saisissez ce champ"
                disabled="true"
                variant="outlined"
                value={user}
                onChange={(e) => setUserdab(e.target.value)}
              />
            </div> */}
          </Box>
        </Card>

        <Card className="card-botton-2-wrapper">
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" color="primary" disabled={disabledPrint()}>
                Imprimer
              </Button>
            )}
            content={() => componentRef.current}
            suppressErrors
            onAfterPrint={() => printFacture()}
          />
          <ComponentToPrint
            ref={componentRef}
            serieTabP={serieTab}
            clientdabP={clientdab}
            blnumberdabP={blnumberdab}
            addressdabP={addressdab}
            consigneedabP={consigneedab}
            consigneeAddressdabP={consigneeAddressdab}
            feridabP={feridab}
            vesselddabP={vesselddab}
            portldabP={portldab}
            portddabP={portddab}
            datesdabP={datesdab}
            descriptiondabP={descriptiondab}
            quantitydabP={quantitydab}
            unitdabP={unitdab}
            pricedabP={pricedab}
            totaldabP={totaldab}
            freightdabP={freightdab}
            rows={[]}
          />
        </Card>
      </Container>
    </Page>
  );
}
