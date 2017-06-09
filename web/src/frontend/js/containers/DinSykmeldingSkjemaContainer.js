import React, { PropTypes, Component } from 'react';
import { getSykmelding, getLedetekst } from 'digisyfo-npm';
import * as actionCreators from '../actions/dinSykmelding_actions';
import DinSykmeldingSkjema from '../components/sykmeldingskjema/DinSykmeldingSkjema';
import { connect } from 'react-redux';
import { datoMedKlokkeslett } from '../utils/datoUtils';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import feilaktigeOpplysninger from '../enums/feilaktigeOpplysninger';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions';

export class Skjema extends Component {
    componentWillMount() {
        const { sykmeldingId, skalHenteArbeidsgivere } = this.props;
        if (sykmeldingId && skalHenteArbeidsgivere) {
            this.props.hentAktuelleArbeidsgivere(sykmeldingId);
        }
    }

    render() {
        const { henter, hentingFeilet, vedlikehold } = this.props;
        if (henter) {
            return <AppSpinner />;
        } else if (hentingFeilet) {
            return <Feilmelding />;
        } else if (vedlikehold.datospennMedTid) {
            return (<Feilmelding tittel={getLedetekst('under-vedlikehold.varsel.tittel')} melding={getLedetekst('under-vedlikehold.varsel.tekst', {
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

    const arbeidsgivereData = state.arbeidsgivere.data.concat([{
        orgnummer: '0',
        navn: getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.label'),
    }]);

    const arbeidsgivere = Object.assign({}, state.arbeidsgivere, {
        data: arbeidsgivereData,
    });
    const harStrengtFortroligAdresse = state.brukerinfo.bruker.data.strengtFortroligAdresse;

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
        arbeidsgivere: arbeidsgivere.data,
        hentingFeilet: state.arbeidsgivere.hentingFeilet,
        henter: state.arbeidsgivere.henter || state.vedlikehold.henter,
        pilotSykepenger: state.pilot.data.pilotSykepenger,
        vedlikehold: state.vedlikehold.data.vedlikehold,
        skalHenteArbeidsgivere: state.arbeidsgivere.sykmeldingId !== sykmeldingId,
    };
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, Object.assign({}, actionCreators, {
    hentAktuelleArbeidsgivere,
}))(Skjema);

export default DinSykmeldingSkjemaContainer;
