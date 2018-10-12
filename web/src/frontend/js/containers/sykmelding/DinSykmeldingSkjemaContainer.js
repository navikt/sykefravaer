import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSykmelding, getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import DinSykmeldingSkjema from '../../components/sykmeldingskjema/DinSykmeldingSkjema';
import { datoMedKlokkeslett } from '../../utils/datoUtils';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { hentAktuelleArbeidsgivere } from '../../actions/dineArbeidsgivere_actions';
import { hentBrukerinfo } from '../../actions/brukerinfo_actions';
import { hentArbeidsgiversSykmeldinger } from '../../actions/arbeidsgiversSykmeldinger_actions';
import { hentVentetid } from '../../actions/sykmeldingMeta_actions';
import { skalViseFrilansersporsmal } from '../../components/sykmeldingskjema/sykmeldingSkjemaUtils';
import { hentSykeforloep } from '../../actions/sykeforloep_actions';
import * as sykmeldingSelectors from '../../selectors/sykmeldingMetaSelectors';
import * as brukerinfoSelectors from '../../selectors/brukerinfoSelectors';
import * as arbeidsgivereSelectors from '../../selectors/arbeidsgivereSelectors';
import * as arbeidsgiversSykmeldingerSelectors from '../../selectors/arbeidsgiversSykmeldingerSelectors';
import * as sykeforloepSelectors from '../../selectors/sykeforloepSelectors';

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
            skalHenteBrukerinfo,
            skalHenteArbeidsgiversSykmeldinger,
            skalHenteVentetid,
            skalHenteSykeforloep,
        } = this.props;

        if (skalHenteArbeidsgivere) {
            this.props.hentAktuelleArbeidsgivere(sykmeldingId);
        }
        if (skalHenteBrukerinfo) {
            this.props.hentBrukerinfo();
        }
        if (skalHenteArbeidsgiversSykmeldinger) {
            this.props.hentArbeidsgiversSykmeldinger();
        }
        if (skalHenteVentetid) {
            this.props.hentVentetid(sykmeldingId);
        }
        if (skalHenteSykeforloep) {
            this.props.hentSykeforloep();
        }
    }

    render() {
        const { henter, hentingFeilet, vedlikehold, sykmelding, visFrilansersporsmal } = this.props;
        if (henter) {
            return <AppSpinner />;
        } else if (hentingFeilet) {
            return <Feilmelding tittel="Beklager, det oppstod en feil" melding="Du kan dessverre ikke ta i bruk sykmeldingen akkurat nå. Prøv igjen senere!" />;
        } else if (vedlikehold.datospennMedTid) {
            return (<Feilmelding
                tittel={getLedetekst('under-vedlikehold.varsel.tittel')}
                melding={getLedetekst('under-vedlikehold.varsel.tekst', {
                    '%FRA%': datoMedKlokkeslett(vedlikehold.datospennMedTid.fom),
                    '%TIL%': datoMedKlokkeslett(vedlikehold.datospennMedTid.tom),
                })} />);
        }
        return (<DinSykmeldingSkjema
            sykmelding={sykmelding}
            visFrilansersporsmal={visFrilansersporsmal} />);
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
    skalHenteSykeforloep: PropTypes.bool,
    hentSykeforloep: PropTypes.func,
    skalHenteArbeidsgivere: PropTypes.bool,
    skalHenteArbeidsgiversSykmeldinger: PropTypes.bool,
    hentAktuelleArbeidsgivere: PropTypes.func,
    skalHenteBrukerinfo: PropTypes.bool,
    hentBrukerinfo: PropTypes.func,
    hentArbeidsgiversSykmeldinger: PropTypes.func,
    skalHenteVentetid: PropTypes.bool,
    hentVentetid: PropTypes.func,
    visFrilansersporsmal: PropTypes.bool,
};

export const henterDataTilSykmeldingskjema = (state, sykmeldingId) => {
    return brukerinfoSelectors.skalHenteBrukerinfo(state)
        || state.brukerinfo.bruker.henter
        || sykmeldingSelectors.skalHenteVentetid(state, sykmeldingId)
        || state.sykmeldingMeta.henter
        || arbeidsgiversSykmeldingerSelectors.skalHenteArbeidsgiversSykmeldinger(state)
        || state.arbeidsgiversSykmeldinger.henter
        || sykeforloepSelectors.skalHenteSykeforloep(state)
        || state.sykeforloep.henter
        || state.arbeidsgivere.henter
        || arbeidsgivereSelectors.skalHenteArbeidsgivere(state, sykmeldingId);
};

export const mapStateToProps = (state, ownProps) => {
    const sykmeldingId = ownProps.sykmeldingId;

    const sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId) || {};
    const skalHenteVentetid = sykmeldingSelectors.skalHenteVentetid(state, sykmeldingId);
    const skalHenteArbeidsgivere = arbeidsgivereSelectors.skalHenteArbeidsgivere(state, sykmeldingId);
    const skalHenteBrukerinfo = brukerinfoSelectors.skalHenteBrukerinfo(state);
    const skalHenteArbeidsgiversSykmeldinger = arbeidsgiversSykmeldingerSelectors.skalHenteArbeidsgiversSykmeldinger(state);
    const visFrilansersporsmal = skalViseFrilansersporsmal(state, sykmeldingId);
    const skalHenteSykeforloep = sykeforloepSelectors.skalHenteSykeforloep(state);

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
        skalHenteBrukerinfo,
        skalHenteArbeidsgiversSykmeldinger,
        skalHenteVentetid,
        skalHenteSykeforloep,
        visFrilansersporsmal,
    };
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, {
    hentAktuelleArbeidsgivere,
    hentArbeidsgiversSykmeldinger,
    hentBrukerinfo,
    hentVentetid,
    hentSykeforloep,
})(Skjemalaster);

export default DinSykmeldingSkjemaContainer;
