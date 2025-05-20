import React from 'react';
import './Exportation.css';

class ComponentToPrintBill extends React.PureComponent {
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
            src="/static/LogoLMC.png"
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
          <span>
            <strong>{serie}</strong>
          </span>
        </p>
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          BILL OF LANDING
        </h3>
        <p className="print-source" style={{ textAlign: 'left', margin: '3rem 1rem 0rem 1rem' }}>
          <strong>Client</strong> : <span>{client}</span>
        </p>
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 1rem 4.5rem' }}>
          <span>{address}</span>
        </p>
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          <strong>Consignée</strong> : <span>{consignee}</span>
        </p>
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 6.8rem' }}>
          <span>{consigneeAddress}</span>
        </p>
        <p className="print-source" style={{ textAlign: 'left', margin: '1rem 1rem 0rem 1rem' }}>
          <strong>Vessel</strong> : <span>{vessel}</span>
        </p>
        <div
          className="print-source"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1rem 1rem 3rem 1rem'
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
              <th>Description</th>
              <th>Quantité</th>
              <th>Unité Payante</th>
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
          <span style={{ fontWeight: 'bold' }}>FREIGHT : </span>
          {freight}
        </div>
        <div>
          <p
            className="print-source"
            style={{
              position: 'absolute',
              bottom: '15%',
              right: 0,
              textAlign: 'right',
              margin: '3rem 1rem 3rem 0'
            }}
          >
            <strong>Date</strong> : {date}
          </p>
          <p className="print-source" style={{ textAlign: 'left', margin: '3rem 1rem 2rem 7rem' }}>
            RECEIVED by the Carrier from the Shipper in apparent good order and condition "unless
            otherwise noted herein" the total number or quantity of Containers or packages or units
            indicated *. stated by the Shipper to comprise the Goods specified above, for Carriage
            subject to all the terms hereof "INCLUDING THE TERMS ON THE REVERSE HEREOF AND THE TERMS
            OF THE CARRIERS APPLICABLE TARIF" from the Place of Receip or the Port of Loading.
            whichever is applicable, In accepting this Bill of Lading the Merchant expressly accepts
            and agrees to all its terms, conditions and exceptions, whether printed, stamped or
            written, or otherwise incorporated, notwithstanding the non-signing of this Bill of
            Lading by the Merchant.
          </p>
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

export default ComponentToPrintBill;
