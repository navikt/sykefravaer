import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from '@navikt/digisyfo-npm';
import * as PT from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import history from '../history';
import { bekreftMerVeiledning } from './data/merVeiledningActions';
import { selectAlleHarMerVeiledningIder } from '../landingsside/data/hendelser/hendelser';
import { hentHendelser } from '../landingsside/data/hendelser/hendelserActions';
import Feilstripe from '../components/Feilstripe';
import AppSpinner from '../components/AppSpinner';
import { pushToDataAOLayer } from './pushToAODataLayer';
import countClickAction, { CountClickActionTypes } from '../data/metrikker/countClickAction';

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
        countClickAction(CountClickActionTypes.NEI_KLIKK).next();
        this.bekreftAlleMerVeiledninghendelser(() => {
            return history.push('/sykefravaer');
        });
    }

    handleJaBtnClicked() {
        pushToDataAOLayer('KLIKK_JA');
        countClickAction(CountClickActionTypes.JA_KLIKK).next();
        this.bekreftAlleMerVeiledninghendelser(() => {
            return window.location.assign('/arbeidssokerregistrering/start?fraSykefravaer=true');
        });
    }

    render() {
        const { bekrefter, bekreftingFeilet } = this.props;
        return (
            <div className="blokk">
                <Feilstripe vis={bekreftingFeilet} className="blokk" />
                <div className="merVeiledning__knapper">
                    <Undertittel tag="h3" className="blokk">{getLedetekst('ao.mer-veiledning.sporsmal')}</Undertittel>
                    {
                        !bekrefter
                            ? (
                                <React.Fragment>
                                    <Hovedknapp style={{ marginRight: '2rem' }} onClick={this.handleJaBtnClicked}>
                                        {getLedetekst('ao.mer-veiledning.ja')}
                                    </Hovedknapp>
                                    <Knapp onClick={this.handleNeiBtnClicked}>
                                        {getLedetekst('ao.mer-veiledning.nei')}
                                    </Knapp>
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
