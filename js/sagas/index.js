import { all } from 'redux-saga/effects';
import {
    ledeteksterSagas,
    tidslinjerSagas,
    togglesSagas,
    sykeforlopsPerioderSagas,
} from '@navikt/digisyfo-npm';
import arbeidsgiversSykmeldingerSagas from '../sykmeldinger/data/arbeidsgivers-sykmeldinger/arbeidsgiversSykmeldingerSagas';
import brukerinfoSagas from './brukerinfoSagas';
import dineArbeidsgivereSagas from '../sykmeldinger/data/arbeidsgivere/arbeidsgivereSagas';
import dineSykmeldingerSagas from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerSagas';
import dinSykmeldingSagas from '../sykmeldinger/data/din-sykmelding/dinSykmeldingSagas';
import sykepengesoknadSagas from '../sykepengesoknad/data/sykepengesoknader/sykepengesoknadSagas';
import ledereSagas from '../landingsside/data/ledere/ledereSagas';
import vedlikeholdSagas from './vedlikeholdSagas';
import moteSagas from './moteSagas';
import motebehovSagas from './motebehovSagas';
import svarSagas from './svarSagas';
import hendelserSagas from '../landingsside/data/hendelser/hendelserSagas';
import aktivitetskravSagas from '../aktivitetskrav/data/aktivitetskrav/aktivitetskravSagas';
import oppfolgingsforlopsPerioderSagas from './oppfolgingsforlopsPerioderSagas';
import sykeforloepSagas from './sykeforloepSagas';
import sykmeldingMetaSagas from '../sykmeldinger/data/sykmelding-meta/sykmeldingMetaSagas';
import sykeforloepMetadataSagas from './sykeforloepMetadataSagas';
import soknaderSagas from '../sykepengesoknad/data/soknader/soknaderSagas';
import unleashTogglesSagas from './unleashTogglesSagas';
import metrikkerSagas from './metrikkerSagas';
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
