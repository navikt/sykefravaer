import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, Utvidbar, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogInnholdboks,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';

class ArbeidsgiverHarTvangsgodkjent extends Component {
    componentWillMount() {
        if (!this.props.dokument.hentet && !this.props.dokument.henter && this.props.dokument.id !== this.props.oppfolgingsdialog.id) {
            this.props.hentPdfurler(this.props.oppfolgingsdialog.id, 1);
        }
    }

    render() {
        const { ledetekster, dokument, markerMottattTvungenGodkjenning } = this.props;

        let panel;
        if (dokument.henter) {
            panel = <div className="app-spinner" aria-label="Vent litt mens siden laster" />;
        } else if (dokument.hentingFeilet) {
            panel = (<div className="godkjentPlanPdf__feilmelding">
                {getLedetekst('oppfolgingsdialog.arbeidsgiverhartvangsgodkjent.feilmelding.hentdokument')}
            </div>);
        } else {
            panel = dokument.data && dokument.data.map((url, idx) => {
                return (
                    <div className="godkjentPlanPdf__dokument" key={idx}>
                        <img className="godkjentPlanPdf__side" src={url} alt="godkjentplan" type="application/pdf" />
                    </div>
                );
            });
        }
        return (
            <OppfolgingsdialogInnholdboks
                liteikon
                svgUrl={`${getContextRoot()}/img/svg/varseltrekant.svg`}
                svgAlt="godkjent"
                tittel={getLedetekst('oppfolgingsdialog.arbeidsgiverhartvangsgodkjent.tittel')}
            >
                <div className="arbeidsgiverHarTvangsgodkjent">
                    <p>{getLedetekst('oppfolgingsdialog.arbeidsgiverhartvangsgodkjent.tekst')}</p>
                    <Utvidbar className="utvidbar--oppfolgingsplan" tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplan.godkjent.utvidbar.tittel', ledetekster)}>
                        <div className="godkjentPlanPdf">
                            { panel }
                        </div>
                    </Utvidbar>

                    <div className="knapperad">
                        <button className="knapp knapperad__element" type="button" onClick={markerMottattTvungenGodkjenning}>
                            {getLedetekst('oppfolgingsdialog.knapp.videre')}
                        </button>
                    </div>
                </div>
            </OppfolgingsdialogInnholdboks>);
    }
}

ArbeidsgiverHarTvangsgodkjent.propTypes = {
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    markerMottattTvungenGodkjenning: PropTypes.func,
    dokument: oppfolgingProptypes.dokumentReducerPt,
    ledetekster: keyValue,
    hentPdfurler: PropTypes.func,
};

export default ArbeidsgiverHarTvangsgodkjent;

