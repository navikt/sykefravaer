import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox } from '../utils/dinSykmeldingUtils.js';

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
        <h4 className="sykmelding-seksjonstittel">{getLedetekst('sykmelding.vis.friskmelding.tittel', ledetekster)}</h4>
        {
            getSykmeldingCheckbox(sykmelding.friskmelding, 'antarReturSammeArbeidsgiver',
                getLedetekst('sykmelding.vis.friskmelding.retur.samme.arbeidsgiver.tittel', ledetekster), 'typo-element')
        }
        {
            !sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver ? null :
            <SykmeldingOpplysning Overskrift="h5" className="sykmelding-subopplysning"
                tittel={getLedetekst('sykmelding.vis.friskmelding.retur.samme.arbeidsgiver.dato', ledetekster)}>
                <p className="sykmelding-opplysning-verdi js-antattDatoReturSammeArbeidsgiver">{formatDate(sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding.friskmelding, 'antarReturAnnenArbeidsgiver',
                getLedetekst('sykmelding.vis.friskmelding.retur.annen.arbeidsgiver.tittel', ledetekster), 'typo-element')
        }
        {
            getSykmeldingCheckbox(sykmelding.friskmelding,
                'tilbakemeldingReturArbeid',
                getLedetekst('sykmelding.vis.friskmelding.retur.usikker.tittel', ledetekster),
                'typo-element')
        }
        {
            !sykmelding.friskmelding.tilbakemeldingReturArbeid ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('sykmelding.vis.friskmelding.retur.usikker.dato', ledetekster)}>
                <p className="sykmelding-opplysning-verdi js-tilbakemeldingReturArbeidDato">{formatDate(sykmelding.friskmelding.tilbakemeldingReturArbeid)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding.friskmelding, 'utenArbeidsgiverAntarTilbakeIArbeid',
                getLedetekst('sykmelding.vis.friskmelding.uten.arbeidsgiver.retur.tittel', ledetekster), 'typo-element')
        }
        {
            !(sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeid && sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato) ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('sykmelding.vis.friskmelding.uten.arbeidsgiver.retur.dato', ledetekster)}>
                <p className="sykmelding-opplysning-verdi js-utenArbeidsgiverAntarTilbakeIArbeidDato">
                    {formatDate(sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato)}
                </p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding.friskmelding, 'utenArbeidsgiverTilbakemelding',
                getLedetekst('sykmelding.vis.friskmelding.uten.arbeidsgiver.usikker.tittel', ledetekster), 'typo-element')
        }
        {
            !sykmelding.friskmelding.utenArbeidsgiverTilbakemelding ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('sykmelding.vis.friskmelding.uten.arbeidsgiver.usikker.dato', ledetekster)}>
                <p className="js-utenArbeidsgiverTilbakemeldingDato">{formatDate(sykmelding.friskmelding.utenArbeidsgiverTilbakemelding)}</p>
            </SykmeldingOpplysning>
        }
    </div>);
};

Friskmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default Friskmelding;
