import React, { PropTypes } from 'react';
import Utvidbar from './Utvidbar.js';
import SykmeldingPerioder from './SykmeldingPerioder.js';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning.js';
import { getLedetekst } from '../ledetekster';
import FlereOpplysninger from './FlereOpplysninger.js';

const SendTilArbeidsgiver = ({ sykmelding, ledetekster }) => {
    return (<div className="panel">
        <h1 className="typo-innholdstittel tittel-dekorert blokk-l">Send til arbeidsgiveren din</h1>

        <Utvidbar
            tittel="Opplysninger til arbeidsgiveren din"
            ikon="svg/doctor-2.svg"
            ikonHover="svg/doctor-2_hover.svg"
            ikonAltTekst="Lege"
            erApen={false}
            className="utvidbar-lilla">
            <div className="side-innhold">
                <header className="arbeidsgivers-header">
                    <h3 className="arbeidsgivers-tittel">{sykmelding.fornavn} {sykmelding.etternavn}</h3>
                    <p className="js-fnr arbeidsgivers-fodselsnummer">{sykmelding.fnr}</p>
                </header>
                <SykmeldingPerioder perioder={sykmelding.perioder} ledetekster={ledetekster} Overskrift="H4" />
                <SykmeldingNokkelOpplysning tittel="Diagnose" Overskrift="H4">
                    <p className="skravert js-diagnose">Diagnosen er skjult for arbeidsgiver</p>
                </SykmeldingNokkelOpplysning>
                {
                    !sykmelding.hensynPaaArbeidsplassen ? null :
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.hensyn.tittel', ledetekster)} Overskrift="H4">
                        <p className="js-hensynPaaArbeidsplassen">{sykmelding.hensynPaaArbeidsplassen}</p>
                    </SykmeldingNokkelOpplysning>
                }
                {
                    !sykmelding.arbeidsgiver ? null :
                    <SykmeldingNokkelOpplysning tittel="Arbeidsgiver for denne sykmeldingen" Overskrift="H4">
                        <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                    </SykmeldingNokkelOpplysning>
                }
                {
                    !sykmelding.sykmelder ? null :
                    <SykmeldingNokkelOpplysning tittel="Lege / sykmelder" Overskrift="H4">
                        <p className="js-sykmelder">{sykmelding.sykmelder}</p>
                    </SykmeldingNokkelOpplysning>
                }
                <FlereOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
            </div>
        </Utvidbar>
        <p>Når du sender sykmeldingen til din arbeidsgiver, vil de motta sykmeldingen elektronisk.</p>
        <div className="knapperad">
            <span tabIndex="0" className="knapp knapp-hoved">Send sykmeldingen</span>
        </div>
    </div>);
};

SendTilArbeidsgiver.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SendTilArbeidsgiver;
