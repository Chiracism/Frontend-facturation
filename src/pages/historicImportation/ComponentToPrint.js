import React from 'react';
import './Historic.css';

class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString()
    };
  }

  render() {
    const { rows } = this.props;
    const { date } = this.state;

    return (
      <div>
        <div
          className="print-source"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'center'
          }}
        >
          <img
            className="print-source"
            src="/static/logoLMC.png"
            alt="Logo"
            justifyContent="center"
            position="center"
            alignItems="center"
            style={{ width: 350, height: 150, justifyContent: 'center', position: 'center' }}
          />
          <img
            className="print-source"
            src="/static/filigrane.png"
            alt="Logo"
            style={{
              position: 'absolute',
              zIndex: -1,
              opacity: 0.1,
              left: 75,
              top: 250,
              width: 600,
              height: 600
            }}
          />
          {/* <div className="print-source" style={{ textAlign: 'center', color: 'blue', flexGrow: 1 }}>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>Republique Démocratique du Congo</p>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>LIGNES MARITIMES CONGOLAISES, SA</p>
            <p style={{ fontWeight: 600, fontSize: '22px' }}>Armement National</p>
            <hr style={{ opacity: 1, color: 'blue', backgroundColor: 'blue', height: '3px' }} />
          </div> */}
        </div>
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          HISTORIQUE DES OPERATIONS DE FACTURATION
        </h3>
        <div
          className="print-source"
          style={{
            display: 'block',
            marginTop: '2rem',
            marginBottom: '2rem',
            width: '100%'
          }}
        >
          <table className="print-source" style={{ width: '100%', marginBottom: '2rem' }}>
            <thead>
              <th>Série</th>
              <th>Agence</th>
              <th>Envoi</th>
              <th>Port Chargement</th>
              <th>Port Dechargement</th>
              <th>Vessel</th>
              <th>Qté Authentification Connaissement</th>
              <th>Qté Conventionnel 50T Consignation</th>
              <th>Qté Conventionnel Milieu Consignation</th>
              <th>Qté Conventionnel 500T Consignation</th>
              <th>Qté Vehicule Consignation</th>
              <th>Qté Conteneur 20 Consignation</th>
              <th>Qté Conteneur 40 Consignation</th>
              <th>Qté Conteneur 20 Tracking</th>
              <th>Qté Conteneur 40 Tracking</th>
              <th>Qté Conteneur 20 Equipement</th>
              <th>Qté Conteneur 40 Equipement</th>
              <th>Qté Frais Correction Manifeste Equipement</th>
              <th>Qté Frais Lettre Garantie Simple Equipement</th>
              <th>Qté Conventionnel Navigation</th>
              <th>Qté Vehicule Navigation</th>
              <th>Qté Conteneur 20 Navigation</th>
              <th>Qté Conteneur 40 Equipement</th>
              <th>Qté Conteneur 40 Navigation</th>
              <th>Numéro Fiche</th>
              <th>Taux Dollar</th>
              <th>Taux Euro</th>
              <th>TVA</th>
              <th>TVA DGRKC</th>
              <th>Date</th>
              <th>Total</th>
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                const { serie, agence, envoi, pol, pod, vessel, tva, total, dates } = value;

                const numeroFiche = value.numero_fiche;
                const dollarTaux = value.dollar_taux;
                const euroTaux = value.euro_taux;
                const tvaDgrkc = value.tvadgrkc;
                const qteAuthentificationConnaissement = value.qteauthentificationconnaissement;
                const qteConventionnel50tCconsignation = value.qteconventionnel50tconsignation;
                const qteConventionnelMilieuConsignation = value.qteconventionnelmilieuconsignation;
                const qteConventionnel500tConsignation = value.qteconventionnel500tconsignation;
                const qteVehiculeConsignation = value.qtevehiculeconsignation;
                const qteConteneur20Consignation = value.qteconteneur20consignation;
                const qteConteneur40Consignation = value.qteconteneur40consignation;
                const qteConteneur20Tracking = value.qteconteneur20tracking;
                const qteConteneur40Tracking = value.qteconteneur40tracking;
                const qteConteneur20Equipement = value.qteconteneur20equipement;
                const qteConteneur40Equipement = value.qteconteneur40equipement;
                const qteFraisCorrectionManifesteEquipement =
                  value.qtefraiscorrectionmanifesteequipement;
                const qteFraisLettreGarantieSimpleEquipement =
                  value.qtefraislettregarantiesimpleequipement;
                const qteConventionnelNavigation = value.qteconventionnelnavigation;
                const qteVehiculeNavigation = value.qtevehiculenavigation;
                const qteConteneur20Navigation = value.qteconteneur20navigation;
                const qteConteneur40Navigation = value.qteconteneur40navigation;

                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    <td>{serie}</td>
                    <td>{agence}</td>
                    <td>{envoi}</td>
                    <td>{pol}</td>
                    <td>{pod}</td>
                    <td>{vessel}</td>
                    <td>{qteAuthentificationConnaissement}</td>
                    <td>{qteConventionnel50tCconsignation}</td>
                    <td>{qteConventionnelMilieuConsignation}</td>
                    <td>{qteConventionnel500tConsignation}</td>
                    <td>{qteVehiculeConsignation}</td>
                    <td>{qteConteneur20Consignation}</td>
                    <td>{qteConteneur40Consignation}</td>
                    <td>{qteConteneur20Tracking}</td>
                    <td>{qteConteneur40Tracking}</td>
                    <td>{qteConteneur20Equipement}</td>
                    <td>{qteConteneur40Equipement}</td>
                    <td>{qteFraisCorrectionManifesteEquipement}</td>
                    <td>{qteFraisLettreGarantieSimpleEquipement}</td>
                    <td>{qteConventionnelNavigation}</td>
                    <td>{qteVehiculeNavigation}</td>
                    <td>{qteConteneur20Navigation}</td>
                    <td>{qteConteneur40Equipement}</td>
                    <td>{qteConteneur40Navigation}</td>
                    <td>{numeroFiche}</td>
                    <td>{dollarTaux}</td>
                    <td>{euroTaux}</td>
                    <td>{tva}</td>
                    <td>{tvaDgrkc}</td>
                    <td>{dates}</td>
                    <td>{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ComponentToPrint;
