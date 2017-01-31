import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../../sider/Side';
import Oppsummering from '../../components/sykepengesoknad/Oppsummering/Oppsummering';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';

export const Container = (props) => {
    const { brodsmuler, skjemasoknad, sykepengesoknad, henter, hentingFeilet, ledetekster } = props;
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
            return <Oppsummering sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} skjemasoknad={skjemasoknad} />;
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
    skjemasoknad: PropTypes.object,
};

export const mapStateToProps = (state, ownProps) => {
    const skjemasoknad = state.form.sykepengerSkjema ? state.form.sykepengerSkjema.values : undefined;
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
        skjemasoknad,
        sykepengesoknad: state.sykepengesoknader.data.filter((soknad) => {
            return soknad.id === ownProps.params.sykepengesoknadId;
        })[0],
        henter: state.sykepengesoknader.henter || state.ledetekster.henter,
        hentingFeilet: state.sykepengesoknader.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        ledetekster: state.ledetekster.data,
    };
};

const OppsummeringContainer = connect(mapStateToProps)(Container);

export default OppsummeringContainer;
