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
import sykepengesoknadSagas from './sykepengesoknadSagas';
import ledereSagas from '../landingsside/data/ledere/ledereSagas';
import vedlikeholdSagas from './vedlikeholdSagas';
import moteSagas from './moteSagas';
import motebehovSagas from './motebehovSagas';
import svarSagas from './svarSagas';
import hendelserSagas from '../landingsside/data/hendelser/hendelserSagas';
import aktivitetskravSagas from '../aktivitetskrav/data/aktivitetskrav/aktivitetskravSagas';
import beregnArbeidsgiverperiodeSagas from './beregnArbeidsgiverperiodeSagas';
import forskutteringssporsmalSagas from './forskutteringssporsmalSagas';
import oppfolgingsforlopsPerioderSagas from './oppfolgingsforlopsPerioderSagas';
import sykeforloepSagas from './sykeforloepSagas';
import sykmeldingMetaSagas from '../sykmeldinger/data/sykmelding-meta/sykmeldingMetaSagas';
import sykeforloepMetadataSagas from './sykeforloepMetadataSagas';
import soknaderSagas from '../sykepengesoknad/data/soknader/soknaderSagas';
import unleashTogglesSagas from './unleashTogglesSagas';
import metrikkerSagas from './metrikkerSagas';
import oppfolgingsdialogerSagas from '../oppfolgingsdialogNpm/oppfolgingsdialogerSagas';
import soknadMetaSagas from '../sykepengesoknad/data/soknadMeta/soknadMetaSagas';
import merVeiledningSagas from './merVeiledningSagas';

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
        motebehovSagas(),
        svarSagas(),
        togglesSagas(),
        forskutteringssporsmalSagas(),
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
        soknadMetaSagas(),
        merVeiledningSagas(),
    ]);
}
