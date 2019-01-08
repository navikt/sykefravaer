import React from 'react';
import { connect } from 'react-redux';
import * as PT from 'prop-types';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';
import history from '../../history';
import { bekreftMerVeiledning } from '../../actions/merVeiledning_actions';
import { selectAlleHarMerVeiledningIder } from '../../reducers/hendelser';
import { henterSoknader } from '../../actions/soknader_actions';

const TrengerMerVeiledningRad = ({ doBekreftMerVeiledning, doHentHendelser, merVeiledningHendelseIder }) => {
    const bekreftAlleMerVeiledninghendelser = () => {
        merVeiledningHendelseIder.forEach((id) => {
            doBekreftMerVeiledning(id);
        });
    };

    const handleNeiBtnClicked = () => {
        bekreftAlleMerVeiledninghendelser();
        doHentHendelser();
        history.push(`${process.env.REACT_APP_CONTEXT_ROOT}`);
    };

    const handleJaBtnClicked = () => {
        bekreftAlleMerVeiledninghendelser();
        window.location.href = '/arbeidssokerregistrering/?fraSykefravaer=true';
    };

    return (
        <div className="infoside-fo__rad infoside-fo__rad--graa">
            <div className="begrensning">
                <Undertittel className="blokk-s">{getLedetekst('infoside-fo.veiledning.overskrift')}</Undertittel>
                <Normaltekst className="blokk-xs">{getLedetekst('infoside-fo.veiledning.tekst')}</Normaltekst>
                <div className="infoside-fo__knapperad">
                    <Knapp onClick={handleNeiBtnClicked}>
                        {getLedetekst('infoside-fo.knapp-nei')}
                    </Knapp>
                    <Hovedknapp onClick={handleJaBtnClicked}>
                        {getLedetekst('infoside-fo.knapp-ja')}
                    </Hovedknapp>
                </div>
            </div>
        </div>
    );
};

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
    doHentHendelser: henterSoknader,
};

export default connect(
    mapStateToProps,
    actionCreators,
)(TrengerMerVeiledningRad);
