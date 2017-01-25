import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../../sider/Side';
import FravaerOgFriskmelding from '../../components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';

export const Container = (props) => {
    const { brodsmuler, sykepengesoknad, henter, hentingFeilet, ledetekster } = props;
    return (<Side tittel="Søknad om sykepenger" brodsmuler={brodsmuler}>
    {
        (() => {
            if (henter) {
                return <AppSpinner />;
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            if (sykepengesoknad === undefined) {
                return <Feilmelding tittel="Beklager, vi finner ikke søknaden du ser etter" melding="Er du sikker på at du er på riktig adresse?" />;
            }
            return <FravaerOgFriskmelding sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />;
        })()
    }
    </Side>);
};

Container.propTypes = {
    brodsmuler: PropTypes.array,
    sykepengesoknad: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledetekster: PropTypes.object,
};

export const mapStateToProps = (state, ownProps) => {
    return {
        brodsmuler: [{
            tittel: 'Ditt sykefravær',
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: 'Søknader om sykepenger',
            sti: '/soknader',
            erKlikkbar: true,
        }, {
            tittel: 'Søknad',
        }],
        sykepengesoknad: state.sykepengesoknader.data.filter((soknad) => {
            return soknad.id === ownProps.params.sykepengesoknadId;
        })[0],
        henter: state.sykepengesoknader.henter || state.ledetekster.henter,
        hentingFeilet: state.sykepengesoknader.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        ledetekster: state.ledetekster.data,
    };
};

const SoknadContainer = connect(mapStateToProps)(Container);

export default SoknadContainer;
