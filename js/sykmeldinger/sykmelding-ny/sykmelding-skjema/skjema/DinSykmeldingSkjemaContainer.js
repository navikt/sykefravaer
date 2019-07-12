import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, getSykmelding, sykmelding as sykmeldingPt } from '@navikt/digisyfo-npm';
import DinSykmeldingSkjema from './DinSykmeldingSkjema';
import { datoMedKlokkeslett } from '../../../../utils/datoUtils';
import AppSpinner from '../../../../components/AppSpinner';
import Feilmelding from '../../../../components/Feilmelding';
import { hentAktuelleArbeidsgivere } from '../../../data/arbeidsgivere/arbeidsgivereActions';
import { hentBrukerinfo } from '../../../../data/brukerinfo/brukerinfo_actions';
import { hentArbeidsgiversSykmeldinger } from '../../../data/arbeidsgivers-sykmeldinger/arbeidsgiversSykmeldingerActions';
import { hentVentetid } from '../../../data/sykmelding-meta/sykmeldingMetaActions';
import { skalViseFrilansersporsmal } from './sykmeldingSkjemaUtils';
import { hentSykeforloep } from '../../../../data/sykeforloep/sykeforloep_actions';
import * as sykmeldingSelectors from '../../../data/sykmelding-meta/sykmeldingMetaSelectors';
import * as brukerinfoSelectors from '../../../../data/brukerinfo/brukerinfoSelectors';
import * as arbeidsgivereSelectors from '../../../data/arbeidsgivere/arbeidsgivereSelectors';
import * as arbeidsgiversSykmeldingerSelectors from '../../../data/arbeidsgivers-sykmeldinger/arbeidsgiversSykmeldingerSelectors';
import * as sykeforloepSelectors from '../../../../data/sykeforloep/sykeforloepSelectors';

export class Skjemalaster extends Component {
    componentDidMount() {
        this.hentData();
    }

    componentDidUpdate() {
        this.hentData();
    }

    hentData() {
        const {
            sykmeldingId,
            skalHenteArbeidsgivere,
            skalHenteArbeidsgiversSykmeldinger,
            skalHenteVentetid,
            doHentAktuelleArbeidsgivere,
            doHentBrukerinfo,
            doHentArbeidsgiversSykmeldinger,
            doHentVentetid,
            doHentSykeforloep,
        } = this.props;

        if (skalHenteArbeidsgivere) {
            doHentAktuelleArbeidsgivere(sykmeldingId);
        }
        doHentBrukerinfo();
        if (skalHenteArbeidsgiversSykmeldinger) {
            doHentArbeidsgiversSykmeldinger();
        }
        if (skalHenteVentetid) {
            doHentVentetid(sykmeldingId);
        }
        doHentSykeforloep();
    }

    render() {
        const {
            henter, hentingFeilet, vedlikehold, sykmelding, visFrilansersporsmal,
        } = this.props;
        if (henter) {
            return <AppSpinner />;
        }
        if (hentingFeilet) {
            return <Feilmelding tittel="Beklager, det oppstod en feil" melding="Du kan dessverre ikke ta i bruk sykmeldingen akkurat nå. Prøv igjen senere!" />;
        }
        if (vedlikehold.datospennMedTid) {
            return (
                <Feilmelding
                    tittel={getLedetekst('under-vedlikehold.varsel.tittel')}
                    melding={getLedetekst('under-vedlikehold.varsel.tekst', {
                        '%FRA%': datoMedKlokkeslett(vedlikehold.datospennMedTid.fom),
                        '%TIL%': datoMedKlokkeslett(vedlikehold.datospennMedTid.tom),
                    })} />
            );
        }
        return (
            <DinSykmeldingSkjema
                sykmelding={sykmelding}
                visFrilansersporsmal={visFrilansersporsmal} />
        );
    }
}

Skjemalaster.propTypes = {
    sykmeldingId: PropTypes.string,
    sykmelding: sykmeldingPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    vedlikehold: PropTypes.shape({
        datospennMedTid: PropTypes.object,
    }),
    visFrilansersporsmal: PropTypes.bool,
    skalHenteArbeidsgivere: PropTypes.bool,
    skalHenteArbeidsgiversSykmeldinger: PropTypes.bool,
    skalHenteVentetid: PropTypes.bool,
    doHentSykeforloep: PropTypes.func,
    doHentAktuelleArbeidsgivere: PropTypes.func,
    doHentBrukerinfo: PropTypes.func,
    doHentArbeidsgiversSykmeldinger: PropTypes.func,
    doHentVentetid: PropTypes.func,
};

export const henterDataTilSykmeldingskjema = (state, sykmeldingId) => brukerinfoSelectors.skalHenteBrukerinfoSelector(state)
        || state.brukerinfo.bruker.henter
        || sykmeldingSelectors.skalHenteVentetid(state, sykmeldingId)
        || state.sykmeldingMeta.henter
        || arbeidsgiversSykmeldingerSelectors.skalHenteArbeidsgiversSykmeldinger(state)
        || state.arbeidsgiversSykmeldinger.henter
        || sykeforloepSelectors.skalHenteSykeforloep(state)
        || state.sykeforloep.henter
        || state.arbeidsgivere.henter
        || arbeidsgivereSelectors.skalHenteArbeidsgivere(state, sykmeldingId);

export const mapStateToProps = (state, ownProps) => {
    const { sykmeldingId } = ownProps;

    const sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId) || {};
    const skalHenteVentetid = sykmeldingSelectors.skalHenteVentetid(state, sykmeldingId);
    const skalHenteArbeidsgivere = arbeidsgivereSelectors.skalHenteArbeidsgivere(state, sykmeldingId);
    const skalHenteArbeidsgiversSykmeldinger = arbeidsgiversSykmeldingerSelectors.skalHenteArbeidsgiversSykmeldinger(state);
    const visFrilansersporsmal = skalViseFrilansersporsmal(state, sykmeldingId);

    return {
        sykmelding,
        sykmeldingId,
        hentingFeilet: state.arbeidsgivere.hentingFeilet
            || state.brukerinfo.bruker.hentingFeilet
            || state.sykeforloep.hentingFeilet
            || false,
        henter: henterDataTilSykmeldingskjema(state, sykmeldingId),
        vedlikehold: state.vedlikehold.data.vedlikehold,
        skalHenteArbeidsgivere,
        skalHenteArbeidsgiversSykmeldinger,
        skalHenteVentetid,
        visFrilansersporsmal,
    };
};

const actionCreators = {
    doHentAktuelleArbeidsgivere: hentAktuelleArbeidsgivere,
    doHentArbeidsgiversSykmeldinger: hentArbeidsgiversSykmeldinger,
    doHentBrukerinfo: hentBrukerinfo,
    doHentVentetid: hentVentetid,
    doHentSykeforloep: hentSykeforloep,
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, actionCreators)(Skjemalaster);

export default DinSykmeldingSkjemaContainer;
