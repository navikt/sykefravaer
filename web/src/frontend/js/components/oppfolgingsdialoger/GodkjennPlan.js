import React, { Component, PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import {
    OppfolgingsdialogSamtykke,
    GodkjennPlanOversikt,
    GodkjennPlanMottatt,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';

export class GodkjennPlan extends Component {

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
        const { ledetekster, oppfolgingsdialog, brukerType, giSamtykkeSvar } = this.props;

        return (
            <div>
                {
                    !oppfolgingsdialog.godkjentAvArbeidsgiver && this.state.side === 0 &&
                    <GodkjennPlanOversikt
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        nesteSide={this.nesteSide}
                        varselstripeTekst={getLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplanskjema.varselstripe.tekst')}
                        rootUrl={`${getContextRoot()}`}
                    />
                }
                {
                    oppfolgingsdialog.godkjentAvArbeidsgiver && this.state.side === 0 &&
                    <GodkjennPlanMottatt
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        nesteSide={this.nesteSide}
                        brukerType={brukerType}
                        rootUrl={`${getContextRoot()}`}
                    />
                }
                {
                    this.state.side === 1 &&
                        <OppfolgingsdialogSamtykke
                            ledetekster={ledetekster}
                            avbryt={this.forrigeSide}
                            svgUrl="/sykefravaer/img/svg/samtykke.svg"
                            svgAlt="samtykkeIllustrasjon"
                            giSamtykkeSvar={giSamtykkeSvar}
                        />
                }
            </div>
        );
    }
}

GodkjennPlan.propTypes = {
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    brukerType: PropTypes.string,
    giSamtykkeSvar: PropTypes.func,
};

export default GodkjennPlan;
