import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Sidetopp from '../components/Sidetopp';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../propTypes';
import OpprettOppfolgingsdialog from '../components/oppfolgingsdialoger/OpprettOppfolgingsdialog';
import { hentAlleArbeidsgivere } from '../actions/alleArbeidsgivere_actions';
import { OppfolgingsdialogSamtykke } from 'oppfolgingsdialog-npm';

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

    componentWillMount() {
        this.props.hentAlleArbeidsgivere();
    }

    handleOptionChange(e) {
        this.setState({
            arbeidsgiver: e.target.value,
        });
    }

    velgArbeidsgiver() {
        this.setState({
            arbeidsgiverValgt: true,
        });
    }

    samtykk(value) {
        if (value.samtykkeInput) {
            this.setState({
                samtykket: true,
            });
        }
    }

    render() {
        const { brodsmuler, ledetekster, henter, hentingFeilet, arbeidsgivere } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialoger.opprett.tittel')} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    } else if (this.state.arbeidsgiverValgt) {
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
                    }
                    return (
                        <div>
                            <Sidetopp
                                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OpprettOppfolgingsdialog
                                arbeidsgivere={arbeidsgivere}
                                ledetekster={ledetekster}
                                avbrytHref={"/sykefravaer/oppfolgingsdialoger"}
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
    sykmeldingId: PropTypes.string,
    hentAlleArbeidsgivere: PropTypes.func,
};

export const mapStateToProps = (state) => {
    return {
        ledetekster: state.ledetekster.data,
        arbeidsgivere: state.allearbeidsgivere.data,
        henter: state.ledetekster.henter || state.allearbeidsgivere.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.allearbeidsgivere.hentingFeilet,
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

const OppfolgingsdialogContainer = connect(mapStateToProps, { hentAlleArbeidsgivere })(OpprettOppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
