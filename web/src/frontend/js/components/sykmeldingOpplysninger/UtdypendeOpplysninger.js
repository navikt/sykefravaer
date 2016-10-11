import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import { getSykmeldingOpplysning } from '../../utils';

const UtdypendeOpplysninger = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.utdypendeOpplysninger.sykehistorie ||
        sykmelding.utdypendeOpplysninger.paavirkningArbeidsevne ||
        sykmelding.utdypendeOpplysninger.resultatAvBehandling ||
        sykmelding.utdypendeOpplysninger.henvisningUtredningBehandling;

    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmeldingSeksjon">
                <h4 className="sykmeldingSeksjon__tittel">{getLedetekst('din-sykmelding.utdypende.tittel', ledetekster)}</h4>
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger,
                        'sykehistorie',
                        getLedetekst('din-sykmelding.utdypende.sykehistorie.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger,
                        'paavirkningArbeidsevne',
                        getLedetekst('din-sykmelding.utdypende.paavirkning.arbeidsevne.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger,
                        'resultatAvBehandling',
                        getLedetekst('din-sykmelding.utdypende.behandlingsresultat.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger,
                        'henvisningUtredningBehandling',
                        getLedetekst('din-sykmelding.utdypende.henvisning.tittel', ledetekster))
                }
        </div>);
};

UtdypendeOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default UtdypendeOpplysninger;
