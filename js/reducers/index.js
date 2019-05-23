import { ledetekster, sykeforlopsPerioder, tidslinjer, timeout, toggles } from '@navikt/digisyfo-npm';
import { reducer as formReducer } from 'redux-form';
import oppfolgingsdialoger from '../oppfolgingsdialogNpm/oppfolgingsdialoger';
import arbeidsgivere from '../sykmeldinger/data/arbeidsgivere/arbeidsgivere';
import arbeidsgiversSykmeldinger from '../sykmeldinger/data/arbeidsgivers-sykmeldinger/arbeidsgiversSykmeldinger';
import brukerinfo from './brukerinfo';
import dineSykmeldinger from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldinger';
import ledere from '../landingsside/data/ledere/ledere';
import sykepengesoknader from '../sykepengesoknad-gammel-plattform/data/sykepengesoknader/sykepengesoknader';
import vedlikehold from './vedlikehold';
import hendelser from '../landingsside/data/hendelser/hendelser';
import aktivitetskrav from '../aktivitetskrav/data/aktivitetskrav/aktivitetskrav';
import reduxFormMeta from './reduxFormMeta';
import oppfolgingsforlopsPerioder from './oppfolgingsforlopsPerioder';
import sykeforloep from './sykeforloep';
import sykeforloepMetadata from './sykeforloepMetadata';
import sykmeldingMeta from '../sykmeldinger/data/sykmelding-meta/sykmeldingMeta';
import soknader from '../sykepengesoknad/data/soknader/soknader';
import unleashToggles from './unleashToggles';
import metrikker from './metrikker';
import mote from './mote';
import svar from './svar';
import motebehov from './motebehov';
import motebehovSvar from './motebehovSvar';
import history from '../history';
import merVeiledning from '../arbeidsrettet-oppfolging/data/merVeiledning';
import smSykmeldinger from '../sykmeldinger/data/sm-sykmeldinger/smSykmeldinger';

const reducers = {
    arbeidsgivere,
    arbeidsgiversSykmeldinger,
    brukerinfo,
    dineSykmeldinger,
    history,
    ledere,
    ledetekster,
    merVeiledning,
    mote,
    motebehov,
    motebehovSvar,
    oppfolgingsforlopsPerioder,
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
    smSykmeldinger,
};

export default reducers;
