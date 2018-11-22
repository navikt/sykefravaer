import { ledetekster, sykeforlopsPerioder, tidslinjer, timeout, toggles } from 'digisyfo-npm';
import { reducer as formReducer } from 'redux-form';
import { mote, svar } from 'moter-npm';
import oppfolgingsdialoger from '../oppfolgingsdialogNpm/oppfolgingsdialoger';
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
import soknadMeta from './soknadMeta';

const reducers = {
    arbeidsgivere,
    arbeidsgiverperiodeberegning,
    arbeidsgiversSykmeldinger,
    brukerinfo,
    dineSykmeldinger,
    forskutteringssporsmal,
    history,
    ledere,
    ledetekster,
    mote,
    svar,
    sykepengesoknader,
    toggles,
    tidslinjer,
    vedlikehold,
    hendelser,
    aktivitetskrav,
    sykeforlopsPerioder,
    timeout,
    form: formReducer,
    formMeta: reduxFormMeta,
    sykeforloep,
    sykeforloepMetadata,
    sykmeldingMeta,
    soknader,
    unleashToggles,
    metrikker,
    oppfolgingsdialoger,
    soknadMeta,
};

export default reducers;
