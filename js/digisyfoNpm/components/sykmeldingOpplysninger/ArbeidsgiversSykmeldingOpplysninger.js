import React from 'react';
import { sykmelding as sykmeldingPt, keyValue } from '../../propTypes';
import FlereOpplysninger from './FlereOpplysninger';
import ArbeidsgiversNokkelopplysninger from './ArbeidsgiversNokkelopplysninger';

const ArbeidsgiversSykmeldingOpplysninger = ({ sykmelding, ledetekster }) => {
    return (
        <div className="side-innhold arbeidsgiversSykmelding">
            <header className="arbeidsgiversSykmelding__header">
                <h3 className="arbeidsgiversSykmelding__tittel">
                    {sykmelding.pasient.fornavn}
                    {' '}
                    {sykmelding.pasient.mellomnavn}
                    {' '}
                    {sykmelding.pasient.etternavn}
                </h3>
                <p className="js-fnr arbeidsgiversSykmelding__fodselsnummer">{sykmelding.pasient.fnr}</p>
            </header>
            <ArbeidsgiversNokkelopplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
            <FlereOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </div>
    );
};

ArbeidsgiversSykmeldingOpplysninger.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: keyValue,
};

export default ArbeidsgiversSykmeldingOpplysninger;
