import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import {
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';

const Arbeidsforhold = ({ arbeidsforhold }) => {
    return (<div className="panel oppfolgingsdialogStilling notifikasjonboks" role="alert">
        <img src={`${getContextRoot()}/img/svg/oppfolgingsdialog-stilling.svg`} alt="ikon" className="oppfolgingsdialogStilling__img" />
        <div className="oppfolgingsdialogStilling__tekst">
            <h3>{getLedetekst('oppfolgingsdialog.arbeidstaker.stilling.tekst')}</h3>
            { arbeidsforhold
                .filter((forhold) => { return forhold.prosent > 0; })
                .map((forhold, idx) => {
                    return (<p key={idx}>{forhold.yrke.toLowerCase()}: {forhold.prosent}%</p>);
                })
            }
        </div>
    </div>);
};
Arbeidsforhold.propTypes = {
    arbeidsforhold: PropTypes.arrayOf(oppfolgingProptypes.stillingPt),
};

export default Arbeidsforhold;
