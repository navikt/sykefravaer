import React, { PropTypes } from 'react';

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
                                return <img src={`${window.APP_SETTINGS.APP_ROOT}/img/nav-frontend-grafikk/grafikk/stegindikator__hake.svg`} alt="Hake" />;
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

export default Stegindikator;
