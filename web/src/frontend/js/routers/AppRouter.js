import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import DineSykmeldingerContainer from '../containers/sykmeldinger/DineSykmeldingerContainer';
import LandingssideContainer from '../containers/landingsside/LandingssideContainer';
import { DinSykmeldingContainer } from '../containers/sykmelding/DinSykmeldingContainer';
import SkrivUtSykmeldingContainer from '../containers/sykmelding/SkrivUtSykmeldingContainer';
import TidslinjeContainer from '../containers/tidslinje/TidslinjeContainer';
import SykmeldingKvitteringContainer from '../containers/sykmelding/SykmeldingKvitteringContainer';
import RollerContainer from '../containers/RollerContainer';
import MoteContainer from '../containers/mote/MoteContainer';
import SoknaderContainer from '../containers/sykepengesoknader/SoknaderContainer';
import FoerDuBegynnerContainer from '../containers/sykepengesoknad/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../containers/sykepengesoknad/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../containers/sykepengesoknad/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../containers/sykepengesoknad/OppsummeringContainer';
import OppfolgingsdialogerContainer from '../containers/oppfolgingsdialoger/OppfolgingsdialogerContainer';
import OppfolgingsdialogContainer from '../containers/oppfolgingsdialog/OppfolgingsdialogContainer';
import OpprettOppfolgingsdialogContainer from '../containers/oppfolgingsdialog/OpprettOppfolgingsdialogContainer';
import SykepengesoknadKvitteringContainer from '../containers/sykepengesoknad/SykepengesoknadKvitteringContainer';
import AktivitetskravvarselContainer from '../containers/aktivitetskrav/AktivitetskravvarselContainer';

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
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/kvittering" component={SykepengesoknadKvitteringContainer} />
        <Route path="/sykefravaer/roller-og-ansvarsomrader" component={RollerContainer} />
        <Route path="/sykefravaer/dialogmote" component={MoteContainer} />
        <Route path="/sykefravaer/oppfolgingsplaner" component={OppfolgingsdialogerContainer} />
        <Route path="/sykefravaer/oppfolgingsplaner/opprett" component={OpprettOppfolgingsdialogContainer} />
        <Route path="/sykefravaer/oppfolgingsplaner/:oppfolgingsdialogId" component={OppfolgingsdialogContainer} />
        <Route path="/sykefravaer/aktivitetsplikt" component={AktivitetskravvarselContainer} />
        <Route path="*" component={LandingssideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.shape({
        replace: PropTypes.func,
        push: PropTypes.func,
    }),
};

export default AppRouter;
