import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PT from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import history from '../history';
import { bekreftMerVeiledning } from './data/merVeiledningActions';
import { selectAlleHarMerVeiledningIder } from '../landingsside/data/hendelser/hendelser';
import { hentHendelser } from '../landingsside/data/hendelser/hendelserActions';
import Feilstripe from '../components/Feilstripe';
import hentArbeidsrettetOppfolgingBilde from './hentArbeidsrettetOppfolgingBilde';
import AppSpinner from '../components/AppSpinner';

class MerVeiledning extends Component {
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
        const { merVeiledningHendelseIder, doBekreftMerVeiledning } = this.props;
        if (merVeiledningHendelseIder.length > 0) {
            doBekreftMerVeiledning(merVeiledningHendelseIder, callback);
        } else {
            callback();
        }
    }

    handleNeiBtnClicked() {
        this.bekreftAlleMerVeiledninghendelser(() => {
            return history.push('/sykefravaer');
        });
    }

    handleJaBtnClicked() {
        this.bekreftAlleMerVeiledninghendelser(() => {
            return window.location.assign('/arbeidssokerregistrering/start?fraSykefravaer=true');
        });
    }

    render() {
        const { bekrefter, bekreftingFeilet } = this.props;
        return (
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            <div className="panel panel--merVeiledning blokk">
                <div className="illustrertTittel">
                    <img className="illustrertTittel__img" src={hentArbeidsrettetOppfolgingBilde('veien-videre.svg')} alt="Veien videre" />
                    <h2 className="illustrertTittel__tittel illustrertTittel__tittel--innholdstittel">
                        Mer veiledning
                    </h2>
                </div>
                <div className="redaksjonelt-innhold blokk">
                    <p>Du kan få veiledning om økonomien din og hva du kan gjøre for å komme tilbake til jobb. Veiledningen blir
                    brukt til å kartlegge situasjonen din og dine behov framover.</p>
                </div>
                <Feilstripe vis={bekreftingFeilet} className="blokk" />
                <div className="merVeiledning__knapper">
                    <Undertittel tag="h3" className="blokk">Ønsker du mer <br /> veiledning fra NAV?</Undertittel>
                    {
                        !bekrefter
                            ? (<React.Fragment>
                                <p className="blokk--xxs">
                                    <Hovedknapp onClick={this.handleJaBtnClicked}>
                                        Ja
                                    </Hovedknapp>
                                </p>
                                <p className="blokk--xxs">
                                    <Flatknapp onClick={this.handleNeiBtnClicked}>
                                        Ikke nå
                                    </Flatknapp>
                                </p>
                            </React.Fragment>)
                            : <AppSpinner className="app-spinner--inline" />
                    }
                </div>
            </div>
            /* eslint-enable jsx-a11y/no-static-element-interactions */
        );
    }
}

MerVeiledning.propTypes = {
    doBekreftMerVeiledning: PT.func,
    doHentHendelser: PT.func,
    bekrefter: PT.bool,
    bekreftingFeilet: PT.bool,
    merVeiledningHendelseIder: PT.arrayOf(PT.number),
};

const mapStateToProps = (state) => {
    return {
        merVeiledningHendelseIder: selectAlleHarMerVeiledningIder(state),
        bekrefter: state.merVeiledning.bekrefter,
        bekreftingFeilet: state.merVeiledning.bekreftingFeilet,
    };
};

const actionCreators = {
    doBekreftMerVeiledning: bekreftMerVeiledning,
    doHentHendelser: hentHendelser,
};

export default connect(
    mapStateToProps,
    actionCreators,
)(MerVeiledning);
