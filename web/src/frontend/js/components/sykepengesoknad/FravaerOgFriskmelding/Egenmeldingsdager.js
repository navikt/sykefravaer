import React from 'react';
import JaEllerNei from '../JaEllerNei';
import Periodevelger from './Periodevelger';

const EgenmeldingsDager = () => {
    return (<JaEllerNei
        spoersmal="Brukte du egenmeldingsdager før det legemeldte fraværet startet den 01.12.2016?"
        name="bruktEgenmeldingsdagerFoerLegemeldtFravaer">
        <Periodevelger name="egenmeldingsperioder" spoersmal="Når brukte du egenmelding?" />
    </JaEllerNei>);
};

export default EgenmeldingsDager;
