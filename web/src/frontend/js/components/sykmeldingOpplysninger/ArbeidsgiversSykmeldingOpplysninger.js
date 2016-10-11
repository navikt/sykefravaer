import React, { PropTypes } from 'react';
import SykmeldingPerioder from './SykmeldingPerioder';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import { getLedetekst } from '../../ledetekster';
import FlereOpplysninger from './FlereOpplysninger';
import { getSykmeldingCheckbox } from '../../utils';

const ArbeidsgiversSykmeldingOpplysninger = ({ sykmelding, ledetekster }) => {
    return (<div className="side-innhold arbeidsgiversSykmelding">
        <header className="arbeidsgiversSykmelding__header">
            <h3 className="arbeidsgiversSykmelding__tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h3>
            <p className="js-fnr arbeidsgiversSykmelding__fodselsnummer">{sykmelding.pasient.fnr}</p>
        </header>
        <div className="arbeidsgiversSykmelding__nokkelopplysninger">
            <SykmeldingPerioder
                perioder={sykmelding.mulighetForArbeid.perioder}
                ledetekster={ledetekster}
                Overskrift="H4" />
            {
                !sykmelding.skalViseSkravertFelt ? null :
                <SykmeldingNokkelOpplysning tittel={getLedetekst('send-til-arbeidsgiver.diagnose.tittel', ledetekster)} Overskrift="H4">
                    <img src="/sykefravaer/img/svg/sladd.svg" className="js-diagnose" alt={getLedetekst('send-til-arbeidsgiver.diagnose.skjult', ledetekster)} />
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
