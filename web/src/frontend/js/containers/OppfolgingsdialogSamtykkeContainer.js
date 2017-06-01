import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Sidetopp from '../components/Sidetopp';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../propTypes';
import { OppfolgingsdialogSamtykke, giSamtykke } from 'oppfolgingsdialog-npm';

export class OppfolgingsdialogSamtykkeSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            samtykket: false,
        };
        this.samtykk = this.samtykk.bind(this);
    }

    samtykk(value) {
        if (value.samtykkeInput) {
            this.setState({
                samtykket: true,
            });
            this.props.giSamtykke(this.props.oppfolgingsdialogId);
        }
    }

    render() {
        const { brodsmuler, ledetekster, henter, hentingFeilet } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialoger.opprett.tittel')} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    }

                    return (
                        <div>
                            <Sidetopp
                                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OppfolgingsdialogSamtykke
                                ledetekster={ledetekster}
                                avbrytHref={"/sykefravaer/oppfolgingsdialoger"}
                                svgUrl="/sykefravaer/img/svg/samtykke.svg"
                                svgAlt="samtykkeIllustrasjon"
                                samtykk={this.samtykk}
                            />
                        </div>);
                })()
            }
        </Side>);
    }
}

OppfolgingsdialogSamtykkeSide.propTypes = {
    oppfolgingsdialogId: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    giSamtykke: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;

    return {
        oppfolgingsdialogId,
        ledetekster: state.ledetekster.data,
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsdialoger',
        }],
    };
};

const OppfolgingsdialogSamtykkeContainer = connect(mapStateToProps, { giSamtykke })(OppfolgingsdialogSamtykkeSide);

export default OppfolgingsdialogSamtykkeContainer;
