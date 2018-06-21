import React from 'react';
import PropTypes from 'prop-types';
import {Route, Router} from 'react-router';
import DineSykmeldingerContainer from '../containers/sykmeldinger/DineSykmeldingerContainer';
import LandingssideContainer from '../containers/landingsside/LandingssideContainer';
import {DinSykmeldingContainer} from '../containers/sykmelding/DinSykmeldingContainer';
import SkrivUtSykmeldingContainer from '../containers/sykmelding/SkrivUtSykmeldingContainer';
import TidslinjeContainer from '../containers/tidslinje/TidslinjeContainer';
import SykmeldingKvitteringContainer from '../containers/sykmelding/SykmeldingKvitteringContainer';
import RollerContainer from '../containers/RollerContainer';
import MoteContainer from '../containers/mote/MoteContainer';
import SoknaderContainer from '../containers/sykepengesoknader/SoknaderContainer';
import OppfolgingsdialogerContainer from '../containers/oppfolgingsdialoger/OppfolgingsdialogerContainer';
import OppfolgingsdialogContainer from '../containers/oppfolgingsdialog/OppfolgingsdialogContainer';
import AktivitetskravvarselContainer from '../containers/aktivitetskrav/AktivitetskravvarselContainer';
import SykepengesoknadContainer from '../containers/sykepengesoknad-felles/SykepengesoknadContainer';
import {hentSoknaderTest} from "../actions/brukerinfo_actions";
import {connect} from "react-redux";

const HemmeligKnapp = ({hentSoknaderTest}) => (
    <button onClick={hentSoknaderTest}>hemmelig knapp</button>
);

const mapDispatchToProps = {
    hentSoknaderTest,
};

const HemmeligKnappConnected = connect(null, mapDispatchToProps)(HemmeligKnapp);

const AppRouter = ({history}) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={LandingssideContainer}/>
        <Route path="/sykefravaer/hemmelig" component={HemmeligKnappConnected}/>
        <Route path="/sykefravaer/tidslinjen" component={TidslinjeContainer}/>
        <Route path="/sykefravaer/tidslinjen/:arbeidssituasjon" component={TidslinjeContainer}/>
        <Route path="/sykefravaer/sykmeldinger" component={DineSykmeldingerContainer}/>
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId" component={DinSykmeldingContainer}/>
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/skriv-ut" component={SkrivUtSykmeldingContainer}/>
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/kvittering" component={SykmeldingKvitteringContainer}/>
        <Route path="/sykefravaer/soknader" component={SoknaderContainer}/>
        <Route path="/sykefravaer/soknader/:sykepengesoknadId" component={SykepengesoknadContainer}/>
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/fravaer-og-friskmelding" component={SykepengesoknadContainer}/>
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/aktiviteter-i-sykmeldingsperioden" component={SykepengesoknadContainer}/>
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/oppsummering" component={SykepengesoknadContainer}K/>
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/kvittering" component={SykepengesoknadContainer}/>
        <Route path="/sykefravaer/roller-og-ansvarsomrader" component={RollerContainer}/>
        <Route path="/sykefravaer/dialogmote" component={MoteContainer}/>
        <Route path="/sykefravaer/oppfolgingsplaner" component={OppfolgingsdialogerContainer}/>
        <Route path="/sykefravaer/oppfolgingsplaner/:oppfolgingsdialogId" component={OppfolgingsdialogContainer}/>
        <Route path="/sykefravaer/aktivitetsplikt" component={AktivitetskravvarselContainer}/>
        <Route path="*" component={LandingssideContainer}/>
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.shape({
        replace: PropTypes.func,
        push: PropTypes.func,
    }),
};

export default AppRouter;
