import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BekreftetKorrektInformasjon,
    mapBackendsoknadToSkjemasoknad,
    scrollTo,
    SoknadOppsummering,
    sykepengesoknadstatuser,
    SykmeldingUtdrag,
    Utvidbar,
    VaerKlarOverAt,
    mapSkjemasoknadToOppsummeringsoknad,
} from 'digisyfo-npm';
import { connect } from 'react-redux';
import Soknadstatuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import * as actions from '../../actions/sykepengesoknader_actions';
import ConnectedEttersending from './Ettersending';
import RelaterteSoknaderContainer from '../../containers/sykepengesoknad/RelaterteSoknaderContainer';
import KorrigertAvContainer from '../../containers/sykepengesoknad/KorrigertAvContainer';
import SykepengesoknadHeader from './SykepengesoknadHeader';

const { KORRIGERT, SENDT, TIL_SENDING } = sykepengesoknadstatuser;

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
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            startEndringForespurt(sykepengesoknad.id);
                        }}
                        disabled={starterEndring}
                        className="rammeknapp rammeknapp--mini js-endre">
                        {starterEndring ? <span className="knapp__spinner" /> : null} Endre søknad
                    </button>
                </div>
            }
            <ConnectedEttersending
                {...props}
                manglendeDato="sendtTilNAVDato"
                ledetekstKeySuffix="send-til-nav" />
            <ConnectedEttersending
                {...props}
                manglendeDato="sendtTilArbeidsgiverDato"
                ledetekstKeySuffix="send-til-arbeidsgiver" />
        </div>
        {startEndringFeilet ?
            <p className="skjema__feilmelding">Beklager, det oppstod en feil. Prøv igjen litt senere</p> : null}
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
        scrollTo(this.sendtSoknad, 300);
    }

    render() {
        const { sykepengesoknad } = this.props;
        const skjemasoknad = mapBackendsoknadToSkjemasoknad(sykepengesoknad);
        let oppsummeringsoknad;

        if (sykepengesoknad.oppsummeringsoknad) {
            oppsummeringsoknad = sykepengesoknad.oppsummeringsoknad;
        } else {
            oppsummeringsoknad = mapSkjemasoknadToOppsummeringsoknad(skjemasoknad, sykepengesoknad);
        }

        return (<div ref={(c) => {
            this.sendtSoknad = c;
        }}>
            <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
            {sykepengesoknad.status === KORRIGERT && <KorrigertAvContainer sykepengesoknad={sykepengesoknad} />}
            <Soknadstatuspanel sykepengesoknad={sykepengesoknad}>
                {
                    [KORRIGERT, TIL_SENDING].indexOf(sykepengesoknad.status) === -1 && <ConnectedKnapperad
                        sykepengesoknad={sykepengesoknad}
                        scrollTilTopp={() => {
                            this.scrollTilTopp();
                        }} />
                }
            </Soknadstatuspanel>
            <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />
            <Utvidbar tittel="Oppsummering" className="blokk">
                <SoknadOppsummering oppsummeringsoknad={oppsummeringsoknad} />
            </Utvidbar>
            <div className="blokk bekreftet-container">
                <BekreftetKorrektInformasjon
                    bekreftetKorrektInformasjon={oppsummeringsoknad.bekreftetKorrektInformasjon} />
            </div>
            <VaerKlarOverAt vaerKlarOverAt={oppsummeringsoknad.vaerKlarOverAt} />

            {(sykepengesoknad.status === SENDT || sykepengesoknad.status === TIL_SENDING) &&
            <RelaterteSoknaderContainer sykepengesoknadId={sykepengesoknad.id} />}
        </div>);
    }
}

SendtSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SendtSoknad;
