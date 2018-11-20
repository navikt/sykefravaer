import { all } from 'redux-saga/effects';
import {
    ledeteksterSagas,
    tidslinjerSagas,
    togglesSagas,
    sykeforlopsPerioderSagas,
} from 'digisyfo-npm';
import {
    oppfolgingsdialogerAtSagas as oppfolgingsdialogerSagas,
    arbeidsoppgaveSagas,
    arbeidsforholdSagas,
    dokumentSagas,
    forespoerRevideringSagas,
    samtykkeSagas,
    nullstillGodkjenningSagas,
    tilgangAtSagas as tilgangSagas,
    tiltakSagas,
    settDialogSagas,
    avbrytdialogSagas,
    delMedFastlegeSagas,
    delMedNavSagas,
    virksomhetSagas,
    personSagas,
    kontaktinfoSagas,
    forrigeNaermesteLederSagas,
    naermesteLederSagas,
    kommentarSagas,
    kopierOppfolgingsdialogSagas,
} from 'oppfolgingsdialog-npm';
import { motebehovSagas } from 'moter-npm';
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
import oppfolgingsforlopsPerioderSagas from './oppfolgingsforlopsPerioderSagas';
import sykeforloepSagas from './sykeforloepSagas';
import sykmeldingMetaSagas from './sykmeldingMetaSagas';
import sykeforloepMetadataSagas from './sykeforloepMetadataSagas';
import soknaderSagas from './soknaderSagas';
import unleashTogglesSagas from './unleashTogglesSagas';
import metrikkerSagas from './metrikkerSagas';

export default function* rootSaga() {
    yield all([
        arbeidsgiversSykmeldingerSagas(),
        arbeidsforholdSagas(),
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
        samtykkeSagas(),
        svarSagas(),
        avbrytdialogSagas(),
        oppfolgingsdialogerSagas(),
        delMedFastlegeSagas(),
        delMedNavSagas(),
        forespoerRevideringSagas(),
        nullstillGodkjenningSagas(),
        arbeidsoppgaveSagas(),
        dokumentSagas(),
        kommentarSagas(),
        kopierOppfolgingsdialogSagas(),
        tilgangSagas(),
        tiltakSagas(),
        togglesSagas(),
        settDialogSagas(),
        forskutteringssporsmalSagas(),
        hendelserSagas(),
        aktivitetskravSagas(),
        virksomhetSagas(),
        personSagas(),
        kontaktinfoSagas(),
        forrigeNaermesteLederSagas(),
        naermesteLederSagas(),
        oppfolgingsforlopsPerioderSagas(),
        sykeforloepMetadataSagas(),
        sykeforlopsPerioderSagas(),
        sykeforloepSagas(),
        sykmeldingMetaSagas(),
        soknaderSagas(),
        unleashTogglesSagas(),
        metrikkerSagas(),
    ]);
}
