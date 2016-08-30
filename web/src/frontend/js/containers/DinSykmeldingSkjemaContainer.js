import { getSykmelding, filtrerObjektKeys } from '../utils';
import * as actionCreators from '../actions/dinSykmelding_actions';
import DinSykmeldingSkjema from '../components/sykmelding/DinSykmeldingSkjema';
import { getLedetekst } from '../ledetekster';
import { reduxForm } from 'redux-form';

export const mapStateToProps = (state, ownProps) => {
    let sykmelding = {};

    if (ownProps.sykmeldingId) {
        const _sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, ownProps.sykmeldingId);
        if (_sykmelding) {
            sykmelding = _sykmelding;
        }
    }

    const arbeidsgivereData = state.arbeidsgivere.data.concat([{
        orgnummer: '0',
        navn: getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.label', state.ledetekster.data),
    }]);

    const arbeidsgivere = Object.assign({}, state.arbeidsgivere, {
        data: arbeidsgivereData,
    });

    return {
        initialValues: sykmelding,
        sykmelding,
        ledetekster: state.ledetekster.data,
        sender: state.arbeidsgiversSykmeldinger.sender,
        harStrengtFortroligAdresse: state.brukerinfo.bruker.data.strengtFortroligAdresse,
        arbeidsgivere: arbeidsgivere.data,
    };
};

export const validate = (values) => {
    const feilmeldinger = {};

    if (values.opplysningeneErRiktige === false && typeof values.feilaktigeOpplysninger === 'object' &&
        (values.feilaktigeOpplysninger.periode || values.feilaktigeOpplysninger.sykmeldingsgrad)) {
        return {};
    }
    if (values.opplysningeneErRiktige === undefined) {
        feilmeldinger.opplysningeneErRiktige = 'Vennligst svar på om opplysningene er riktige';
    }
    if (values.arbeidssituasjon === undefined) {
        feilmeldinger.arbeidssituasjon = 'Vennligst oppgi din arbeidssituasjon';
    }
    if (values.opplysningeneErRiktige === false && (!values.feilaktigeOpplysninger || !filtrerObjektKeys(values.feilaktigeOpplysninger).length)) {
        feilmeldinger.feilaktigeOpplysninger = 'Vennligst oppgi hvilke opplysninger som ikke er riktige';
    }
    if (values.arbeidssituasjon === 'arbeidstaker' && (!values.valgtArbeidsgiver || !values.valgtArbeidsgiver.orgnummer)) {
        feilmeldinger.valgtArbeidsgiver = 'Vennligst velg arbeidsgiver';
    }
    return feilmeldinger;
};

const DinSykmeldingSkjemaContainer = reduxForm({
    form: 'sendSykmelding',
    fields: ['opplysningeneErRiktige', 'feilaktigeOpplysninger', 'arbeidssituasjon', 'valgtArbeidsgiver'],
    validate,
}, mapStateToProps, actionCreators)(DinSykmeldingSkjema);

export default DinSykmeldingSkjemaContainer;
