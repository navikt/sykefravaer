import React from 'react';
import { sykmelding as sykmeldingPt } from 'digisyfo-npm';
import { soknad as soknadPt } from '../../propTypes';
import { settErOppdelt } from '../../utils/soknadSelvstendigUtils';
import SykepengesoknadHeader from '../sykepengesoknad-felles/SykepengesoknadHeader';

const Soknadtopp = ({ soknad, sykmelding }) => {
    const soknadParameter = settErOppdelt(soknad, sykmelding);
    return <SykepengesoknadHeader sykepengesoknad={soknadParameter} />;
};

Soknadtopp.propTypes = {
    soknad: soknadPt,
    sykmelding: sykmeldingPt,
};

export default Soknadtopp;
