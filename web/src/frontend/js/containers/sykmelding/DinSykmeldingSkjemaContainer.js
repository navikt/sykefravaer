import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSykmelding, getLedetekst } from 'digisyfo-npm';
import * as actionCreators from '../../actions/dinSykmelding_actions';
import DinSykmeldingSkjema from '../../components/sykmeldingskjema/DinSykmeldingSkjema';
import { datoMedKlokkeslett } from '../../utils/datoUtils';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import feilaktigeOpplysninger from '../../enums/feilaktigeOpplysninger';
import { hentAktuelleArbeidsgivere } from '../../actions/dineArbeidsgivere_actions';
import { hentBrukerinfo } from '../../actions/brukerinfo_actions';

export class Skjema extends Component {
    componentWillMount() {
        const { sykmeldingId, skalHenteArbeidsgivere, brukerinfoHentet } = this.props;
        if (sykmeldingId && skalHenteArbeidsgivere) {
            this.props.hentAktuelleArbeidsgivere(sykmeldingId);
        }
        if (!brukerinfoHentet) {
            this.props.hentBrukerinfo();
        }
    }

    render() {
        const { henter, hentingFeilet, vedlikehold } = this.props;
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
        return <DinSykmeldingSkjema {...this.props} />;
    }
}

Skjema.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    vedlikehold: PropTypes.shape({
        datospennMedTid: PropTypes.object,
    }),
    sykmeldingId: PropTypes.string,
    skalHenteArbeidsgivere: PropTypes.bool,
    hentAktuelleArbeidsgivere: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    let sykmelding = {};
    const sykmeldingId = ownProps.sykmeldingId;

    if (sykmeldingId) {
        const _sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId);
        if (_sykmelding) {
            sykmelding = _sykmelding;
        }
    }

    const harStrengtFortroligAdresse = state.brukerinfo.bruker.data.strengtFortroligAdresse

    return {
        skjemaData: state.form.dinSykmeldingSkjema,
        initialValues: Object.assign({}, sykmelding, {
            feilaktigeOpplysninger,
        }),
        sykmelding,
        sykmeldingId,
        sender: state.arbeidsgiversSykmeldinger.sender,
        sendingFeilet: state.dineSykmeldinger.sendingFeilet,
        avbryter: state.dineSykmeldinger.avbryter,
        avbrytFeilet: state.dineSykmeldinger.avbrytFeilet,
        harStrengtFortroligAdresse,
        hentingFeilet: state.arbeidsgivere.hentingFeilet || state.brukerinfo.bruker.hentingFeilet || false,
        henter: state.vedlikehold.henter,
        vedlikehold: state.vedlikehold.data.vedlikehold,
        skalHenteArbeidsgivere: state.arbeidsgivere.sykmeldingId !== sykmeldingId,
        brukerinfoHentet: state.brukerinfo.bruker.hentet === true,
    };
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, Object.assign({}, actionCreators, {
    hentAktuelleArbeidsgivere,
    hentBrukerinfo,
}))(Skjema);

export default DinSykmeldingSkjemaContainer;
