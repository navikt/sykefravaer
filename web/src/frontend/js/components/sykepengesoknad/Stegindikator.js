import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const Stegindikator = ({ aktivtSteg, sykepengesoknad }) => {
    const steg = [1, 2, 3];
    const urler = ['fravaer-og-friskmelding', 'aktiviteter-i-sykmeldingsperioden', '']
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
                                return (<Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/${urler[index]}`}>
                                    <img src={`${window.APP_SETTINGS.APP_ROOT}/img/nav-frontend-grafikk/grafikk/stegindikator__hake.svg`} alt="Hake" className="stegindikator__hake" />
                                    <img src={`${window.APP_SETTINGS.APP_ROOT}/img/nav-frontend-grafikk/grafikk/stegindikator__hake--hover.svg`} alt="Hake" className="stegindikator__hake--hover" />
                                </Link>);
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
    sykepengesoknad: sykepengesoknadPt,
    aktivtSteg: PropTypes.string,
};

export default Stegindikator;
