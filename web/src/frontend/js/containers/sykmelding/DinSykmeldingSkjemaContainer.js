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

export class Skjemalaster extends Component {
    componentWillMount() {
        const { sykmeldingId, skalHenteArbeidsgivere, skalHenteBrukerinfo, skalHenteArbeidsgiversSykmeldinger } = this.props;
        if (sykmeldingId && skalHenteArbeidsgivere) {
            this.props.hentAktuelleArbeidsgivere(sykmeldingId);
        }
        if (skalHenteBrukerinfo) {
            this.props.hentBrukerinfo();
        }
        if (skalHenteArbeidsgiversSykmeldinger) {
            this.props.hentArbeidsgiversSykmeldinger();
        }
    }

    render() {
        const { henter, hentingFeilet, vedlikehold, sykmelding } = this.props;
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
        return <DinSykmeldingSkjema sykmelding={sykmelding} />;
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
    skalHenteArbeidsgivere: PropTypes.bool,
    skalHenteArbeidsgiversSykmeldinger: PropTypes.bool,
    hentAktuelleArbeidsgivere: PropTypes.func,
    skalHenteBrukerinfo: PropTypes.bool,
    hentBrukerinfo: PropTypes.func,
    hentArbeidsgiversSykmeldinger: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    const sykmeldingId = ownProps.sykmeldingId;
    const harStrengtFortroligAdresse = state.brukerinfo.bruker.data.strengtFortroligAdresse;
    const sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId) || {};

    return {
        sykmelding,
        sykmeldingId: sykmelding.id,
        hentingFeilet: state.arbeidsgivere.hentingFeilet || state.brukerinfo.bruker.hentingFeilet || false,
        henter: state.vedlikehold.henter || state.brukerinfo.bruker.henter || !state.arbeidsgiversSykmeldinger.hentet || state.arbeidsgiversSykmeldinger.henter,
        vedlikehold: state.vedlikehold.data.vedlikehold,
        skalHenteArbeidsgivere: state.arbeidsgivere.sykmeldingId !== sykmeldingId && !harStrengtFortroligAdresse,
        skalHenteBrukerinfo: !state.brukerinfo.bruker.henter && state.brukerinfo.bruker.hentet !== true,
        skalHenteArbeidsgiversSykmeldinger: !state.arbeidsgiversSykmeldinger.henter && !state.arbeidsgiversSykmeldinger.hentet,
    };
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, {
    hentAktuelleArbeidsgivere,
    hentArbeidsgiversSykmeldinger,
    hentBrukerinfo,
})(Skjemalaster);

export default DinSykmeldingSkjemaContainer;
