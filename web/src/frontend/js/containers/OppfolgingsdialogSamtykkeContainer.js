import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Sidetopp from '../components/Sidetopp';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import history from '../history';
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

    componentDidUpdate(prevProps) {
        if (prevProps.sender && this.props.sendt) {
            history.push(`/sykefravaer/oppfolgingsplaner/${this.props.oppfolgingsdialogId}/arbeidsoppgaver`);
        }
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
        const { brodsmuler, ledetekster, henter, hentingFeilet, sender, senderFeilet } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialoger.opprett.tittel')} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter || sender) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || senderFeilet) {
                        return (<Feilmelding />);
                    }

                    return (
                        <div>
                            <Sidetopp
                                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OppfolgingsdialogSamtykke
                                ledetekster={ledetekster}
                                avbrytHref="/sykefravaer/oppfolgingsplaner"
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
    sender: PropTypes.bool,
    sendt: PropTypes.bool,
    senderFeilet: PropTypes.bool,
    giSamtykke: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;

    return {
        oppfolgingsdialogId,
        ledetekster: state.ledetekster.data,
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
        sender: state.samtykke.sender,
        sendt: state.samtykke.sendt,
        senderFeilet: state.samtykke.senderFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsplaner',
        }],
    };
};

const OppfolgingsdialogSamtykkeContainer = connect(mapStateToProps, { giSamtykke })(OppfolgingsdialogSamtykkeSide);

export default OppfolgingsdialogSamtykkeContainer;
