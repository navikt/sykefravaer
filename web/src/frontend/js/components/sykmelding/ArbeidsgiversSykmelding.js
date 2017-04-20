import React, { PropTypes } from 'react';
import { ArbeidsgiversSykmeldingOpplysninger, Utvidbar } from 'digisyfo-npm';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const ArbeidsgiversSykmelding = ({ sykmelding, ledetekster, Overskrift = 'H2', erApen = false }) => {
    return (<Utvidbar
        tittel="Dette får arbeidsgiveren din se"
        ikon="svg/arbeidsgiver.svg"
        ikonHover="svg/arbeidsgiver--hover.svg"
        ikonAltTekst="Arbeidsgiver"
        erApen={erApen}
        variant="lilla"
        Overskrift={Overskrift}>
            <ArbeidsgiversSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
    </Utvidbar>);
};

ArbeidsgiversSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: PropTypes.object,
    Overskrift: PropTypes.string,
    erApen: PropTypes.bool,
};

export default ArbeidsgiversSykmelding;
