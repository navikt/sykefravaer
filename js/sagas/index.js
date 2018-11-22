import { all } from 'redux-saga/effects';
import {
    ledeteksterSagas,
    tidslinjerSagas,
    togglesSagas,
    sykeforlopsPerioderSagas,
} from 'digisyfo-npm';
import arbeidsgiversSykmeldingerSagas from './arbeidsgiversSykmeldingerSagas';
import brukerinfoSagas from './brukerinfoSagas';
import dineArbeidsgivereSagas from './arbeidsgivereSagas';
import dineSykmeldingerSagas from './dineSykmeldingerSagas';
import dinSykmeldingSagas from './dinSykmeldingSagas';
import sykepengesoknadSagas from './sykepengesoknadSagas';
import ledereSagas from './ledereSagas';
import vedlikeholdSagas from './vedlikeholdSagas';
import moteSagas from './moteSagas';
import svarSagas from './svarSagas';
import hendelserSagas from './hendelserSagas';
import aktivitetskravSagas from './aktivitetskravSagas';
import beregnArbeidsgiverperiodeSagas from './beregnArbeidsgiverperiodeSagas';
import forskutteringssporsmalSagas from './forskutteringssporsmalSagas';
import sykeforloepSagas from './sykeforloepSagas';
import sykmeldingMetaSagas from './sykmeldingMetaSagas';
import sykeforloepMetadataSagas from './sykeforloepMetadataSagas';
import soknaderSagas from './soknaderSagas';
import unleashTogglesSagas from './unleashTogglesSagas';
import metrikkerSagas from './metrikkerSagas';
import oppfolgingsdialogerSagas from '../oppfolgingsdialogNpm/oppfolgingsdialogerSagas';

export default function* rootSaga() {
    yield all([
        arbeidsgiversSykmeldingerSagas(),
        brukerinfoSagas(),
        beregnArbeidsgiverperiodeSagas(),
        dineArbeidsgivereSagas(),
        dineSykmeldingerSagas(),
        dinSykmeldingSagas(),
        sykepengesoknadSagas(),
        ledeteksterSagas(),
        tidslinjerSagas(),
        ledereSagas(),
        vedlikeholdSagas(),
        moteSagas(),
        svarSagas(),
        togglesSagas(),
        forskutteringssporsmalSagas(),
        hendelserSagas(),
        aktivitetskravSagas(),
        sykeforloepMetadataSagas(),
        sykeforlopsPerioderSagas(),
        sykeforloepSagas(),
        sykmeldingMetaSagas(),
        soknaderSagas(),
        unleashTogglesSagas(),
        metrikkerSagas(),
        oppfolgingsdialogerSagas(),
    ]);
}
