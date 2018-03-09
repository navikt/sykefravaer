import {
    ledeteksterSagas,
    tidslinjerSagas,
    togglesSagas,
} from 'digisyfo-npm';
import {
    oppfolgingsdialogerAtSagas as oppfolgingsdialogerSagas,
    arbeidsoppgaveSagas,
    arbeidsforholdSagas,
    dokumentSagas,
    samtykkeSagas,
    nullstillGodkjenningSagas,
    tilgangSagas,
    tiltakSagas,
    settDialogSagas,
    avbrytdialogSagas,
    delMedNavSagas,
    virksomhetSagas,
    personSagas,
    kontaktinfoSagas,
    forrigeNaermesteLederSagas,
    naermesteLederSagas,
    kommentarSagas,
    kopierOppfolgingsdialogSagas,
} from 'oppfolgingsdialog-npm';
import arbeidsgiversSykmeldingerSagas from './arbeidsgiversSykmeldingerSagas';
import brukerinfoSagas from './brukerinfoSagas';
import dineArbeidsgivereSagas from './dineArbeidsgivereSagas';
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

export default function* rootSaga() {
    yield [
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
        samtykkeSagas(),
        svarSagas(),
        avbrytdialogSagas(),
        oppfolgingsdialogerSagas(),
        delMedNavSagas(),
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
        sykeforloepSagas(),
        sykmeldingMetaSagas(),
    ];
}
