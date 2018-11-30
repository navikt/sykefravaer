import React from 'react';
import { toggleErPaaHeroku } from '../../../toggles';

/* eslint-disable max-len */
export const TEKSTER = {
    forDuSvarer: {
        tittel: 'Før du svarer',
        lagetPlan: 'Har du laget en oppfølgingsplan? Husk å dele den med NAV nå.',
        ikkeLagetPlan: 'Er oppfølgingsplanen ikke laget? Bruk gjerne den digitale planen du finner når du er logget inn.',
    },
    tekstInformasjonInnhold: {
        lenke: 'Opprett en ny plan.',
    },
};
/* eslint-enable max-len */

export const TekstInformasjonBilde = () => {
    return (<div className="tekstInformasjon__bilde">
        <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/forDuSvarer.svg`} alt="Kalender" />
    </div>);
};

export const TekstInformasjonInnhold = () => {
    return (<div className="tekstInformasjon__innhold">
        <h2 className="tekstInformasjon__tittel">
            {TEKSTER.forDuSvarer.tittel}
        </h2>
        <ul>
            <li>{TEKSTER.forDuSvarer.lagetPlan}</li>
            <li>
                {TEKSTER.forDuSvarer.ikkeLagetPlan} <a
                    className="lenke"
                    href={toggleErPaaHeroku()
                        ? 'https://oppfolgingsplan.herokuapp.com/oppfolgingsplan/oppfolgingsplaner'
                        : `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`}>
                    {TEKSTER.tekstInformasjonInnhold.lenke}
                </a>
            </li>
        </ul>
    </div>);
};

const MotebehovInfoForSvar = () => {
    return (<div className="panel motebehovInfoForSvar">
        <TekstInformasjonBilde />
        <TekstInformasjonInnhold />
    </div>);
};

export default MotebehovInfoForSvar;
