import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, tilLesbarDatoMedArstall } from 'digisyfo-npm';
import { Link } from 'react-router';
import { soknad as sykepengesoknadPt } from '../../propTypes';

export const RelaterteSoknader = ({ relaterteSoknader }) => {
    if (relaterteSoknader.length === 0) {
        return null;
    }
    return (<div className="panel tidligereVersjoner">
        <h2 className="tidligereVersjoner__tittel">{getLedetekst('relaterte-soknader.tittel')}</h2>
        <ul className="tidligereVersjoner__liste">
            {
                relaterteSoknader
                    .sort((s1, s2) => {
                        return s1.innsendtDato < s2.innsendtDato;
                    })
                    .map((s, index) => {
                        return (<li key={index}>
                            <Link
                                to={`/sykefravaer/soknader/${s.id}`}>{getLedetekst('relaterte-soknader.sendt')} {tilLesbarDatoMedArstall(s.innsendtDato)}</Link>
                        </li>);
                    })
            }
        </ul>
    </div>);
};

RelaterteSoknader.propTypes = {
    relaterteSoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export const mapStateToProps = (state, ownProps) => {
    const relaterteSoknader = [];
    const sykepengesoknadId = ownProps.soknad.id;
    const sykepengesoknader = state.soknader.data;

    let sykepengesoknad = sykepengesoknader.filter((s) => {
        return s.id === sykepengesoknadId;
    })[0];

    sykepengesoknader.forEach(() => {
        sykepengesoknader.forEach((s) => {
            if (sykepengesoknad.korrigerer === s.id) {
                relaterteSoknader.push(s);
                sykepengesoknad = s;
            }
        });
    });

    return {
        relaterteSoknader: relaterteSoknader.reverse(),
    };
};

const RelaterteSoknaderContainer = connect(mapStateToProps)(RelaterteSoknader);

RelaterteSoknaderContainer.propTypes = {
    soknad: sykepengesoknadPt,
};

export default RelaterteSoknaderContainer;
