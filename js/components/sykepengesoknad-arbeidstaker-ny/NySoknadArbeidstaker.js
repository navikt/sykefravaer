import React from 'react';
import PropTypes from 'prop-types';
import beregnSteg, { AKTIVITETER_I_SYKMELDINGSPERIODEN, FOER_DU_BEGYNNER, FRAVAER_OG_FRISKMELDING, OPPSUMMERING } from '../../utils/soknad-felles/beregnSteg';
import NyFoerDuBegynnerArbeidstakerContainer from '../../containers/sykepengesoknad-arbeidstaker-ny/NyFoerDuBegynnerArbeidstakerContainer';
import NyFravaerOgFriskmeldingArbeidstakerContainer from '../../containers/sykepengesoknad-arbeidstaker-ny/NyFravaerOgFriskmeldingArbeidstakerContainer';
import NyAktiviteterISykmeldingsperiodenArbeidstakerContainer from '../../containers/sykepengesoknad-arbeidstaker-ny/NyAktiviteterISykmeldingsperiodenArbeidstakerContainer';
import NyOppsummeringArbeidstakerContainer from '../../containers/sykepengesoknad-arbeidstaker-ny/NyOppsummeringArbeidstakerContainer';

const NySoknadArbeidstaker = (props) => {
    const { sti } = props;
    const steg = beregnSteg(sti);
    switch (steg) {
        case FOER_DU_BEGYNNER: {
            return <NyFoerDuBegynnerArbeidstakerContainer {...props} />;
        }
        case FRAVAER_OG_FRISKMELDING: {
            return <NyFravaerOgFriskmeldingArbeidstakerContainer {...props} />;
        }
        case AKTIVITETER_I_SYKMELDINGSPERIODEN: {
            return <NyAktiviteterISykmeldingsperiodenArbeidstakerContainer {...props} />;
        }
        case OPPSUMMERING: {
            return <NyOppsummeringArbeidstakerContainer {...props} />;
        }
        default: {
            return null;
        }
    }
};

NySoknadArbeidstaker.propTypes = {
    sti: PropTypes.string,
};

export default NySoknadArbeidstaker;
