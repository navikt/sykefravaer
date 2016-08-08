import React, { PropTypes } from 'react';
import Utvidbar from '../Utvidbar';
import SykmeldingPerioder from '../sykmeldingOpplysninger/SykmeldingPerioder';
import { SykmeldingNokkelOpplysning } from '../sykmeldingOpplysninger/SykmeldingOpplysning';
import { getLedetekst } from '../../ledetekster';
import FlereOpplysninger from '../sykmeldingOpplysninger/FlereOpplysninger';
import { getSykmeldingCheckbox } from '../../utils/dinSykmeldingUtils';

const ArbeidsgiversSykmelding = ({ sykmelding, ledetekster, Overskrift = 'H2' }) => {
    return (<Utvidbar
        tittel="Opplysninger til arbeidsgiveren din"
        ikon="svg/doctor-2.svg"
        ikonHover="svg/doctor-2_hover.svg"
        ikonAltTekst="Lege"
        erApen={false}
        variant="lilla"
        Overskrift={Overskrift}>
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
        </div>
    </Utvidbar>);
};

ArbeidsgiversSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    Overskrift: PropTypes.string,
};

export default ArbeidsgiversSykmelding;
