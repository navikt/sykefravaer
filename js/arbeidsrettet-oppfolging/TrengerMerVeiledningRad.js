import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PT from 'prop-types';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import history from '../history';
import { bekreftMerVeiledning } from './data/merVeiledningActions';
import { selectAlleHarMerVeiledningIder } from '../landingsside/data/hendelser/hendelser';
import { hentHendelser } from '../landingsside/data/hendelser/hendelserActions';
import Feilstripe from '../components/Feilstripe';
import logger from '../logging';

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
            <div className="infoside-fo__rad infoside-fo__rad--graa">
                <div className="begrensning">
                    <Systemtittel className="blokk-s">{getLedetekst('infoside-fo.veiledning.overskrift')}</Systemtittel>
                    <div className="redaksjonelt-innhold">{getLedetekst('infoside-fo.veiledning.tekst')}</div>
                    <div
                        className="redaksjonelt-innhold blokk"
                        onClick={(e) => {
                            if (e.target.tagName === 'A') {
                                logger.event('syfo.cv.lenke.klikk', {}, {});
                            }
                        }}
                        dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.veiledning.tekst-cv')}
                    />
                    <Feilstripe vis={bekreftingFeilet} className="blokk-s" />
                    <div className="infoside-fo__knapperad">
                        <Knapp onClick={this.handleNeiBtnClicked} disabled={bekrefter}>
                            {getLedetekst('infoside-fo.knapp-nei')}
                        </Knapp>
                        <Hovedknapp onClick={this.handleJaBtnClicked} spinner={bekrefter} disabled={bekrefter}>
                            {getLedetekst('infoside-fo.knapp-ja')}
                        </Hovedknapp>
                    </div>
                </div>
            </div>
            /* eslint-enable jsx-a11y/no-static-element-interactions */
        );
    }
}

TrengerMerVeiledningRad.propTypes = {
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
)(TrengerMerVeiledningRad);
