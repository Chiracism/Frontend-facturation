import React from 'react';
import './Importation.css';

class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString()
      // const current = new Date()
      // const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`
    };
  }

  render() {
    const {
      rows,
      serieTabP,
      clientdabP,
      blnumberdabP,
      addressdabP,
      consigneedabP,
      consigneeaddressdabP,
      feridabP,
      vesselddabP,
      portldabP,
      portddabP,
      descriptiondabP,
      quantitydabP,
      unitdabP,
      pricedabP,
      totaldabP,
      freightdabP
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
        <h2 className="print-source" style={{ textAlign: 'center' }}>
          COPIE
        </h2>
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          BON A DELIVRER N° ....../20
        </h3>
        <p className="print-source" style={{ textAlign: 'right', margin: '2rem 1rem 3rem 0' }}>
          <strong>EN FAVEUR DE</strong> : <span>{consigneedabP}</span> P/C TO THE ORDER OF{' '}
          <span>{clientdabP}</span>
          <br />
          <strong>M/V</strong> : <span>{vesselddabP}</span>
          <br />
          <strong>A MATADI LE</strong> : <span>{}</span>
          <br />
          <strong>B/L N°</strong> : <span>{serieTabP}</span>
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
                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    {/* <td>{number}</td>
                    <td>{description}</td>
                    <td>{weight}</td>
                    <td>{price}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className="print-source"
          style={{
            position: 'absolute',
            bottom: '15%',
            right: 0,
            textAlign: 'right',
            margin: '3rem 1rem 3rem 0'
          }}
        >
          <p>
            <strong>TVA</strong> : {} FC
          </p>
          <p>
            <strong>TAXE KONGO CENTRAL</strong> : {} FC
          </p>
          <p>
            <strong>Montant Net</strong> : {} FC
          </p>
          <p>
            <strong>Date</strong> : {}
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

export default ComponentToPrint;
