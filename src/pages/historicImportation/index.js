import { filter } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// material
import {
  Box,
  Button,
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';

// Modal Importations
import { makeStyles } from '@material-ui/styles';

import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';
import {
  HistoricImportationListToolbar,
  HistoricImportationMoreMenu
} from '../../components/_dashboard/historicImportation';
import { CheckUserAuth } from '../../utils/auth';

import './Historic.css';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'serie', label: 'Numéro Série', alignRight: false },
  { id: 'agence', label: 'Agence', alignRight: false },
  { id: 'envoi', label: 'Envoi', alignRight: false },
  { id: 'pol', label: 'Client', alignRight: false },
  { id: 'pod', label: 'Port Dechargement', alignRight: false },
  { id: 'vessel', label: 'Vessel', alignRight: false },
  { id: 'numeroFiche', label: 'Numéro Fiche', alignRight: false },
  { id: 'dollarTaux', label: 'Taux Dollar', alignRight: false },
  { id: 'euroTaux', label: 'Taux Euro', alignRight: false },
  {
    id: 'qteAuthentificationConnaissement',
    label: 'Qté Authentification Connaissement',
    alignRight: false
  },
  {
    id: 'qteConventionnel50tCconsignation',
    label: 'Qté Conventionnel 50T Consignation',
    alignRight: false
  },
  {
    id: 'qteConventionnelMilieuConsignation',
    label: 'Qté Conventionnel Milieu Consignation',
    alignRight: false
  },
  {
    id: 'qteConventionnel500tConsignation',
    label: 'Qté Conventionnel 500T Consignation',
    alignRight: false
  },
  { id: 'qteVehiculeConsignation', label: 'Qté Vehicule Consignation', alignRight: false },
  { id: 'qteConteneur20Consignation', label: 'Qté Conteneur 20 Consignation', alignRight: false },
  { id: 'qteConteneur40Consignation', label: 'Qté Conteneur 40 Consignation', alignRight: false },
  { id: 'qteConteneur20Tracking', label: 'Qté Conteneur 20 Tracking', alignRight: false },
  { id: 'qteConteneur40Tracking', label: 'Qté Conteneur 40 Tracking', alignRight: false },
  { id: 'qteConteneur20Equipement', label: 'Qté Conteneur 20 Equipement', alignRight: false },
  { id: 'qteConteneur40Equipement', label: 'Qté Conteneur 40 Equipement', alignRight: false },
  {
    id: 'qteFraisCorrectionManifesteEquipement',
    label: 'Qté Frais Correction Manifeste Equipement',
    alignRight: false
  },
  {
    id: 'qteFraisLettreGarantieSimpleEquipement',
    label: 'Qté Frais Lettre Garantie Simple Equipement',
    alignRight: false
  },
  { id: 'qteConventionnelNavigation', label: 'Qté Conventionnel Navigation', alignRight: false },
  { id: 'qteVehiculeNavigation', label: 'Qté Vehicule Navigation', alignRight: false },
  { id: 'qteConteneur20Navigation', label: 'Qté Conteneur 20 Navigation', alignRight: false },
  { id: 'qteConteneur40Navigation', label: 'Qté Conteneur 40 Navigation', alignRight: false },
  { id: 'tva', label: 'TVA', alignRight: false },
  { id: 'tvaDgrkc', label: 'TVA DGRKC', alignRight: false },
  { id: 'total', label: 'Total', alignRight: false },
  { id: 'user', label: 'Insérer par', alignRight: false },
  { id: 'dates', label: 'Date', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  // if (query) {
  //   return filter(array, (_user) => _user.pol.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  // }
  if (query.filterName || query.filterStartDate || query.filterEndDate) {
    let dataFiltered = null;

    if (query.filterName) {
      dataFiltered = filter(
        array,
        (_user) => _user.pol.toLowerCase().indexOf(query.filterName.toLowerCase()) !== -1
      );
    }
    if (query.filterStartDate) {
      const finalData = dataFiltered || array;
      dataFiltered = filter(
        finalData,
        (_user) => _user.dates.toLowerCase() >= query.filterStartDate.toLowerCase()
      );
    }
    if (query.filterEndDate) {
      const finalData = dataFiltered || array;
      dataFiltered = filter(
        finalData,
        (_user) => _user.dates.toLowerCase() <= query.filterEndDate.toLowerCase()
        // (_user) =>
        //   new Date(query.filterEndDate).getTime() >= new Date(_user.createdAt).get.getTime()
      );
    }
    return dataFiltered;
  }
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [orderBy, setOrderBy] = useState('dates');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [historic, setHistoric] = useState([]);
  const componentRef = useRef();

  const [dataChange, setDataChange] = useState(false);

  const isDataChange = () => {
    if (dataChange) {
      setDataChange(false);
    } else {
      setDataChange(true);
    }
  };

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/historic2/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setHistoric(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/historic2/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setHistoric(value.data);
      })
      .catch(() => {});
  }, [dataChange]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = historic.map((n) => n.pol);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, pol) => {
    const selectedIndex = selected.indexOf(pol);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, pol);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterStartDate = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDate = (event) => {
    setFilterEndDate(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historic.length) : 0;

  const filteredHistoric = applySortFilter(historic, getComparator(order, orderBy), {
    filterName,
    filterStartDate,
    filterEndDate
  });

  const isUserNotFound = filteredHistoric.length === 0;

  return (
    <Page title="Historique | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Historique
          </Typography>
        </Stack>

        <CheckUserAuth />

        <Card>
          <HistoricImportationListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterStartDate={handleFilterStartDate}
            onFilterEndDate={handleFilterEndDate}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={historic.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredHistoric
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        agence,
                        serie,
                        envoi,
                        pol,
                        pod,
                        vessel,
                        tva,
                        tvadgrkc,
                        total,
                        user,
                        qteauthentificationconnaissement,
                        dates
                      } = row;

                      const numeroFiche = row.numero_fiche;
                      const dollarTaux = row.dollar_taux;
                      const euroTaux = row.euro_taux;
                      // const tvaDgrkc = row.tva_dgrkc;
                      // const qteAuthentificationConnaissement = row.qteauthentificationconnaissement;
                      const qteConventionnel50tCconsignation = row.qteconventionnel50tconsignation;
                      const qteConventionnelMilieuConsignation =
                        row.qteconventionnelmilieuconsignation;
                      const qteConventionnel500tConsignation = row.qteconventionnel500tconsignation;
                      const qteVehiculeConsignation = row.qtevehiculeconsignation;
                      const qteConteneur20Consignation = row.qteconteneur20consignation;
                      const qteConteneur40Consignation = row.qteconteneur40consignation;
                      const qteConteneur20Tracking = row.qteconteneur20tracking;
                      const qteConteneur40Tracking = row.qteconteneur40tracking;
                      const qteConteneur20Equipement = row.qteconteneur20equipement;
                      const qteConteneur40Equipement = row.qteconteneur40equipement;
                      const qteFraisCorrectionManifesteEquipement =
                        row.qtefraiscorrectionmanifesteequipement;
                      const qteFraisLettreGarantieSimpleEquipement =
                        row.qtefraislettregarantiesimpleequipement;
                      const qteConventionnelNavigation = row.qteconventionnelnavigation;
                      const qteVehiculeNavigation = row.qtevehiculenavigation;
                      const qteConteneur20Navigation = row.qteconteneur20navigation;
                      const qteConteneur40Navigation = row.qteconteneur40navigation;

                      const isItemSelected = selected.indexOf(pol) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, pol)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {serie}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {agence}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {envoi}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {pol}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {pod}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {vessel}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {numeroFiche}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {dollarTaux}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {euroTaux}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteauthentificationconnaissement}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConventionnel50tCconsignation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConventionnelMilieuConsignation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConventionnel500tConsignation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteVehiculeConsignation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConteneur20Consignation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConteneur40Consignation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConteneur20Tracking}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConteneur40Tracking}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConteneur20Equipement}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConteneur40Equipement}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteFraisCorrectionManifesteEquipement}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteFraisLettreGarantieSimpleEquipement}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConventionnelNavigation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteVehiculeNavigation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConteneur20Navigation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {qteConteneur40Navigation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {tva}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {tvadgrkc}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {total}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {user}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {dates}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="right">
                            <HistoricImportationMoreMenu
                              idHistoric={id}
                              sendInformation={(value) => isDataChange(value)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={historic.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        {historic.length > 0 ? (
          <Card className="card-botton-wrapper-2">
            <Box className="box-botton-wrapper" />
            <div>
              <ReactToPrint
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                trigger={() => (
                  <Button variant="contained" color="primary">
                    Imprimer
                  </Button>
                )}
                content={() => componentRef.current}
                suppressErrors
              />
              <ComponentToPrint ref={componentRef} rows={filteredHistoric} />
            </div>
          </Card>
        ) : null}
      </Container>
    </Page>
  );
}
