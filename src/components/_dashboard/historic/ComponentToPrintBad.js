import React from 'react';
import './Exportation.css';

class ComponentToPrintBad extends React.PureComponent {
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
      address,
      total,
      consignee,
      consigneeAddress,
      vessel,
      portl,
      portd,
      serie,
      feri,
      freight
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
            src="/static/LogoDIRPROVKC.jpg"
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
            <p style={{ fontWeight: 700, fontSize: '22px' }}>République Démocratique du Congo</p>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>LIGNES MARITIMES CONGOLAISES, SA</p>
            <p style={{ fontWeight: 600, fontSize: '22px' }}>Armement National</p>
            <hr style={{ opacity: 1, color: 'blue', backgroundColor: 'blue', height: '3px' }} />
          </div> */}
        </div>
        <p className="print-source" style={{ textAlign: 'right', margin: '0rem 1rem 1rem 4.5rem' }}>
          <span>{/* <strong>{serie}</strong> */}</span>
        </p>
        <h1 className="print-source" style={{ textAlign: 'center' }}>
          BON A DELIVRER N°...../20...
        </h1>
        {/* <h1 className="print-source" style={{ textAlign: 'center' }}>
          COPIE
        </h1> */}
        {/* <h3 className="print-source" style={{ textAlign: 'center' }}>
          BON A DELIVRER N°
        </h3> */}
        {/* <p className="print-source" style={{ textAlign: 'left', margin: '3rem 1rem 0rem 1rem' }}>
          <strong>Client</strong> : <span>{client}</span>
        </p> */}
        {/* <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 1rem 4.5rem' }}>
          <span>{address}</span>
        </p> */}
        <br />
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '2rem 1rem 0rem 7rem' }}>
          <strong>EN FAVEUR DE</strong> : <span>{consignee}</span> <strong>P/C TO THE </strong>
          <span>{client}</span>
        </p>
        {/* <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 6.8rem' }}>
          <span>{consigneeAddress}</span>
        </p> */}
        <p className="print-source" style={{ textAlign: 'left', margin: '1rem 1rem 0rem 7rem' }}>
          <strong>M/V</strong> : <span>{vessel}</span>
        </p>
        <p className="print-source" style={{ textAlign: 'left', margin: '1rem 1rem 0rem 7rem' }}>
          <strong>B/L N°</strong> : <span>{serie}</span>
        </p>
        <div
          className="print-source"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1rem 1rem 3rem 7rem'
          }}
        >
          <p>
            <strong>Port de chargement</strong> : <span>{portl}</span>
          </p>
          <p style={{ flexGrow: 0.5 }}>
            <strong>Port de dechargement</strong> : <span>{portd}</span>
          </p>
        </div>
        <div
          className="print-source"
          style={{
            marginTop: '2rem',
            width: '100%'
          }}
        >
          <table className="print-source" style={{ width: '100%' }}>
            <thead>
              <th>DESCRIPTION</th>
              <th>QUANTITE</th>
              <th>UNITE PAYANTE</th>
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                const { description, quantity, unit } = value;
                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    <td>{description}</td>
                    <td>{quantity}</td>
                    <td>{unit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className="print-source"
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            width: '100%'
          }}
        >
          <span style={{ fontWeight: 'bold' }}>FERI N° : </span>
          {feri}
        </div>
        <div
          className="print-source"
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            width: '100%'
          }}
        >
          <span style={{ fontWeight: 'bold' }}>FREIGT : </span>
          {freight}
        </div>
        <div
          className="print-source"
          style={{
            marginTop: '4rem',
            textAlign: 'center',
            width: '100%'
          }}
        >
          <span style={{ fontWeight: 'bold' }}>DESTINATION CONTENEUR(S)</span>
          {}
          <br />
          <br />
          <h3 className="print-source" style={{ textAlign: 'center' }}>
            .................................................................
          </h3>
          <p className="print-source" style={{ textAlign: 'left', margin: '3rem 1rem 2rem 7rem' }}>
            Ce Bon à délivrer contre présentation de l'original du connaisssement ou tout document
            valant connaissement original. L'Armateur ne peut en aucun cas être tenu responsable des
            frais sous réserve de la bonne arrivée du navire.
          </p>
        </div>
        <div>
          <p
            className="print-source"
            style={{
              position: 'absolute',
              bottom: '20%',
              right: 0,
              textAlign: 'right',
              margin: '15rem 1rem 2rem 1rem'
            }}
          >
            <strong>Date</strong> : {date}
          </p>
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
          {/* <p
            className="print-source"
            style={{ textAlign: 'left', bottom: '15%', margin: '12rem 1rem 2rem 5rem' }}
          >
            <strong>Sous-directeur des Opérations</strong>
          </p> */}
          {/* <p
            className="print-source"
            style={{
              flexGrow: 0.5,
              textAlign: 'right',
              bottom: '20%',
              margin: '1rem 1rem 2rem 5rem'
            }}
          >
            <strong>Directeur Provincial</strong>
          </p> */}
        </div>
        {/* <div
          className="print-source"
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '10%',
            justifyContent: 'space-between',
            margin: '1rem 5rem 3rem 7rem'
          }}
        >
          <p>
            <strong>Sous-directeur des Opérations</strong>
            <span>{}</span>
          </p>
          <p style={{ flexGrow: 0.5 }}>
            <strong>Directeur Provincial</strong> <span>{}</span>
          </p>
        </div> */}
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

export default ComponentToPrintBad;
