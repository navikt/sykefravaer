import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PT from 'prop-types';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import history from '../../history';
import { bekreftMerVeiledning } from '../../actions/merVeiledning_actions';
import { selectAlleHarMerVeiledningIder } from '../../reducers/hendelser';
import { hentHendelser } from '../../actions/hendelser_actions';
import Feilstripe from '../Feilstripe';
import { getHtmlLedetekst } from '@navikt/digisyfo-npm/lib/index';
import { toggleCVTekstArbeidsrettetOppfolging } from '../../selectors/unleashTogglesSelectors';

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
        const { bekrefter, bekreftingFeilet, toggleCVTekstArbeidsrettetOppfolging } = this.props;
        return (
            <div className="infoside-fo__rad infoside-fo__rad--graa">
                <div className="begrensning">
                    <Undertittel className="blokk-s">{getLedetekst('infoside-fo.veiledning.overskrift')}</Undertittel>
                    <Normaltekst className="blokk-xs">{getLedetekst('infoside-fo.veiledning.tekst')}</Normaltekst>
                    {
                        toggleCVTekstArbeidsrettetOppfolging
                            ? <div
                                dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.veiledning.tekst_cv')}
                            />
                            : null
                    }

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
        );
    }
}

TrengerMerVeiledningRad.propTypes = {
    doBekreftMerVeiledning: PT.func,
    doHentHendelser: PT.func,
    bekrefter: PT.bool,
    bekreftingFeilet: PT.bool,
    merVeiledningHendelseIder: PT.arrayOf(PT.number),
    toggleCVTekstArbeidsrettetOppfolging: PT.bool,
};

const mapStateToProps = (state) => {
    return {
        merVeiledningHendelseIder: selectAlleHarMerVeiledningIder(state),
        bekrefter: state.merVeiledning.bekrefter,
        bekreftingFeilet: state.merVeiledning.bekreftingFeilet,
        toggleCVTekstArbeidsrettetOppfolging: toggleCVTekstArbeidsrettetOppfolging(state),
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
