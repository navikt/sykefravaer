import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PT from 'prop-types';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';
import history from '../../history';
import { bekreftMerVeiledning } from '../../actions/merVeiledning_actions';
import { selectAlleHarMerVeiledningIder } from '../../reducers/hendelser';
import { hentHendelser } from '../../actions/hendelser_actions';

class TrengerMerVeiledningRad extends Component {
    constructor(props) {
        super(props);

        this.handleNeiBtnClicked = this.handleNeiBtnClicked.bind(this);
        this.handleJaBtnClicked = this.handleJaBtnClicked.bind(this);
        this.bekreftAlleMerVeiledninghendelser = this.bekreftAlleMerVeiledninghendelser.bind(this);
    }

    componentDidMount() {
        this.props.doHentHendelser();
    }

    bekreftAlleMerVeiledninghendelser(callback) {
        console.log('bekreft alle hendelser');
        this.props.merVeiledningHendelseIder.forEach((id) => {
            console.log(`bekrefter${id}`);
            this.props.doBekreftMerVeiledning(id, callback);
        });
    }

    handleNeiBtnClicked() {
        console.log('nei!');
        console.log(this);
        this.bekreftAlleMerVeiledninghendelser(() => {
            return history.push('/sykefravaer');
        });
    }

    handleJaBtnClicked() {
        this.bekreftAlleMerVeiledninghendelser(() => {
            return window.location.assign('/arbeidssokerregistrering/?fraSykefravaer=true');
        });
    }

    render() {
        return (
            <div className="infoside-fo__rad infoside-fo__rad--graa">
                <div className="begrensning">
                    <Undertittel className="blokk-s">{getLedetekst('infoside-fo.veiledning.overskrift')}</Undertittel>
                    <Normaltekst className="blokk-xs">{getLedetekst('infoside-fo.veiledning.tekst')}</Normaltekst>
                    <div className="infoside-fo__knapperad">
                        <Knapp onClick={this.handleNeiBtnClicked}>
                            {getLedetekst('infoside-fo.knapp-nei')}
                        </Knapp>
                        <Hovedknapp onClick={this.handleJaBtnClicked}>
                            {getLedetekst('infoside-fo.knapp-ja')}
                        </Hovedknapp>
                    </div>
                </div>
            </div>
        );
    }
}

TrengerMerVeiledningRad.propTypes = {
    doBekreftMerVeiledning: PT.func,
    doHentHendelser: PT.func,
    merVeiledningHendelseIder: PT.arrayOf(PT.number),
};

const mapStateToProps = (state) => {
    return {
        merVeiledningHendelseIder: selectAlleHarMerVeiledningIder(state),
    };
};

const actionCreators = {
    doBekreftMerVeiledning: bekreftMerVeiledning,
    doHentHendelser: hentHendelser,
};

export default connect(
    mapStateToProps,
    actionCreators,
)(TrengerMerVeiledningRad);
