import PropTypes from 'prop-types';
import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import history from '../../../history';
import { soknadPt } from '../../prop-types/soknadProptype';

const StegindikatorEttSporsmalPerSide = ({ soknad, sidenummer }) => {
    const steg = soknad.sporsmal.filter((s) => {
        return s.tag !== VAER_KLAR_OVER_AT;
    });
    return (<div className="blokk--l" role="progressbar" aria-valuenow={sidenummer} aria-valuemin="1" aria-valuemax={steg.length}>
        <Stegindikator
            kompakt
            onChange={(stegindex) => {
                history.replace(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/${stegindex + 1}`);
            }}>
            {steg.map((s, index) => {
                const erPassert = (parseFloat(sidenummer) - 1) > index;
                const erAktiv = (parseFloat(sidenummer) - 1) === index;

                return (<Stegindikator.Steg
                    label={`Side ${sidenummer}`}
                    aktiv={erAktiv}
                    disabled={!erPassert && !erAktiv}
                    key={`${soknad.id}-steg-${index}`}>
                    {s + 1}
                </Stegindikator.Steg>);
            })}
        </Stegindikator>
    </div>);
};

StegindikatorEttSporsmalPerSide.propTypes = {
    soknad: soknadPt,
    sidenummer: PropTypes.number,
};

export default StegindikatorEttSporsmalPerSide;
