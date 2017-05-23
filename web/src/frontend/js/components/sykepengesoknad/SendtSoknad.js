import React, { PropTypes, Component } from 'react';
import Sidetopp from '../Sidetopp';
import { Soknad, getLedetekst } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Soknadstatuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { connect } from 'react-redux';
import { startEndringForespurt } from '../../actions/sykepengesoknader_actions';
import Ettersending from './Ettersending';
import { KORRIGERT } from '../../enums/sykepengesoknadstatuser';

export const Avkrysset = ({ tekst }) => {
    return (<div className="oppsummering__avkrysset">
        <img src={`${window.APP_SETTINGS.APP_ROOT}/img/png/check-box-1.png`} alt="Avkrysset" />
        <span>{tekst}</span>
    </div>);
};

Avkrysset.propTypes = {
    tekst: PropTypes.string,
};

const getSistSendtDato = (s) => {
    if (s.sendtTilNAVDato && s.sendtTilArbeidsgiverDato) {
        if (s.sendtTilNAVDato.getTime() > s.sendtTilArbeidsgiverDato.getTime()) {
            return s.sendtTilNAVDato;
        }
        return s.sendtTilArbeidsgiverDato;
    }
    if (s.sendtTilNAVDato) {
        return s.sendtTilNAVDato;
    }
    return s.sendtTilArbeidsgiverDato;
}

export const Knapperad = (props) => {
    const { sykepengesoknad, dispatch } = props;
    if (sykepengesoknad.status === KORRIGERT) {
        return null;
    }
    const frist = new Date();
    const ANTALL_MAANEDER_KORRIGERING_ER_MULIG = 3;
    frist.setMonth(frist.getMonth() - ANTALL_MAANEDER_KORRIGERING_ER_MULIG);
    const sendtDato = getSistSendtDato(sykepengesoknad);
    return (<div className="knapperad">
        {
            sendtDato.getTime() >= frist.getTime() && <div className="knapperad__element">
                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch(startEndringForespurt(sykepengesoknad.id));
                }} className="rammeknapp rammeknapp--mini js-endre">Endre søknad</button>
            </div>
        }
        <Ettersending {...props} manglendeDato="sendtTilNAVDato" ledetekstKeySuffix="send-til-nav" />
        <Ettersending {...props} manglendeDato="sendtTilArbeidsgiverDato" ledetekstKeySuffix="send-til-arbeidsgiver" />
    </div>);
}

Knapperad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    dispatch: PropTypes.func,
};

export const ConnectedKnapperad = connect()(Knapperad);

class SendtSoknad extends Component {
    scrollTilTopp() {
        scrollTo(this.refs.sendtSoknad, 300);
    }

    render() {
        const { sykepengesoknad } = this.props;
        return (<div ref="sendtSoknad">
            <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
            <Soknadstatuspanel sykepengesoknad={sykepengesoknad}>
                <ConnectedKnapperad sykepengesoknad={sykepengesoknad} scrollTilTopp={() => {
                    this.scrollTilTopp();
                }} />
            </Soknadstatuspanel>
            <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />
            <Soknad sykepengesoknad={sykepengesoknad} tittel="Oppsummering" />
            <div className="bekreftet-container">
                <Avkrysset tekst={getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')} />
            </div>
        </div>);
    }
}

SendtSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SendtSoknad;
