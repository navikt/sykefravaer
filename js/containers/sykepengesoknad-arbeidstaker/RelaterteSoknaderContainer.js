import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import { Link } from 'react-router';
import { getTidligsteSendtDato, sorterEtterSendtDato } from '../../utils/sykepengesoknadUtils';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const RelaterteSoknader = ({ relaterteSoknader }) => {
    if (relaterteSoknader.length === 0) {
        return null;
    }
    return (<div className="panel tidligereVersjoner">
        <h2 className="tidligereVersjoner__tittel">{getLedetekst('relaterte-soknader.tittel')}</h2>
        <ul className="tidligereVersjoner__liste">
            {
                relaterteSoknader
                    .sort(sorterEtterSendtDato)
                    .map((s, index) => {
                        return (<li key={index}>
                            <Link
                                to={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${s.id}`}>
                                {getLedetekst('relaterte-soknader.sendt')} {tilLesbarDatoMedArstall(getTidligsteSendtDato(s))}
                            </Link>
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
    const sykepengesoknadId = ownProps.sykepengesoknadId;
    const sykepengesoknader = state.sykepengesoknader.data;
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

export default RelaterteSoknaderContainer;
