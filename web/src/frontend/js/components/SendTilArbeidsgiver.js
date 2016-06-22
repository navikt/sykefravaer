import React, { PropTypes, Component } from 'react';
import { getLedetekst } from '../ledetekster';
import VelgArbeidsgiverContainer from '../containers/VelgArbeidsgiverContainer.js';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding.js';
import { scrollTo } from '../utils';

class SendTilArbeidsgiver extends Component {

    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
    }

    getDefaultState() {
        return {
            forsoektSendt: false,
            erFeil: false,
            feilmelding: '',
        };
    }

    scrollTilFeilmelding() {
        scrollTo(this.refs['js-velg-arbeidsgiver'], 200);
    }

    validerSykmelding() {
        const { sykmelding: { valgtArbeidsgiver } } = this.props;
        const erFeil = !valgtArbeidsgiver || valgtArbeidsgiver.orgnummer === '0';
        this.setState({
            forsoektSendt: true,
        });
        if (!valgtArbeidsgiver) {
            this.setState({
                erFeil: true,
                feilmelding: 'Vennligst velg arbeidsgiver',
            });
        } else if (valgtArbeidsgiver.orgnummer === '0') {
            this.setState({
                erFeil: true,
                feilmelding: 'Du må sende sykmeldingen på papir',
            });
        }
        return erFeil;
    }

    submitHandler(e) {
        if (e) {
            e.preventDefault();
        }
        if (this.validerSykmelding()) {
            this.scrollTilFeilmelding();
        } else {
            this.props.sendSykmelding(this.props.sykmelding.id);
        }
    }

    resetState() {
        this.setState(this.getDefaultState());
    }

    render() {
        const { sykmelding, ledetekster, sender, sendingFeilet } = this.props;
        return (<form className="panel">
            <h1 className="typo-innholdstittel tittel-dekorert blokk-l">{getLedetekst('send-til-arbeidsgiver.hovedtittel', ledetekster)}</h1>
            <div ref="js-velg-arbeidsgiver">
                <VelgArbeidsgiverContainer {...this.state} sykmelding={sykmelding} resetState={() => {
                    this.resetState();
                }} />
            </div>
            <div className="blokk">
                <ArbeidsgiversSykmelding sykmelding={sykmelding} ledetekster={ledetekster} />
            </div>
            <p className="blokk">{getLedetekst('send-til-arbeidsgiver.infotekst', ledetekster)}</p>
            <div aria-live="polite" role="alert">
                { sendingFeilet &&
                    <div className="panel panel-ramme">
                        <p className="varselstripe varselstripe--feil">Beklager, det oppstod en feil! Prøv igjen litt senere.</p>
                    </div>
                }
            </div>
            <div className="knapperad">
                <button type="button" className={`js-send knapp knapp-hoved ${(sender) ? 'er-inaktiv knapp-spinner' : ''}`} onClick={(e) => {
                    this.submitHandler(e);
                }}>
                    {getLedetekst('send-til-arbeidsgiver.send.knappetekst', ledetekster)}
                    <span className="spinner-knapp" />
                </button>
            </div>
        </form>);
    }
}

SendTilArbeidsgiver.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    sendSykmelding: PropTypes.func,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
};

export default SendTilArbeidsgiver;
