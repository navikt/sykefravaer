import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sykmeldingstatuser, arbeidssituasjoner } from '@navikt/digisyfo-npm';
import SykmeldingSoknadstatuspanel from '../../components/sykmelding/SykmeldingSoknadstatuspanel';
import * as sykepengesoknaderActions from '../../actions/sykepengesoknader_actions';
import * as soknaderActions from '../../actions/soknader_actions';
import { skalHenteSoknader as skalHenteSoknaderSelector } from '../../selectors/soknaderSelectors';
import { SELVSTENDIGE_OG_FRILANSERE } from '../../enums/soknadtyper';
import { PapirsoknadMelding } from '../../components/sykmelding/SykmeldingSoknadstatus';
import AppSpinner from '../../components/AppSpinner';
import { soknad as soknadPt } from '../../propTypes';

const Soknadstatus = ({ soknader, erSelvstendigEllerFrilanserSykmelding }) => {
    if (!erSelvstendigEllerFrilanserSykmelding) {
        return (<div className="panel panel--komprimert blokk">
            <PapirsoknadMelding />
        </div>);
    }
    if (soknader.length === 0) {
        return null;
    }
    return <SykmeldingSoknadstatuspanel sykepengesoknader={soknader} />;
};

Soknadstatus.propTypes = {
    soknader: PropTypes.arrayOf(soknadPt),
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
    const henter = !state.soknader.hentet || state.soknader.henter;
    const erSelvstendigEllerFrilanserSykmelding = [arbeidssituasjoner.FRILANSER, arbeidssituasjoner.NAERINGSDRIVENDE].indexOf(sykmelding.valgtArbeidssituasjon) > -1;

    return {
        henter,
        erSelvstendigEllerFrilanserSykmelding,
        skalHenteSoknader: skalHenteSoknaderSelector(state)
            && sykmelding.status === sykmeldingstatuser.BEKREFTET
            && erSelvstendigEllerFrilanserSykmelding,
        soknader,
        arbeidssituasjon: ownProps.sykmelding.valgtArbeidssituasjon,
    };
};

const BekreftetSykmeldingSoknadstatusContainer = connect(mapStateToProps, {
    hentSykepengesoknader: sykepengesoknaderActions.hentSykepengesoknader,
    hentSoknader: soknaderActions.hentSoknader,
})(Container);

export default BekreftetSykmeldingSoknadstatusContainer;
