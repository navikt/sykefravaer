import React, { PropTypes } from 'react';
import { ArbeidsgiversSykmeldingOpplysninger, Utvidbar } from 'digisyfo-npm';

const ArbeidsgiversSykmelding = ({ sykmelding, ledetekster, Overskrift = 'H2', erApen = false }) => {
    return (<Utvidbar
        tittel="Dette får arbeidsgiveren din se"
        ikon="svg/doctor-2.svg"
        ikonHover="svg/doctor-2_hover.svg"
        ikonAltTekst="Lege"
        erApen={erApen}
        variant="lilla"
        Overskrift={Overskrift}>
            <ArbeidsgiversSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
    </Utvidbar>);
};

ArbeidsgiversSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    Overskrift: PropTypes.string,
    erApen: PropTypes.bool,
};

export default ArbeidsgiversSykmelding;
