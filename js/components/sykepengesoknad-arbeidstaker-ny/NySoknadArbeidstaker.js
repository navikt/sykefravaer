import React from 'react';
import PropTypes from 'prop-types';
import beregnSteg, { FOER_DU_BEGYNNER, FRAVAER_OG_FRISKMELDING } from '../../utils/soknad-felles/beregnSteg';
import NyFoerDuBegynnerArbeidstakerContainer from '../../containers/sykepengesoknad-arbeidstaker-ny/NyFoerDuBegynnerArbeidstakerContainer';
import NyFravaerOgFriskmeldingArbeidstakerContainer from '../../containers/sykepengesoknad-arbeidstaker-ny/NyFravaerOgFriskmeldingArbeidstakerContainer';

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
        default: {
            return null;
        }
    }
};

NySoknadArbeidstaker.propTypes = {
    sti: PropTypes.string,
};

export default NySoknadArbeidstaker;
