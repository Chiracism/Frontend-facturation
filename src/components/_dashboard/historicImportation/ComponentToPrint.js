import React from 'react';
import './Importation.css';

class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString()
    };
  }

  render() {
    const {
      rows,
      client,
      total,
      tva,
      tvadgrkc,
      blNumb,
      vessel,
      port,
      dates,
      qteAuthentificationConnaissement
    } = this.props;
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
          {/* <div
            className="print-source"
            style={{ textAlign: 'center', color: 'blue', flexGrow: 0.2 }}
          >
            <p style={{ fontWeight: 700, fontSize: '22px' }}>Republique Démocratique du Congo</p>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>LIGNES MARITIMES CONGOLAISES, SA</p>
            <p style={{ fontWeight: 600, fontSize: '22px' }}>Armement National</p>
            <hr style={{ opacity: 1, color: 'blue', backgroundColor: 'blue', height: '3px' }} />
          </div> */}
        </div>
        <br />
        <h2 className="print-source" style={{ textAlign: 'center' }}>
          NOTE DE DEBIT ...../20....
        </h2>
        <p className="print-source" style={{ textAlign: 'right', margin: '2rem 1rem 3rem 0' }}>
          <strong>Client</strong> : <span>{client}</span>
          <br />
          <strong>N° BL</strong> : <span>{blNumb}</span>
          <br />
          <strong>Vessel</strong> : <span>{vessel}</span>
          <br />
          <strong>Port</strong> : <span>{port}</span>
        </p>
        <div
          className="print-source"
          style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', width: '100%' }}
        >
          <table className="print-source" style={{ width: '100%' }}>
            <thead>
              <th>N° Item</th>
              <th>Descriptions</th>
              <th>Poids/Volume</th>
              <th>Montant</th>
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                const { number, description, weight, price } = value;

                const numeroFiche = value.numero_fiche;
                const dollarTaux = value.dollar_taux;
                const euroTaux = value.euro_taux;
                const tvaDgrkc = value.tva_dgrkc;
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
                    <td>{number}</td>
                    <td>{description}</td>
                    <td>{weight}</td>
                    <td>{price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <div
          className="print-source"
          style={{
            position: 'absolute',
            bottom: '25%',
            right: 0,
            textAlign: 'right',
            margin: '3rem 1rem 3rem 0'
          }}
        >
          <p>
            <strong>TVA</strong> : {tva} FC
          </p>
          <p>
            <strong>TAXE KC</strong> : {tvadgrkc} FC
          </p>
          <p>
            <strong>Montant Net</strong> : {total} FC
          </p>
          <p>
            <strong>Date</strong> : {dates}
          </p>
        </div>
        <br />
        <br />
        <div
          className="print-source"
          style={{
            bottom: '10%',
            marginTop: '5rem',
            width: '100%',
            textAlign: 'center',
            margin: '12rem 1rem 2rem 1rem'
          }}
        >
          <table className="print-source" style={{ width: '100%' }}>
            <thead>
              <th>Sous-directeur des Opérations</th>
              {/* <th>QUANTITE</th> */}
              <th>Directeur Provincial</th>
            </thead>
          </table>
        </div>
        <div
          className="print-source"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 60,
            textAlign: 'center',
            margin: '1rem 1',
            fontSize: 10
          }}
        >
          <img className="print-source" src="/static/Basdepage.png" alt="Logo" />
          {/* {' '}
          <hr style={{ opacity: 1 }} />
          <p style={{ color: 'blue' }}>
            Société Anonyme Unipersonnelle avec conseil d'administration
          </p>
          <p style={{ color: 'blue' }}>au Capital de 16.474.900.000 CDF</p>
          <p>N°RCCM CD/RCCM/14-B-3622 - ID.NAT. : 01-715-A06030E - N°IMPOT : A0700620H</p>
          <p>
            Siège Social : Immeuble LMC - AMICONGO, 6ème étage, Avenue des Aviateurs, n°13 Place de
            la Poste,
          </p>
          <p>
            Commune de la Gombe, Courrier : <a href="mailto:info@lmc.cd">info@lmc.cd</a> Site web :{' '}
            <a href="www.lmc.cd">www.lmc.cd</a>
          </p> */}
        </div>
      </div>
    );
  }
}

export default ComponentToPrint;
