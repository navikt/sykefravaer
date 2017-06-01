import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import DineSykmeldingerContainer from '../containers/DineSykmeldingerContainer';
import LandingssideContainer from '../containers/LandingssideContainer';
import { DinSykmeldingContainer } from '../containers/DinSykmeldingContainer';
import SkrivUtSykmeldingContainer from '../containers/SkrivUtSykmeldingContainer';
import TidslinjeContainer from '../containers/TidslinjeContainer';
import SykmeldingKvitteringContainer from '../containers/SykmeldingKvitteringContainer';
import RollerContainer from '../containers/RollerContainer';
import MoteContainer from '../containers/MoteContainer';
import SoknaderContainer from '../containers/SoknaderContainer';
import FoerDuBegynnerContainer from '../containers/sykepengesoknad/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../containers/sykepengesoknad/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../containers/sykepengesoknad/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../containers/sykepengesoknad/OppsummeringContainer';
import OppfolgingsdialogerContainer from '../containers/OppfolgingsdialogerContainer';
import OppfolgingsdialogContainer from '../containers/OppfolgingsdialogContainer';
import OpprettOppfolgingsdialogContainer from '../containers/OpprettOppfolgingsdialogContainer';
import ArbeidsoppgaverContainer from '../containers/ArbeidsoppgaverContainer';
import OppfolgingsdialogSamtykkeContainer from '../containers/OppfolgingsdialogSamtykkeContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={LandingssideContainer} />
        <Route path="/sykefravaer/tidslinjen" component={TidslinjeContainer} />
        <Route path="/sykefravaer/tidslinjen/:arbeidssituasjon" component={TidslinjeContainer} />
        <Route path="/sykefravaer/sykmeldinger" component={DineSykmeldingerContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId" component={DinSykmeldingContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/skriv-ut" component={SkrivUtSykmeldingContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/kvittering" component={SykmeldingKvitteringContainer} />
        <Route path="/sykefravaer/soknader" component={SoknaderContainer} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId" component={FoerDuBegynnerContainer} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/fravaer-og-friskmelding" component={FravaerOgFriskmeldingContainer} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/aktiviteter-i-sykmeldingsperioden" component={AktiviteterISykmeldingsperiodenContainer} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/oppsummering" component={OppsummeringContainer} />
        <Route path="/sykefravaer/roller-og-ansvarsomrader" component={RollerContainer} />
        <Route path="/sykefravaer/dialogmote" component={MoteContainer} />
        <Route path="/sykefravaer/oppfolgingsdialoger" component={OppfolgingsdialogerContainer} />
        <Route path="/sykefravaer/oppfolgingsdialoger/opprett" component={OpprettOppfolgingsdialogContainer} />
        <Route path="/sykefravaer/oppfolgingsdialoger/:oppfolgingsdialogId" component={OppfolgingsdialogContainer} />
        <Route path="/sykefravaer/oppfolgingsdialoger/:oppfolgingsdialogId/arbeidsoppgaver" component={ArbeidsoppgaverContainer} />
        <Route path="/sykefravaer/oppfolgingsdialoger/:oppfolgingsdialogId/samtykk" component={OppfolgingsdialogSamtykkeContainer} />
        <Route path="*" component={LandingssideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
