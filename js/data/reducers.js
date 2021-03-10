import { reducer as formReducer } from 'redux-form';
import {
    ledetekster, sykeforlopsPerioder, tidslinjer, timeout, toggles,
} from '../digisyfoNpm';
import oppfolgingsdialoger from '../oppfolgingsdialogNpm/oppfolgingsdialoger';
import arbeidsgivere from '../sykmeldinger/data/arbeidsgivere/arbeidsgivere';
import arbeidsgiversSykmeldinger from '../sykmeldinger/data/arbeidsgivers-sykmeldinger/arbeidsgiversSykmeldinger';
import brukerinfo from './brukerinfo/brukerinfo';
import dineSykmeldinger from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldinger';
import ledere from '../landingsside/data/ledere/ledere';
import vedlikehold from './vedlikehold/vedlikehold';
import hendelser from '../landingsside/data/hendelser/hendelser';
import aktivitetskrav from '../aktivitetskrav/data/aktivitetskrav';
import reduxFormMeta from './redux-form-meta/reduxFormMeta';
import sykeforloep from './sykeforloep/sykeforloep';
import sykeforloepSyfosoknad from './sykeforloep-syfosoknad/sykeforloepSyfosoknad';
import sykeforloepMetadata from './sykeforloep-metadata/sykeforloepMetadata';
import sykmeldingMeta from '../sykmeldinger/data/sykmelding-meta/sykmeldingMeta';
import soknader from './soknader/soknader';
import sykepengerVarsel from './sykepengerVarsel/sykepengerVarsel';
import vedtak from './vedtak/vedtak';
import unleashToggles from './unleash-toggles/unleashToggles';
import metrikker from './metrikker/metrikker';
import mote from './moter/mote';
import motebehov from './motebehov/motebehov';
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
    sykeforloepSyfosoknad,
    sykeforloepMetadata,
    sykmeldingMeta,
    soknader,
    sykepengerVarsel,
    vedtak,
    unleashToggles,
    metrikker,
    oppfolgingsdialoger,
    smSykmeldinger,
};

export default reducers;
