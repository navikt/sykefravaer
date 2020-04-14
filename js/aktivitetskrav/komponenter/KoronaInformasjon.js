import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';

const tekster = {
    info: `
    Under korona-pandemien følger vi smittevernrådene fra myndighetene.
    Derfor vil vi ikke kreve aktiviteter av deg som kommer i konflikt med smittevernet.
    `,
};

const KoronaInformasjon = () => {
    return (
        <Alertstripe type="info" className="blokk">
            <p>{tekster.info}</p>
        </Alertstripe>
    );
};

export default KoronaInformasjon;
