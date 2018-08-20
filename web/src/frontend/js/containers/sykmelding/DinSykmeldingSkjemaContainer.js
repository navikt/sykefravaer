import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { getSykmelding, getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import DinSykmeldingSkjema from '../../components/sykmeldingskjema/DinSykmeldingSkjema';
import { datoMedKlokkeslett } from '../../utils/datoUtils';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { hentAktuelleArbeidsgivere } from '../../actions/dineArbeidsgivere_actions';
import { hentBrukerinfo } from '../../actions/brukerinfo_actions';
import { hentArbeidsgiversSykmeldinger } from '../../actions/arbeidsgiversSykmeldinger_actions';
import { hentVentetid } from '../../actions/sykmeldingMeta_actions';
import { getSykmeldingSkjemanavn } from '../../enums/skjemanavn';
import { skalViseFrilansersporsmal } from '../../components/sykmeldingskjema/sykmeldingSkjemaUtils';
import { hentSykeforloep } from '../../actions/sykeforloep_actions';

export class Skjemalaster extends Component {
    componentWillMount() {
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

export const mapStateToProps = (state, ownProps) => {
    const sykmeldingId = ownProps.sykmeldingId;
    const harStrengtFortroligAdresse = state.brukerinfo.bruker.data.strengtFortroligAdresse;
    const sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId) || {};

    const sykmeldingMeta = state.sykmeldingMeta[sykmeldingId] || {};

    const skalHenteVentetid = !sykmeldingMeta.henterVentetid && !sykmeldingMeta.hentVentetidFeilet && !sykmeldingMeta.ventetidHentet;
    const skalHenteArbeidsgivere = state.arbeidsgivere.sykmeldingId !== sykmeldingId &&
        !harStrengtFortroligAdresse;
    const skalHenteBrukerinfo = !state.brukerinfo.bruker.henter &&
        !state.brukerinfo.bruker.hentet;
    const skalHenteArbeidsgiversSykmeldinger = !state.arbeidsgiversSykmeldinger.henter &&
        !state.arbeidsgiversSykmeldinger.hentet;

    const values = getFormValues(getSykmeldingSkjemanavn(sykmeldingId))(state);
    const visFrilansersporsmal = skalViseFrilansersporsmal(sykmelding, values, sykmeldingMeta.erUtenforVentetid);

    const skalHenteSykeforloep = !state.sykeforloep.hentet && !state.sykeforloep.henter;

    return {
        sykmelding,
        sykmeldingId,
        hentingFeilet: state.arbeidsgivere.hentingFeilet || state.brukerinfo.bruker.hentingFeilet || state.sykeforloep.hentingFeilet || false,
        henter: skalHenteBrukerinfo ||
            state.brukerinfo.bruker.henter ||
            skalHenteVentetid ||
            state.sykmeldingMeta.henter ||
            skalHenteArbeidsgiversSykmeldinger ||
            state.arbeidsgiversSykmeldinger.henter,
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
