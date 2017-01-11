import React, { PropTypes } from 'react';
import Soknader from '../components/soknader/Soknader';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import { getLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';

export const SoknaderSide = ({ ledetekster, brodsmuler, henter, hentingFeilet, soknader }) => {
    return (
        <Side tittel={getLedetekst('soknader.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<Soknader ledetekster={ledetekster} soknader={soknader} />);
                })()
            }
        </Side>
    );
};

SoknaderSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    soknader: PropTypes.array,
};

export function mapStateToProps(state) {
    const ledetekster = state.ledetekster.data;
    const nySoknad = { id: 1, status: 'NY', fom: '01.01.2017', tom: '01.20.2017', arbeidsgiver: 'BEKK Consulting AS' };
    const innsendtSoknad = { id: 2, status: 'SENDT', fom: '01.01.2017', tom: '01.20.2017', arbeidsgiver: 'BEKK Consulting AS', innsendingsDato: '02.01.2017' };
    return {
        ledetekster,
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', ledetekster),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('soknader.sidetittel', ledetekster),
        }],
        soknader: [nySoknad, innsendtSoknad],
    };
}

const SoknaderContainer = connect(mapStateToProps)(SoknaderSide);

export default SoknaderContainer;
