import React, { Component, PropTypes } from 'react';
import Sidetopp from '../Sidetopp';
import { Soknad, getLedetekst } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Soknadstatuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import Ettersending from './Ettersending';

export const Avkrysset = ({ tekst }) => {
    return (<div className="oppsummering__avkrysset">
        <img src={`${window.APP_SETTINGS.APP_ROOT}/img/png/check-box-1.png`} alt="Avkrysset" />
        <span>{tekst}</span>
    </div>);
};

Avkrysset.propTypes = {
    tekst: PropTypes.string,
};

export const Knapperad = (props) => {
    return (<div className="knapperad knapperad--adskilt">
        <Ettersending {...props} manglendeDato="sendtTilNAVDato" ledetekstKeySuffix="send-til-nav" />
        <Ettersending {...props} manglendeDato="sendtTilArbeidsgiverDato" ledetekstKeySuffix="send-til-arbeidsgiver" />
    </div>);
};

class SendtSoknad extends Component {
    scrollTilTopp() {
        scrollTo(this.refs.sendtSoknad, 300);
    }

    render() {
        const { sykepengesoknad } = this.props;
        return (<div ref="sendtSoknad">
            <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
            <Soknadstatuspanel sykepengesoknad={sykepengesoknad} />
            <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />
            <Soknad sykepengesoknad={sykepengesoknad} tittel="Oppsummering" />
            <div className="bekreftet-container">
                <Avkrysset tekst={getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')} />
            </div>
            <Knapperad sykepengesoknad={sykepengesoknad} scrollTilTopp={() => {
                this.scrollTilTopp();
            }} />
        </div>);
    }
}

SendtSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SendtSoknad;
