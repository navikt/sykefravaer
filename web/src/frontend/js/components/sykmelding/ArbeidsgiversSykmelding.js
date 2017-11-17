import React from 'react';
import PropTypes from 'prop-types';
import { ArbeidsgiversSykmeldingOpplysninger, Utvidbar } from 'digisyfo-npm';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import AppSpinner from '../AppSpinner';

const ArbeidsgiversSykmelding = ({ sykmelding, Overskrift = 'h2', erApen = false, henter }) => {
    return (<Utvidbar
        tittel="Dette får arbeidsgiveren din se"
        ikon="svg/arbeidsgiver.svg"
        ikonHover="svg/arbeidsgiver--hover.svg"
        ikonAltTekst="Arbeidsgiver"
        erApen={erApen}
        variant="lilla"
        Overskrift={Overskrift}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                return <ArbeidsgiversSykmeldingOpplysninger sykmelding={sykmelding} />;
            })()
        }
    </Utvidbar>);
};

ArbeidsgiversSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
    Overskrift: PropTypes.string,
    erApen: PropTypes.bool,
    henter: PropTypes.bool,
};

export default ArbeidsgiversSykmelding;
