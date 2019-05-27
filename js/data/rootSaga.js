import { all } from 'redux-saga/effects';
import {
    ledeteksterSagas,
    tidslinjerSagas,
    togglesSagas,
    sykeforlopsPerioderSagas,
} from '@navikt/digisyfo-npm';
import arbeidsgiversSykmeldingerSagas from '../sykmeldinger/data/arbeidsgivers-sykmeldinger/arbeidsgiversSykmeldingerSagas';
import brukerinfoSagas from './brukerinfo/brukerinfoSagas';
import dineArbeidsgivereSagas from '../sykmeldinger/data/arbeidsgivere/arbeidsgivereSagas';
import dineSykmeldingerSagas from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerSagas';
import dinSykmeldingSagas from '../sykmeldinger/data/din-sykmelding/dinSykmeldingSagas';
import sykepengesoknadSagas from './sykepengesoknader/sykepengesoknadSagas';
import ledereSagas from '../landingsside/data/ledere/ledereSagas';
import vedlikeholdSagas from './vedlikehold/vedlikeholdSagas';
import moteSagas from './moter/moteSagas';
import motebehovSagas from './motebehov/motebehovSagas';
import svarSagas from './svar/svarSagas';
import hendelserSagas from '../landingsside/data/hendelser/hendelserSagas';
import aktivitetskravSagas from '../aktivitetskrav/data/aktivitetskravSagas';
import oppfolgingsforlopsPerioderSagas from './oppfolgingsforlopsperioder/oppfolgingsforlopsPerioderSagas';
import sykeforloepSagas from './sykeforloep/sykeforloepSagas';
import sykmeldingMetaSagas from '../sykmeldinger/data/sykmelding-meta/sykmeldingMetaSagas';
import sykeforloepMetadataSagas from './sykeforloep-metadata/sykeforloepMetadataSagas';
import soknaderSagas from './soknader/soknaderSagas';
import unleashTogglesSagas from './unleash-toggles/unleashTogglesSagas';
import metrikkerSagas from './metrikker/metrikkerSagas';
import oppfolgingsdialogerSagas from '../oppfolgingsdialogNpm/oppfolgingsdialogerSagas';
import merVeiledningSagas from '../arbeidsrettet-oppfolging/data/merVeiledningSagas';
import smSykmeldingerSagas from '../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerSagas';

export default function* rootSaga() {
    yield all([
        arbeidsgiversSykmeldingerSagas(),
        brukerinfoSagas(),
        dineArbeidsgivereSagas(),
        dineSykmeldingerSagas(),
        dinSykmeldingSagas(),
        sykepengesoknadSagas(),
        ledeteksterSagas(),
        tidslinjerSagas(),
        ledereSagas(),
        vedlikeholdSagas(),
        moteSagas(),
        motebehovSagas(),
        svarSagas(),
        togglesSagas(),
        hendelserSagas(),
        aktivitetskravSagas(),
        oppfolgingsforlopsPerioderSagas(),
        sykeforloepMetadataSagas(),
        sykeforlopsPerioderSagas(),
        sykeforloepSagas(),
        sykmeldingMetaSagas(),
        soknaderSagas(),
        unleashTogglesSagas(),
        metrikkerSagas(),
        oppfolgingsdialogerSagas(),
        merVeiledningSagas(),
        smSykmeldingerSagas(),
    ]);
}
