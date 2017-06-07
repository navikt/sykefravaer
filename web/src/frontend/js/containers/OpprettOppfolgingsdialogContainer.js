import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Sidetopp from '../components/Sidetopp';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import history from '../history';
import { brodsmule as brodsmulePt } from '../propTypes';
import OpprettOppfolgingsdialog from '../components/oppfolgingsdialoger/OpprettOppfolgingsdialog';
import { OppfolgingsdialogSamtykke, opprettOppfolgingsdialogAt as opprettOppfolgingsdialog } from 'oppfolgingsdialog-npm';
import { finnArbeidsgivereForAktiveSykmeldinger } from '../utils/sykmeldingUtils';

export class OpprettOppfolgingsdialogSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arbeidsgiver: '',
            arbeidsgiverValgt: false,
            samtykket: false,
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.velgArbeidsgiver = this.velgArbeidsgiver.bind(this);
        this.samtykk = this.samtykk.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.oppretter && this.props.opprettet) {
            history.push('/sykefravaer/oppfolgingsplaner/');
        }
    }

    handleOptionChange(e) {
        this.setState({
            arbeidsgiver: e.target.value,
        });
    }

    velgArbeidsgiver() {
        if (this.state.arbeidsgiver !== '') {
            this.setState({
                arbeidsgiverValgt: true,
            });
        }
    }

    samtykk(value) {
        if (value.samtykkeInput) {
            this.setState({
                samtykket: true,
            });
            this.props.opprettOppfolgingsdialog(this.state.arbeidsgiver);
        }
    }

    render() {
        const { brodsmuler, ledetekster, henter, hentingFeilet, arbeidsgivere, oppretter, opprettingFeilet } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialoger.opprett.tittel')} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter || oppretter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || opprettingFeilet) {
                        return (<Feilmelding />);
                    } else if (this.state.arbeidsgiverValgt) {
                        return (
                            <div>
                                <Sidetopp
                                    tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OppfolgingsdialogSamtykke
                                ledetekster={ledetekster}
                                avbrytHref="/sykefravaer/oppfolgingsplaner"
                                svgUrl="/sykefravaer/img/svg/samtykke.svg"
                                svgAlt="samtykke"
                                samtykk={this.samtykk}
                            />
                            </div>);
                    }
                    return (
                        <div>
                            <Sidetopp
                                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OpprettOppfolgingsdialog
                                arbeidsgivere={arbeidsgivere}
                                avbrytHref="/sykefravaer/oppfolgingsplaner"
                                velgArbeidsgiver={this.velgArbeidsgiver}
                                arbeidsgiverValg={this.state.arbeidsgiver}
                                handleOptionChange={this.handleOptionChange}
                            />
                        </div>);
                })()
            }
        </Side>);
    }
}

OpprettOppfolgingsdialogSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    arbeidsgivere: PropTypes.array,
    ledetekster: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    oppretter: PropTypes.bool,
    opprettet: PropTypes.bool,
    opprettingFeilet: PropTypes.bool,
    opprettOppfolgingsdialog: PropTypes.func,
};

export const mapStateToProps = (state) => {
    const sykmeldinger = state.dineSykmeldinger.data;
    const naermesteLedere = state.ledere.data;

    return {
        ledetekster: state.ledetekster.data,
        arbeidsgivere: finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere),
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
        oppretter: state.oppfolgingsdialoger.oppretter,
        opprettet: state.oppfolgingsdialoger.opprettet,
        opprettingFeilet: state.oppfolgingsdialoger.opprettingFeilet,
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

const OppfolgingsdialogContainer = connect(mapStateToProps, { opprettOppfolgingsdialog })(OpprettOppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
