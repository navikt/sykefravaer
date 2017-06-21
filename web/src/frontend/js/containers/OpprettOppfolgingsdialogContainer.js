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
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentLedere } from '../actions/ledere_actions';
import {
    opprettOppfolgingsdialogAt as opprettOppfolgingsdialog,
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
} from 'oppfolgingsdialog-npm';

export class OpprettOppfolgingsdialogSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arbeidsgiver: '',
        };
        this.opprett = this.opprett.bind(this);
    }

    componentWillMount() {
        const { sykmeldingerHentet, ledereHentet } = this.props;
        if (!sykmeldingerHentet) {
            this.props.hentDineSykmeldinger();
        }
        if (!ledereHentet) {
            this.props.hentLedere();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.oppretter && this.props.opprettet) {
            history.push('/sykefravaer/oppfolgingsplaner/');
            this.props.hentOppfolgingsdialoger();
        }
    }

    handleOptionChange(e) {
        this.setState({
            arbeidsgiver: e.target.value,
        });
    }

    nesteSide() {
        this.setState({
            side: this.state.side + 1,
        });
    }
    opprett(values) {
        this.props.opprettOppfolgingsdialog(values.arbeidsgiver);
    }

    render() {
        const { brodsmuler, sykmeldinger, naermesteLedere, henter, hentingFeilet, oppretter, opprettingFeilet } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialoger.opprett.tittel')} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter || oppretter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || opprettingFeilet) {
                        return (<Feilmelding />);
                    }
                    return (
                        <div>
                            <Sidetopp
                                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OpprettOppfolgingsdialog
                                sykmeldinger={sykmeldinger}
                                naermesteLedere={naermesteLedere}
                                avbrytHref="/sykefravaer/oppfolgingsplaner"
                                velgArbeidsgiver={this.opprett}
                            />
                        </div>);
                })()
            }
        </Side>);
    }
}

OpprettOppfolgingsdialogSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    oppretter: PropTypes.bool,
    opprettet: PropTypes.bool,
    opprettingFeilet: PropTypes.bool,
    opprettOppfolgingsdialog: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    sykmeldinger: PropTypes.array,
    sykmeldingerHentet: PropTypes.bool,
    hentDineSykmeldinger: PropTypes.func,
    naermesteLedere: PropTypes.array,
    ledereHentet: PropTypes.bool,
    hentLedere: PropTypes.func,
};

export const mapStateToProps = (state) => {
    return {
        ledetekster: state.ledetekster.data,
        sykmeldinger: state.dineSykmeldinger.data,
        naermesteLedere: state.ledere.data,
        henter: state.ledetekster.henter || state.dineSykmeldinger.henter || state.ledere.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.dineSykmeldinger.henter || state.ledere.henter,
        oppretter: state.oppfolgingsdialoger.oppretter,
        opprettet: state.oppfolgingsdialoger.opprettet,
        opprettingFeilet: state.oppfolgingsdialoger.opprettingFeilet,
        sykmeldingerHentet: state.dineSykmeldinger.hentet,
        ledereHentet: state.ledere.hentet,
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

const OppfolgingsdialogContainer = connect(mapStateToProps, { opprettOppfolgingsdialog, hentOppfolgingsdialoger, hentDineSykmeldinger, hentLedere })(OpprettOppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
