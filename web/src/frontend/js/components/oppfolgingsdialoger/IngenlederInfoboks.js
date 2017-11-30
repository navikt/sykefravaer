import React, { Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst } from 'digisyfo-npm';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';

class IngenledereInfoboks extends Component {
    componentWillMount() {
        window.location.hash = 'godkjenn';
    }

    render() {
        return (<div>
            <OppfolgingsdialogInfoboks
                svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-ingenleder.svg`}
                svgAlt="Ingen Leder"
                tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.ingenlederInfoboks.tittel')}
                tekst={<p>{getLedetekst('oppfolgingsdialog.arbeidstaker.ingenlederInfoboks.tekst')}</p>}
            />
            <div className="knapperad">
                <Link className="rammeknapp" to={`${getContextRoot()}/oppfolgingsplaner`}>
                    {getLedetekst('oppfolgingsdialog.knapp.tilbake-oversikten')}
                </Link>
            </div>
        </div>);
    }
}

export default IngenledereInfoboks;
