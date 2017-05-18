import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../propTypes';
import OpprettOppfolgingsdialog from '../components/oppfolgingsdialoger/OpprettOppfolgingsdialog';
import { hentAlleArbeidsgivere } from '../actions/alleArbeidsgivere_actions';

export class OpprettOppfolgingsdialogSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arbeidsgiverValgt: '',
        };
        this.velgArbeidsgiver = this.velgArbeidsgiver.bind(this);
    }

    componentWillMount() {
        this.props.hentAlleArbeidsgivere();
    }

    velgArbeidsgiver(value) {
        this.setState({
            arbeidsgiverValgt: value.arbeidsgiver,
        });
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
                    } else if (this.state.arbeidsgiverValgt !== '') {
                        // Legg inn Samtykke-komponent
                    }
                    return (
                        <OpprettOppfolgingsdialog
                            arbeidsgivere={arbeidsgivere}
                            ledetekster={ledetekster}
                            avbrytHref={"/sykefravaer/oppfolgingsdialoger"}
                            velgArbeidsgiver={this.velgArbeidsgiver}
                        />);
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
