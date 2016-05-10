import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox } from '../utils/dinSykmeldingUtils.js';

const Friskmelding = ({ sykmelding, ledetekster }) => {
    const visSeksjon = (sykmelding.antarReturSammeArbeidsgiver ||
        sykmelding.antattDatoReturSammeArbeidsgiver ||
        sykmelding.antarReturAnnenArbeidsgiver ||
        sykmelding.tilbakemeldingReturArbeid ||
        sykmelding.utenArbeidsgiverTilbakemelding ||
        sykmelding.utenArbeidsgiverAntarTilbakeIArbeid ||
        sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato ||
        sykmelding.utenArbeidsgiverTilbakemelding);

    if (!visSeksjon) {
        return <div></div>;
    }
    return (<div className="sykmelding-seksjon">
        <h4 className="sykmelding-seksjonstittel">{getLedetekst('sykmelding.vis.friskmelding.tittel', ledetekster)}</h4>
        {
            getSykmeldingCheckbox(sykmelding, 'antarReturSammeArbeidsgiver', getLedetekst('sykmelding.vis.friskmelding.retur.samme.arbeidsgiver.tittel', ledetekster), 'typo-element')
        }
        {
            !sykmelding.antattDatoReturSammeArbeidsgiver ? null :
            <SykmeldingOpplysning Overskrift="h5" tittel={getLedetekst('sykmelding.vis.friskmelding.retur.samme.arbeidsgiver.dato', ledetekster)} className="sykmelding-subopplysning">
                <p className="sykmelding-opplysning-verdi js-antattDatoReturSammeArbeidsgiver">{formatDate(sykmelding.antattDatoReturSammeArbeidsgiver)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding, 'antarReturAnnenArbeidsgiver', getLedetekst('sykmelding.vis.friskmelding.retur.annen.arbeidsgiver.tittel', ledetekster), 'typo-element')
        }
        {
            getSykmeldingCheckbox(sykmelding, 'tilbakemeldingReturArbeid', getLedetekst('sykmelding.vis.friskmelding.retur.usikker.tittel', ledetekster), 'typo-element')
        }
        {
        !sykmelding.tilbakemeldingReturArbeid ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('sykmelding.vis.friskmelding.retur.usikker.dato', ledetekster)}>
                <p className="sykmelding-opplysning-verdi js-tilbakemeldingReturArbeidDato">{formatDate(sykmelding.tilbakemeldingReturArbeid)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding, 'utenArbeidsgiverAntarTilbakeIArbeid', getLedetekst('sykmelding.vis.friskmelding.uten.arbeidsgiver.retur.tittel', ledetekster), 'typo-element')
        }
        {
            !(sykmelding.utenArbeidsgiverAntarTilbakeIArbeid && sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato) ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('sykmelding.vis.friskmelding.uten.arbeidsgiver.retur.dato', ledetekster)}>
                <p className="sykmelding-opplysning-verdi js-utenArbeidsgiverAntarTilbakeIArbeidDato">{formatDate(sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding, 'utenArbeidsgiverTilbakemelding', getLedetekst('sykmelding.vis.friskmelding.uten.arbeidsgiver.usikker.tittel', ledetekster), 'typo-element')
        }
        {
            !sykmelding.utenArbeidsgiverTilbakemelding ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel={getLedetekst('sykmelding.vis.friskmelding.uten.arbeidsgiver.usikker.dato', ledetekster)}>
                <p className="js-utenArbeidsgiverTilbakemeldingDato">{formatDate(sykmelding.utenArbeidsgiverTilbakemelding)}</p>
            </SykmeldingOpplysning>
        }
    </div>);
};

Friskmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default Friskmelding;
