import React from 'react';
import { Field } from 'redux-form';
import CheckboxSelvstendig from '../../skjema/CheckboxSelvstendig';

const BekreftAnsvar = () => {
    const label = 'Jeg er klar over at dersom jeg gir uriktige opplysninger eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar.';
    return (<div className="blokk">
        <p>Det du fyller ut har avgjørende betydning for sykepengene NAV
        utbetaler. Det er svært viktig at opplysningene du gir er riktige. Derfor ber
        vi deg bekrefte dette:</p>
        <Field component={CheckboxSelvstendig} name="ansvarBekreftet" id="ansvarBekreftet" label={label} />
    </div>);
};

export default BekreftAnsvar;
