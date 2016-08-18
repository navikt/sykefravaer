import React, { PropTypes } from 'react';
import SykmeldingPerioder from './SykmeldingPerioder';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import { getLedetekst } from '../../ledetekster';
import FlereOpplysninger from './FlereOpplysninger';
import { getSykmeldingCheckbox } from '../../utils/dinSykmeldingUtils';

const ArbeidsgiversSykmeldingOpplysninger = ({ sykmelding, ledetekster }) => {
    return (<div className="side-innhold">
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
                getSykmeldingCheckbox(sykmelding.friskmelding, 'arbeidsfoerEtterPerioden', getLedetekst('din-sykmelding.arbeidsfoer.tittel', ledetekster), 'blokk')
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
    </div>);
};

ArbeidsgiversSykmeldingOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default ArbeidsgiversSykmeldingOpplysninger;
