import React from 'react';

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
    /* eslint-disable max-len */
    return (<div className="tekstInformasjon__bilde">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
            <g fill="none" fillRule="evenodd">
                <path fill="#A59D96" d="M17.31 18.582H40.38v-2.578H17.31zM17.31 24.413H40.38v-2.577H17.31zM17.31 30.244H40.38v-2.576H17.31zM17.31 36.077H40.38V33.5H17.31zM14.725 15.005H10V19.583h4.725V15.005zM11 18.583h2.725v-2.578H11v2.578zM14.725 20.836H10v4.577h4.725v-4.577zM11 24.413h2.725v-2.577H11v2.577zM14.725 26.668H10V31.244h4.725V26.668zM11 30.244h2.725v-2.576H11v2.576zM14.725 32.5H10v4.577h4.725V32.5zM11 36.077h2.725V33.5H11v2.577z" />
                <path stroke="#2F3237" strokeWidth="2" d="M10.036 14.717l2.55 2.915L16.174 13M10.036 20.693l2.55 2.915 3.588-4.632" />
            </g>
        </svg>
    </div>);
    /* eslint-enable max-len */
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
                    href={`${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`}>
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
