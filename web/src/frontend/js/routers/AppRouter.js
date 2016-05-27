import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import DineSykmeldingerContainer from '../containers/DineSykmeldingerContainer.js';
import SykmeldingOgOppfolgingContainer from '../containers/SykmeldingOgOppfolgingContainer.js';
import { DinSykmeldingContainer } from '../containers/DinSykmeldingContainer.js';
import FeilContainer from '../containers/FeilContainer.js';
import { SendTilArbeidsgiverContainer } from '../containers/SendTilArbeidsgiverContainer.js';

const Feil = () => {
    return <p>Gå til /app</p>;
};

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={Feil} />
        <Route path="/sykefravaer/app" component={SykmeldingOgOppfolgingContainer} />
        <Route path="/sykefravaer/app/sykmeldinger" component={DineSykmeldingerContainer} />
        <Route path="/sykefravaer/app/sykmeldinger/:sykmeldingId" component={DinSykmeldingContainer} />
        <Route path="/sykefravaer/app/sykmeldinger/:sykmeldingId/send" component={SendTilArbeidsgiverContainer} />
        <Route path="*" component={FeilContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
