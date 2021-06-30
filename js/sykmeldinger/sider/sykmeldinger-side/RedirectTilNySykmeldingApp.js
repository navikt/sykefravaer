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
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h1>Denne siden er ikke lengre i bruk</h1>
                <p>Vi videresender deg til den oppdaterte siden</p>
            </div>
        );
    }
}

export default RedirectTilNySykmeldingApp;
