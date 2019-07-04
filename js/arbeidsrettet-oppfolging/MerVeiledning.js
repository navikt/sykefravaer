import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHtmlLedetekst, getLedetekst } from '@navikt/digisyfo-npm';
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
import { pushToDataAOLayer } from './pushToAODataLayer';

class MerVeiledning extends Component {
    constructor(props) {
        super(props);

        this.handleNeiBtnClicked = this.handleNeiBtnClicked.bind(this);
        this.handleJaBtnClicked = this.handleJaBtnClicked.bind(this);
        this.bekreftAlleMerVeiledninghendelser = this.bekreftAlleMerVeiledninghendelser.bind(this);
    }

    componentDidMount() {
        const { doHentHendelser } = this.props;
        doHentHendelser();
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
        pushToDataAOLayer('KLIKK_NEI');
        this.bekreftAlleMerVeiledninghendelser(() => {
            return history.push('/sykefravaer');
        });
    }

    handleJaBtnClicked() {
        pushToDataAOLayer('KLIKK_JA');
        this.bekreftAlleMerVeiledninghendelser(() => {
            return window.location.assign('/arbeidssokerregistrering/start?fraSykefravaer=true');
        });
    }

    render() {
        const { bekrefter, bekreftingFeilet } = this.props;
        return (
            <div className="panel panel--merVeiledning blokk">
                <div className="illustrertTittel">
                    <img className="illustrertTittel__img" src={hentArbeidsrettetOppfolgingBilde('veien-videre.svg')} alt="Veien videre" />
                    <h2 className="illustrertTittel__tittel illustrertTittel__tittel--innholdstittel">
                        {getLedetekst('ao.mer-veiledning.tittel')}
                    </h2>
                </div>
                <div
                    className="redaksjonelt-innhold blokk"
                    dangerouslySetInnerHTML={getHtmlLedetekst('ao.mer-veiledning.tekst')} />
                <Feilstripe vis={bekreftingFeilet} className="blokk" />
                <div className="merVeiledning__knapper">
                    <Undertittel tag="h3" className="blokk">{getLedetekst('ao.mer-veiledning.sporsmal')}</Undertittel>
                    {
                        !bekrefter
                            ? (
                                <React.Fragment>
                                    <p className="blokk--xxs">
                                        <Hovedknapp onClick={this.handleJaBtnClicked}>
                                            {getLedetekst('ao.mer-veiledning.ja')}
                                        </Hovedknapp>
                                    </p>
                                    <p className="blokk--xxs">
                                        <Flatknapp onClick={this.handleNeiBtnClicked}>
                                            {getLedetekst('ao.mer-veiledning.nei')}
                                        </Flatknapp>
                                    </p>
                                </React.Fragment>
                            )
                            : <AppSpinner className="app-spinner--inline" />
                    }
                </div>
            </div>
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
