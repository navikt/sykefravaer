import React, { PropTypes } from 'react';
import Utvidbar from './Utvidbar.js';
import SykmeldingPerioder from './SykmeldingPerioder.js';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning.js';
import { getLedetekst } from '../ledetekster';
import FlereOpplysninger from './FlereOpplysninger.js';
import VelgArbeidsgiverContainer from '../containers/VelgArbeidsgiverContainer.js';

const SendTilArbeidsgiver = ({ sykmelding, ledetekster }) => {
    return (<div className="panel">
        <h1 className="typo-innholdstittel tittel-dekorert blokk-l">{getLedetekst('send-til-arbeidsgiver.hovedtittel', ledetekster)}</h1>
        <VelgArbeidsgiverContainer sykmelding={sykmelding} />
        <Utvidbar
            tittel="Opplysninger til arbeidsgiveren din"
            ikon="svg/doctor-2.svg"
            ikonHover="svg/doctor-2_hover.svg"
            ikonAltTekst="Lege"
            erApen={false}
            className="utvidbar-lilla">
            <div className="side-innhold">
                <header className="arbeidsgivers-header">
                    <h3 className="arbeidsgivers-tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h3>
                    <p className="js-fnr arbeidsgivers-fodselsnummer">{sykmelding.pasient.fnr}</p>
                </header>
                <div className="arbeidsgivers-nokkelopplysninger">
                    <SykmeldingPerioder
                        perioder={sykmelding.mulighetForArbeid.perioder}
                        ledetekster={ledetekster}
                        Overskrift="H4" />
                    {
                        !sykmelding.skalViseSkravertFelt ? null :
                        <SykmeldingNokkelOpplysning tittel={getLedetekst('send-til-arbeidsgiver.diagnose.tittel', ledetekster)} Overskrift="H4">
                            <p className="skravert js-diagnose">{getLedetekst('send-til-arbeidsgiver.diagnose.skjult', ledetekster)}</p>
                        </SykmeldingNokkelOpplysning>
                    }
                    {
                        !sykmelding.friskmelding.hensynPaaArbeidsplassen ? null :
                        <SykmeldingNokkelOpplysning tittel={getLedetekst('din-sykmelding.hensyn.tittel', ledetekster)} Overskrift="H4">
                            <p className="js-hensynPaaArbeidsplassen">{sykmelding.friskmelding.hensynPaaArbeidsplassen}</p>
                        </SykmeldingNokkelOpplysning>
                    }
                    {
                        !sykmelding.arbeidsgiver ? null :
                        <SykmeldingNokkelOpplysning tittel={getLedetekst('send-til-arbeidsgiver.arbeidsgiver.tittel', ledetekster)} Overskrift="H4">
                            <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                        </SykmeldingNokkelOpplysning>
                    }
                    {
                        !sykmelding.bekreftelse.sykmelder ? null :
                        <SykmeldingNokkelOpplysning tittel={getLedetekst('send-til-arbeidsgiver.sykmelder.tittel', ledetekster)} Overskrift="H4">
                            <p className="js-sykmelder">{sykmelding.bekreftelse.sykmelder}</p>
                        </SykmeldingNokkelOpplysning>
                    }
                </div>
                <FlereOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
            </div>
        </Utvidbar>
        <p>{getLedetekst('send-til-arbeidsgiver.infotekst', ledetekster)}</p>
        <div className="knapperad">
            <span tabIndex="0" className="knapp knapp-hoved">{getLedetekst('send-til-arbeidsgiver.send.knappetekst', ledetekster)}</span>
        </div>
    </div>);
};

SendTilArbeidsgiver.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SendTilArbeidsgiver;
