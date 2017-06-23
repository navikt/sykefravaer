import React, { Component, PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import {
    OppfolgingsdialogSide,
    OppfolgingsdialogSamtykke,
    GodkjennPlanOversikt,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';

export const RenderGodkjennPlanKnapper = ({ toggleTiltakSkjema }) => {
    return (
        <div className="knapperad">
            <button
                className="knapp knapperad__element"
                onClick={toggleTiltakSkjema}>
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.leggtil-tiltak')}
            </button>
        </div>
    );
};
RenderGodkjennPlanKnapper.propTypes = {
    toggleTiltakSkjema: PropTypes.func,
};

export class Plan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            side: 0,
        };
        this.forrigeSide = this.forrigeSide.bind(this);
        this.nesteSide = this.nesteSide.bind(this);
    }

    forrigeSide() {
        this.setState({
            side: this.state.side - 1,
        });
    }

    nesteSide() {
        this.setState({
            side: this.state.side + 1,
        });
    }

    render() {
        const { ledetekster, oppfolgingsdialog, oppfolgingsdialogId, giSamtykkeSvar } = this.props;

        return (
            <OppfolgingsdialogSide
                brukernavn={oppfolgingsdialog.virksomhetsnavn}
                ledetekster={ledetekster}
                rootUrl={`/sykefravaer/oppfolgingsplaner/${oppfolgingsdialogId}`}>
                {
                    !oppfolgingsdialog.godkjentAvArbeidstaker && this.state.side === 0 &&
                    <GodkjennPlanOversikt
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        nesteSide={this.nesteSide}
                        varselstripeTekst={getLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplanskjema.varselstripe.tekst')}
                        rootUrl={`${getContextRoot()}`}
                    />
                }
                {
                    !oppfolgingsdialog.godkjentAvArbeidstaker && this.state.side === 1 &&
                        <OppfolgingsdialogSamtykke
                            ledetekster={ledetekster}
                            avbryt={this.forrigeSide}
                            svgUrl="/sykefravaer/img/svg/samtykke.svg"
                            svgAlt="samtykkeIllustrasjon"
                            giSamtykkeSvar={giSamtykkeSvar}
                        />
                }
                {
                    oppfolgingsdialog.godkjentAvArbeidstaker && !oppfolgingsdialog.godkjentAvArbeidsgiver &&
                        <div>
                            Se din plan, venter paa godkjenning fra arbeidsgiver
                        </div>
                }
                {
                    oppfolgingsdialog.godkjentAvArbeidsgiver &&
                    <div>
                        Din arbeidsgiver har godkjent plan, du maa godkjenne
                    </div>
                }
            </OppfolgingsdialogSide>
        );
    }
}

Plan.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    giSamtykkeSvar: PropTypes.func,
};

export default Plan;
