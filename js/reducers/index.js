import {
    oppfolgingsdialogerAt as oppfolgingsdialoger,
    arbeidsoppgaver,
    forespoerselRevidering,
    kommentar,
    kopierDialog as kopierDialogReducer,
    dokument,
    samtykke,
    tilgangAt as tilgang,
    tiltak,
    navigasjontoggles,
    nullstill,
    avbrytdialogReducer,
    arbeidsforhold,
    nyNaermesteLeder,
    delmednav,
    fastlegeDeling,
    person,
    virksomhet,
    kontaktinfo,
    forrigenaermesteleder,
    naermesteleder,
} from 'oppfolgingsdialog-npm';
import { ledetekster, sykeforlopsPerioder, tidslinjer, timeout, toggles } from 'digisyfo-npm';
import { reducer as formReducer } from 'redux-form';
import { mote, svar } from 'moter-npm';
import arbeidsgivere from './arbeidsgivere';
import arbeidsgiverperiodeberegning from './arbeidsgiverperiodeberegning';
import arbeidsgiversSykmeldinger from './arbeidsgiversSykmeldinger';
import brukerinfo from './brukerinfo';
import dineSykmeldinger from './dineSykmeldinger';
import forskutteringssporsmal from './forskutteringssporsmal';
import ledere from './ledere';
import sykepengesoknader from './sykepengesoknader';
import vedlikehold from './vedlikehold';
import hendelser from './hendelser';
import aktivitetskrav from './aktivitetskrav';
import reduxFormMeta from './reduxFormMeta';
import sykeforloep from './sykeforloep';
import sykeforloepMetadata from './sykeforloepMetadata';
import sykmeldingMeta from './sykmeldingMeta';
import soknader from './soknader';
import unleashToggles from './unleashToggles';
import metrikker from './metrikker';
import history from '../history';

const reducers = {
    arbeidsforhold,
    arbeidsgivere,
    arbeidsgiverperiodeberegning,
    arbeidsgiversSykmeldinger,
    arbeidsoppgaver,
    avbrytdialogReducer,
    brukerinfo,
    dineSykmeldinger,
    forskutteringssporsmal,
    history,
    ledere,
    dokument,
    forespoerselRevidering,
    kommentar,
    kopierDialogReducer,
    ledetekster,
    mote,
    navigasjontoggles,
    nullstill,
    nyNaermesteLeder,
    oppfolgingsdialoger,
    samtykke,
    svar,
    sykepengesoknader,
    toggles,
    fastlegeDeling,
    delmednav,
    tidslinjer,
    tilgang,
    tiltak,
    vedlikehold,
    hendelser,
    aktivitetskrav,
    person,
    virksomhet,
    kontaktinfo,
    sykeforlopsPerioder,
    forrigenaermesteleder,
    naermesteleder,
    timeout,
    form: formReducer,
    formMeta: reduxFormMeta,
    sykeforloep,
    sykeforloepMetadata,
    sykmeldingMeta,
    soknader,
    unleashToggles,
    metrikker,
};

export default reducers;
