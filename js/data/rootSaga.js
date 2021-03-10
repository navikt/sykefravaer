import { all } from 'redux-saga/effects';
import { tidslinjerSagas, ledeteksterSagas, togglesSagas, sykeforlopsPerioderSagas } from '../digisyfoNpm';
import arbeidsgiversSykmeldingerSagas from '../sykmeldinger/data/arbeidsgivers-sykmeldinger/arbeidsgiversSykmeldingerSagas';
import brukerinfoSagas from './brukerinfo/brukerinfoSagas';
import dineArbeidsgivereSagas from '../sykmeldinger/data/arbeidsgivere/arbeidsgivereSagas';
import dineSykmeldingerSagas from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerSagas';
import dinSykmeldingSagas from '../sykmeldinger/data/din-sykmelding/dinSykmeldingSagas';
import ledereSagas from '../landingsside/data/ledere/ledereSagas';
import vedlikeholdSagas from './vedlikehold/vedlikeholdSagas';
import moteSagas from './moter/moteSagas';
import motebehovSagas from './motebehov/motebehovSagas';
import hendelserSagas from '../landingsside/data/hendelser/hendelserSagas';
import aktivitetskravSagas from '../aktivitetskrav/data/aktivitetskravSagas';
import sykeforloepSagas from './sykeforloep/sykeforloepSagas';
import sykeforloepSyfosoknadSagas from './sykeforloep-syfosoknad/sykeforloepSyfosoknadSagas';
import sykmeldingMetaSagas from '../sykmeldinger/data/sykmelding-meta/sykmeldingMetaSagas';
import sykeforloepMetadataSagas from './sykeforloep-metadata/sykeforloepMetadataSagas';
import soknaderSagas from './soknader/soknaderSagas';
import sykepengerVarselSagas from './sykepengerVarsel/sykepengerVarselSagas';
import unleashTogglesSagas from './unleash-toggles/unleashTogglesSagas';
import metrikkerSagas from './metrikker/metrikkerSagas';
import oppfolgingsdialogerSagas from '../oppfolgingsdialogNpm/oppfolgingsdialogerSagas';
import merVeiledningSagas from '../arbeidsrettet-oppfolging/data/merVeiledningSagas';
import smSykmeldingerSagas from '../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerSagas';
import vedtakSagas from './vedtak/vedtakSagas';

export default function* rootSaga() {
    yield all([
        arbeidsgiversSykmeldingerSagas(),
        brukerinfoSagas(),
        dineArbeidsgivereSagas(),
        dineSykmeldingerSagas(),
        dinSykmeldingSagas(),
        vedtakSagas(),
        ledeteksterSagas(),
        tidslinjerSagas(),
        ledereSagas(),
        vedlikeholdSagas(),
        moteSagas(),
        motebehovSagas(),
        togglesSagas(),
        hendelserSagas(),
        aktivitetskravSagas(),
        sykeforloepMetadataSagas(),
        sykeforlopsPerioderSagas(),
        sykeforloepSagas(),
        sykeforloepSyfosoknadSagas(),
        sykmeldingMetaSagas(),
        soknaderSagas(),
        sykepengerVarselSagas(),
        unleashTogglesSagas(),
        metrikkerSagas(),
        oppfolgingsdialogerSagas(),
        merVeiledningSagas(),
        smSykmeldingerSagas(),
    ]);
}
