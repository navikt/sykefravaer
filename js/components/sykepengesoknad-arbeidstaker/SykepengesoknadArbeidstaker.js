import React from 'react';
import PropTypes from 'prop-types';
import beregnSteg, { AKTIVITETER_I_SYKMELDINGSPERIODEN, FOER_DU_BEGYNNER, FRAVAER_OG_FRISKMELDING, KVITTERING, OPPSUMMERING } from '../../utils/soknad-felles/beregnSteg';
import Feilmelding from '../Feilmelding';
import FoerDuBegynnerContainer from '../../containers/sykepengesoknad-arbeidstaker/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../../containers/sykepengesoknad-arbeidstaker/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../../containers/sykepengesoknad-arbeidstaker/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../../containers/sykepengesoknad-arbeidstaker/OppsummeringContainer';
import SykepengesoknadKvitteringContainer from '../../containers/sykepengesoknad-arbeidstaker/SykepengesoknadKvitteringContainer';

const SykepengesoknadArbeidstaker = (props) => {
    const { sti } = props;
    const steg = beregnSteg(sti);
    switch (steg) {
        case FOER_DU_BEGYNNER: {
            return <FoerDuBegynnerContainer {...props} />;
        }
        case FRAVAER_OG_FRISKMELDING: {
            return <FravaerOgFriskmeldingContainer {...props} />;
        }
        case AKTIVITETER_I_SYKMELDINGSPERIODEN: {
            return <AktiviteterISykmeldingsperiodenContainer {...props} />;
        }
        case OPPSUMMERING: {
            return <OppsummeringContainer {...props} />;
        }
        case KVITTERING: {
            return <SykepengesoknadKvitteringContainer {...props} />;
        }
        default: {
            return <Feilmelding />;
        }
    }
};

SykepengesoknadArbeidstaker.propTypes = {
    sti: PropTypes.string,
};

export default SykepengesoknadArbeidstaker;
