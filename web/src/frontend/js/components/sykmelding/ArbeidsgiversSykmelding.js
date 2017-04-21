import React, { PropTypes } from 'react';
import { ArbeidsgiversSykmeldingOpplysninger, Utvidbar } from 'digisyfo-npm';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const ArbeidsgiversSykmelding = ({ sykmelding, Overskrift = 'H2', erApen = false }) => {
    return (<Utvidbar
        tittel="Dette får arbeidsgiveren din se"
        ikon="svg/arbeidsgiver.svg"
        ikonHover="svg/arbeidsgiver--hover.svg"
        ikonAltTekst="Arbeidsgiver"
        erApen={erApen}
        variant="lilla"
        Overskrift={Overskrift}>
            <ArbeidsgiversSykmeldingOpplysninger sykmelding={sykmelding} />
    </Utvidbar>);
};

ArbeidsgiversSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
    Overskrift: PropTypes.string,
    erApen: PropTypes.bool,
};

export default ArbeidsgiversSykmelding;
