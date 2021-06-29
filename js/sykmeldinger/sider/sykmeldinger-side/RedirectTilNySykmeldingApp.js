import React from 'react';
import { getSykmeldingerFrontendUrl } from '../../../landingsside/dine-oppgaver/DineOppgaverContainer';

class RedirectTilNySykmeldingApp extends React.Component {
    componentWillMount() {
        if (window.location.hostname.indexOf('localhost') < 0) {
            window.location.href = `${getSykmeldingerFrontendUrl()}/sykmeldinger`;
        }
    }

    render() {
        if (window.location.hostname.indexOf('localhost') > -1) {
            return <div>Du er i localhost, i produksjon vil du bli videresendt til ny sykmeldinger app</div>;
        }

        return (
            <div>Sender deg til ny sykmeldinger nettside...</div>
        );
    }
}

export default RedirectTilNySykmeldingApp;
