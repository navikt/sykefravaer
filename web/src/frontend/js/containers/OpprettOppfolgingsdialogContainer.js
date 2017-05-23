import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Sidetopp from '../components/Sidetopp';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
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

const OppfolgingsdialogContainer = connect(mapStateToProps, { opprettOppfolgingsdialog })(OpprettOppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
