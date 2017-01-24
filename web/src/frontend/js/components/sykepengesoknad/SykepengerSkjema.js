import React, { PropTypes } from 'react';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Sidetopp from '../Sidetopp';
import Avkrysset from './Oppsummering/opplysninger';

const Stegindikator = ({ aktivtSteg }) => {
    const steg = [1, 2, 3];
    return (<div className="blokk--l" role="progressbar" aria-valuenow={aktivtSteg} aria-valuemin="1" aria-valuemax="3">
        <ul className="stegindikator">
            {steg.map((s, index) => {
                let className;
                let erPassert = false;
                if (parseFloat(aktivtSteg) === s) {
                    className = 'stegindikator__steg--aktiv';
                } else if (parseFloat(aktivtSteg) > s) {
                    className = 'stegindikator__steg--passert';
                    erPassert = true;
                } else {
                    className = 'stegindikator__steg--inaktiv';
                }
                className = `stegindikator__steg ${className}`;
                return (<li key={index} className={className}>
                    {
                        (() => {
                            if (erPassert) {
                                return <img src="/img/sykepenger/stegindikator__hake.svg" alt="Hake" />;
                            }
                            return s;
                        })()
                    }
                </li>);
            })}
        </ul>
    </div>);
};

Stegindikator.propTypes = {
    aktivtSteg: PropTypes.string,
};

const SykepengerSkjema = ({ children, aktivtSteg, tittel, visBekreftelse = false, apentUtdrag = false }) => {
    return (<div>
        <Sidetopp tittel="Søknad om sykepenger" />
        {
            aktivtSteg && <Stegindikator aktivtSteg={aktivtSteg} />
        }
        {
            visBekreftelse && <div className="blokk">
            <Avkrysset tekst="Jeg er klar over at dersom jeg gir uriktige opplysninger eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar." />
          </div>
        }
        <div className="blokk">
          <SykmeldingUtdrag erApen={apentUtdrag} />
        </div>
        { tittel && <h2 className="sykepenger__stegtittel">{tittel}</h2> }
        {children}
    </div>);
};

SykepengerSkjema.propTypes = {
    children: PropTypes.element.isRequired,
    aktivtSteg: PropTypes.string.isRequired,
    tittel: PropTypes.string,
    visBekreftelse: PropTypes.bool,
    apentUtdrag: PropTypes.bool,
};

export default SykepengerSkjema;
