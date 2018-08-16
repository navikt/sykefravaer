import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sykmeldingstatuser, arbeidssituasjoner } from 'digisyfo-npm';
import SykmeldingSoknadstatuspanel from '../../components/sykmeldingSoknadstatus/SykmeldingSoknadstatuspanel';
import * as sykepengesoknaderActions from '../../actions/sykepengesoknader_actions';
import * as soknaderActions from '../../actions/soknader_actions';
import { skalHenteSoknader as skalHenteSoknaderSelector } from '../../selectors/soknaderSelectors';
import { toggleSelvstendigSoknad } from '../../selectors/unleashTogglesSelectors';
import { SELVSTENDIGE_OG_FRILANSERE } from '../../enums/soknadtyper';
import { PapirsoknadMelding } from '../../components/sykmeldingSoknadstatus/SykmeldingSoknadstatus';
import AppSpinner from '../../components/AppSpinner';
import { soknad as soknadPt } from '../../propTypes';

const Soknadstatus = ({ soknader, selvstendigToggle, erSelvstendigEllerFrilanserSykmelding }) => {
    if (!selvstendigToggle || !erSelvstendigEllerFrilanserSykmelding) {
        return (<div className="panel panel--komprimert blokk">
            <PapirsoknadMelding />
        </div>);
    }
    if (selvstendigToggle && soknader.length === 0) {
        return null;
    }
    return <SykmeldingSoknadstatuspanel sykepengesoknader={soknader} />;
};

Soknadstatus.propTypes = {
    soknader: PropTypes.arrayOf(soknadPt),
    selvstendigToggle: PropTypes.bool,
    erSelvstendigEllerFrilanserSykmelding: PropTypes.bool,
};

export class Container extends Component {
    componentDidMount() {
        const {
            skalHenteSoknader,
            hentSoknader,
        } = this.props;
        if (skalHenteSoknader) {
            hentSoknader();
        }
    }

    render() {
        const {
            soknader,
            henter,
            selvstendigToggle,
            erSelvstendigEllerFrilanserSykmelding,
        } = this.props;

        return henter
            ? <AppSpinner />
            : <Soknadstatus
                erSelvstendigEllerFrilanserSykmelding={erSelvstendigEllerFrilanserSykmelding}
                selvstendigToggle={selvstendigToggle}
                soknader={soknader} />;
    }
}

Container.propTypes = {
    soknader: PropTypes.arrayOf(soknadPt),
    henter: PropTypes.bool,
    skalHenteSoknader: PropTypes.bool,
    hentSoknader: PropTypes.func,
    selvstendigToggle: PropTypes.bool,
    erSelvstendigEllerFrilanserSykmelding: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    const sykmelding = ownProps.sykmelding;
    const soknader = state.soknader.data
        .filter((soknad) => {
            return soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE;
        })
        .filter((soknad) => {
            return !soknad.korrigerer
                && soknad.sykmeldingId === sykmelding.id;
        });
    const selvstendigToggle = toggleSelvstendigSoknad(state);
    const henter = !state.soknader.hentet || state.soknader.henter;
    const erSelvstendigEllerFrilanserSykmelding = [arbeidssituasjoner.FRILANSER, arbeidssituasjoner.NAERINGSDRIVENDE].indexOf(sykmelding.valgtArbeidssituasjon) > -1;

    return {
        henter,
        erSelvstendigEllerFrilanserSykmelding,
        skalHenteSoknader: skalHenteSoknaderSelector(state)
            && sykmelding.status === sykmeldingstatuser.BEKREFTET
            && erSelvstendigEllerFrilanserSykmelding,
        soknader,
        selvstendigToggle,
        arbeidssituasjon: ownProps.sykmelding.valgtArbeidssituasjon,
    };
};

const BekreftetSykmeldingSoknadstatusContainer = connect(mapStateToProps, {
    hentSykepengesoknader: sykepengesoknaderActions.hentSykepengesoknader,
    hentSoknader: soknaderActions.hentSoknader,
})(Container);

export default BekreftetSykmeldingSoknadstatusContainer;
