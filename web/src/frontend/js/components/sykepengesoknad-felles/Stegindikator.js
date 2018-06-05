import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const arbeidstakerUrler = ['', 'fravaer-og-friskmelding', 'aktiviteter-i-sykmeldingsperioden', ''];
export const frilanserOgSelvstendigUrler = ['', 'fravaer-og-friskmelding', 'aktiviteter-i-sykmeldingsperioden', ''];

const Stegindikator = ({ aktivtSteg, soknadId, urler = arbeidstakerUrler }) => {
    const steg = [1, 2, 3, 4];
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
                                return (<Link to={`/sykefravaer/soknader/${soknadId}/${urler[index]}`}>
                                    <img
                                        src={`${window.APP_SETTINGS.APP_ROOT}/img/nav-frontend-grafikk/grafikk/stegindikator__hake.svg`}
                                        alt="Hake"
                                        className="stegindikator__hake" />
                                    <img
                                        src={`${window.APP_SETTINGS.APP_ROOT}/img/nav-frontend-grafikk/grafikk/stegindikator__hake--hover.svg`}
                                        alt="Hake"
                                        className="stegindikator__hake--hover" />
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
    soknadId: PropTypes.string,
    aktivtSteg: PropTypes.string,
    urler: PropTypes.arrayOf(PropTypes.string),
};

export default Stegindikator;
