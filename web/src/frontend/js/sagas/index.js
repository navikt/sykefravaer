import arbeidsgiversSykmeldingerSagas from './arbeidsgiversSykmeldingerSagas';
import brukerinfoSagas from './brukerinfoSagas';
import dineArbeidsgivereSagas from './dineArbeidsgivereSagas';
import dineSykmeldingerSagas from './dineSykmeldingerSagas';
import dinSykmeldingSagas from './dinSykmeldingSagas';
import sykepengesoknadSagas from './sykepengesoknadSagas';
import tidslinjerSagas from './tidslinjerSagas';
import ledereSagas from './ledereSagas';
import vedlikeholdSagas from './vedlikeholdSagas';
import pilotSykepengerSagas from './pilotSykepengerSagas';
import moteSagas from './moteSagas';
import svarSagas from './svarSagas';
import { oppfolgingsdialogerAtSagas as oppfolgingsdialogerSagas, arbeidsoppgaveSagas } from 'oppfolgingsdialog-npm';
import { ledeteksterSagas, togglesSagas } from 'digisyfo-npm';

export default function * rootSaga() {
    yield [
        arbeidsgiversSykmeldingerSagas(),
        brukerinfoSagas(),
        dineArbeidsgivereSagas(),
        dineSykmeldingerSagas(),
        dinSykmeldingSagas(),
        sykepengesoknadSagas(),
        ledeteksterSagas(),
        tidslinjerSagas(),
        ledereSagas(),
        pilotSykepengerSagas(),
        vedlikeholdSagas(),
        moteSagas(),
        svarSagas(),
        oppfolgingsdialogerSagas(),
        arbeidsoppgaveSagas(),
        togglesSagas(),
    ];
}
