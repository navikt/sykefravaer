import React, { PropTypes } from 'react';
import { toDatePrettyPrint } from '../utils/datoUtils';
import { getLedetekst } from '../ledetekster/index';
import { SykmeldingOpplysning } from './SykmeldingOpplysning';
import { getSykmeldingCheckbox } from '../utils/dinSykmeldingUtils';

const Friskmelding = ({ sykmelding, ledetekster }) => {
    const visSeksjon = (sykmelding.friskmelding.antarReturSammeArbeidsgiver ||
    sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver ||
    sykmelding.friskmelding.antarReturAnnenArbeidsgiver ||
    sykmelding.friskmelding.tilbakemeldingReturArbeid ||
    sykmelding.friskmelding.utenArbeidsgiverTilbakemelding ||
    sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeid ||
    sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato ||
    sykmelding.friskmelding.utenArbeidsgiverTilbakemelding);

    if (!visSeksjon) {
        return <div></div>;
    }
    return (<div className="sykmelding-seksjon">
        <h4 className="sykmelding-seksjonstittel">{getLedetekst('din-sykmelding.friskmelding.tittel', ledetekster)}</h4>
        {
            getSykmeldingCheckbox(sykmelding.friskmelding, 'antarReturSammeArbeidsgiver',
                getLedetekst('din-sykmelding.friskmelding.retur.samme.arbeidsgiver.tittel', ledetekster), 'typo-element')
        }
        {
            !sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver ? null :
            <SykmeldingOpplysning Overskrift="h5" className="sykmelding-subopplysning"
                tittel={getLedetekst('din-sykmelding.friskmelding.retur.samme.arbeidsgiver.dato', ledetekster)}>
                <p className="sykmelding-opplysning-verdi js-antattDatoReturSammeArbeidsgiver">{toDatePrettyPrint(sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding.friskmelding, 'antarReturAnnenArbeidsgiver',
                getLedetekst('din-sykmelding.friskmelding.retur.annen.arbeidsgiver.tittel', ledetekster), 'typo-element')
        }
        {
            getSykmeldingCheckbox(sykmelding.friskmelding,
                'tilbakemeldingReturArbeid',
                getLedetekst('din-sykmelding.friskmelding.retur.usikker.tittel', ledetekster),
                'typo-element')
        }
        {
            !sykmelding.friskmelding.tilbakemeldingReturArbeid ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('din-sykmelding.friskmelding.retur.usikker.dato', ledetekster)}>
                <p className="sykmelding-opplysning-verdi js-tilbakemeldingReturArbeidDato">{toDatePrettyPrint(sykmelding.friskmelding.tilbakemeldingReturArbeid)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding.friskmelding, 'utenArbeidsgiverAntarTilbakeIArbeid',
                getLedetekst('din-sykmelding.friskmelding.uten.arbeidsgiver.retur.tittel', ledetekster), 'typo-element')
        }
        {
            !(sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeid && sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato) ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('din-sykmelding.friskmelding.uten.arbeidsgiver.retur.dato', ledetekster)}>
                <p className="sykmelding-opplysning-verdi js-utenArbeidsgiverAntarTilbakeIArbeidDato">
                    {toDatePrettyPrint(sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato)}
                </p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding.friskmelding, 'utenArbeidsgiverTilbakemelding',
                getLedetekst('din-sykmelding.friskmelding.uten.arbeidsgiver.usikker.tittel', ledetekster), 'typo-element')
        }
        {
            !sykmelding.friskmelding.utenArbeidsgiverTilbakemelding ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('din-sykmelding.friskmelding.uten.arbeidsgiver.usikker.dato', ledetekster)}>
                <p className="js-utenArbeidsgiverTilbakemeldingDato">{toDatePrettyPrint(sykmelding.friskmelding.utenArbeidsgiverTilbakemelding)}</p>
            </SykmeldingOpplysning>
        }
    </div>);
};

Friskmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default Friskmelding;
