import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Soknad, getLedetekst } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Soknadstatuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { connect } from 'react-redux';
import * as actions from '../../actions/sykepengesoknader_actions';
import Ettersending from './Ettersending';
import { KORRIGERT, SENDT, TIL_SENDING } from '../../enums/sykepengesoknadstatuser';
import RelaterteSoknaderContainer from '../../containers/sykepengesoknad/RelaterteSoknaderContainer';
import KorrigertAvContainer from '../../containers/sykepengesoknad/KorrigertAvContainer';
import SykepengesoknadHeader from './SykepengesoknadHeader';
import { mapAktiviteter } from '../../utils/sykepengesoknadUtils';

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
};

export const Knapperad = (props) => {
    const { sykepengesoknad, startEndringForespurt, starterEndring, startEndringFeilet } = props;
    const frist = new Date();
    const ANTALL_MAANEDER_KORRIGERING_ER_MULIG = 3;
    frist.setMonth(frist.getMonth() - ANTALL_MAANEDER_KORRIGERING_ER_MULIG);
    const sendtDato = getSistSendtDato(sykepengesoknad);
    return (<div>
        <div className="verktoylinje">
            {
                sendtDato.getTime() >= frist.getTime() && <div className="verktoylinje__element">
                    <button onClick={(e) => {
                        e.preventDefault();
                        startEndringForespurt(sykepengesoknad.id);
                    }} disabled={starterEndring}
                        className="rammeknapp rammeknapp--mini js-endre">
                        { starterEndring ? <span className="knapp__spinner" /> : null } Endre søknad</button>
                </div>
            }
            <Ettersending {...props} manglendeDato="sendtTilNAVDato" ledetekstKeySuffix="send-til-nav" />
            <Ettersending {...props} manglendeDato="sendtTilArbeidsgiverDato" ledetekstKeySuffix="send-til-arbeidsgiver" />
        </div>
        { startEndringFeilet ? <p className="skjema__feilmelding">Beklager, det oppstod en feil. Prøv igjen litt senere</p> : null }
    </div>);
};

Knapperad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    startEndringForespurt: PropTypes.func,
    startEndringFeilet: PropTypes.bool,
    starterEndring: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        starterEndring: state.sykepengesoknader.starterEndring,
        startEndringFeilet: state.sykepengesoknader.startEndringFeilet,
    };
};

export const ConnectedKnapperad = connect(mapStateToProps, { startEndringForespurt: actions.startEndringForespurt })(Knapperad);

class SendtSoknad extends Component {
    scrollTilTopp() {
        scrollTo(this.refs.sendtSoknad, 300);
    }

    render() {
        const { sykepengesoknad } = this.props;
        return (<div ref="sendtSoknad">
            <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
            { sykepengesoknad.status === KORRIGERT && <KorrigertAvContainer sykepengesoknad={sykepengesoknad} /> }
            <Soknadstatuspanel sykepengesoknad={sykepengesoknad}>
            {
                [KORRIGERT, TIL_SENDING].indexOf(sykepengesoknad.status) === -1 && <ConnectedKnapperad sykepengesoknad={sykepengesoknad} scrollTilTopp={() => {
                    this.scrollTilTopp();
                }} />
            }
            </Soknadstatuspanel>
            <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />
            <Soknad sykepengesoknad={mapAktiviteter(sykepengesoknad)} tittel="Oppsummering" />
            <div className="bekreftet-container blokk">
                <Avkrysset tekst={getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')} />
            </div>
            { (sykepengesoknad.status === SENDT || sykepengesoknad.status === TIL_SENDING) && <RelaterteSoknaderContainer sykepengesoknadId={sykepengesoknad.id} /> }
        </div>);
    }
}

SendtSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SendtSoknad;
