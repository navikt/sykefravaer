import React, { PropTypes, Component } from 'react';
import { getLedetekst, Utvidbar } from 'digisyfo-npm';
import { OppfolgingsdialogInnholdboks } from 'oppfolgingsdialog-npm';

export class ArbeidsgiverHarTvangsgodkjent extends Component {

    componentWillMount() {
        if (!this.props.dokument.hentet && !this.props.dokument.henter && this.props.dokument.oppfoelgingsdialogId !== this.props.oppfolgingsdialog.oppfoelgingsdialogId) {
            this.props.hentPdfurler(this.props.oppfolgingsdialog.oppfoelgingsdialogId, 1);
        }
    }

    render() {
        const { ledetekster, dokument, markerMottattTvungenGodkjenning } = this.props;

        let panel;
        if (dokument.henter) {
            panel = <div className="app-spinner" aria-label="Vent litt mens siden laster" />;
        } else if (dokument.hentingFeilet) {
            panel = <div>Beklager, vi kunne ikke hente dokumentet på dette tidspunktet. Prøv igjen senere!</div>;
        } else {
            panel = dokument.data.map((url, idx) => {
                return (
                    <div key={idx} style={{ borderBottom: '1px solid' }}>
                        <img className="godkjentPlanPdf__side" src={url} alt="godkjentplan" type="application/pdf" />
                    </div>
                );
            });
        }
        return (<div>
            <OppfolgingsdialogInnholdboks
                liteikon
                svgUrl="/sykefravaer/img/svg/varseltrekant.svg"
                svgAlt="godkjent"
                tittel="Lederen din har opprettet en versjon av oppfølgingsplanen"
            >
                <p>Om du er uenig i innholdet i planen så må du snakke med arbeidsgiveren din.</p>
                <Utvidbar className="utvidbar--oppfolgingsplan" tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplan.godkjent.utvidbar.tittel', ledetekster)}>
                    <div className="godkjentPlanPdf">
                        { panel }
                    </div>
                </Utvidbar>

                <div className="knapperad knapperad--justervenstre">
                    <button className="knapp knapperad__element" type="button" onClick={markerMottattTvungenGodkjenning}>VIDERE</button>
                </div>
            </OppfolgingsdialogInnholdboks>
        </div>);
    }

}

ArbeidsgiverHarTvangsgodkjent.propTypes = {
    oppfolgingsdialog: PropTypes.object,
    markerMottattTvungenGodkjenning: PropTypes.func,
    dokument: PropTypes.object,
    ledetekster: PropTypes.object,
    hentPdfurler: PropTypes.func,
};

export default ArbeidsgiverHarTvangsgodkjent;

