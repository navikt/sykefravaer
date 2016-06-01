import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const UtdypendeOpplysninger = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.utdypendeOpplysninger.sykehistorie ||
        sykmelding.utdypendeOpplysninger.paavirkningArbeidsevne ||
        sykmelding.utdypendeOpplysninger.resultatAvBehandling ||
        sykmelding.utdypendeOpplysninger.henvisningUtredningBehandling;

    if (!visSeksjon) {
        return <span />;
    }
    
    return (<div className="sykmelding-seksjon">
                <h4 className="sykmelding-seksjonstittel">{getLedetekst('sykmelding.vis.utdypende.tittel', ledetekster)}</h4>
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger, 'sykehistorie', getLedetekst('sykmelding.vis.utdypende.sykehistorie.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger, 'paavirkningArbeidsevne', getLedetekst('sykmelding.vis.utdypende.paavirkning.arbeidsevne.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger, 'resultatAvBehandling', getLedetekst('sykmelding.vis.utdypende.behandlingsresultat.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger, 'henvisningUtredningBehandling', getLedetekst('sykmelding.vis.utdypende.henvisning.tittel', ledetekster))
                }
        </div>);
};

UtdypendeOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default UtdypendeOpplysninger;
