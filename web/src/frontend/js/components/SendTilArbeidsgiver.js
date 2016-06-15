import React, { PropTypes, Component } from 'react';
import { getLedetekst } from '../ledetekster';
import VelgArbeidsgiverContainer from '../containers/VelgArbeidsgiverContainer.js';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding.js';

class SendTilArbeidsgiver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feilmelding: ''
        };
    }

    valider(e) {
        let feilmelding;
        const sykmelding = this.props.sykmelding;
        if (!sykmelding.valgtArbeidsgiver) {
            this.setState({
                feilmelding: 'Du må velge en arbeidsgiver',
            });
        } else if(sykmelding.valgtArbeidsgiver.orgnummer === '0') {
            this.setState({
                feilmelding: 'Du må sende sykmeldingen på papir',
            });
        } else {
            this.setState({
                feilmelding: '',
            });
        }
    }

    render() {
        const { sykmelding, ledetekster } = this.props; 
        return (<form className="panel" onSubmit={(e) => {
            e.preventDefault(); 
            this.valider();
        }}>
            <h1 className="typo-innholdstittel tittel-dekorert blokk-l">{getLedetekst('send-til-arbeidsgiver.hovedtittel', ledetekster)}</h1>
            <VelgArbeidsgiverContainer sykmelding={sykmelding} feilmelding={this.state.feilmelding} erFeil={this.state.feilmelding !== ''} />
            <ArbeidsgiversSykmelding sykmelding={sykmelding} ledetekster={ledetekster} />
            <p>{getLedetekst('send-til-arbeidsgiver.infotekst', ledetekster)}</p>
            <div className="knapperad">
                <input type="submit" className="knapp knapp-hoved" value="Send" />
            </div>
        </form>);
    }
};

SendTilArbeidsgiver.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SendTilArbeidsgiver;
