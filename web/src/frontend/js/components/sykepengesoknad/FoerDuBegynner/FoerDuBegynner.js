import React, { PropTypes } from 'react';
import history from '../../../history';
import SykepengerSkjema from '../SykepengerSkjema';
import setup from '../setup';
import BekreftAnsvar from './BekreftAnsvar';

const FoerDuBegynner = ({ handleSubmit }) => {
    const onSubmit = () => {
        history.push('/sykepenger/fravaer-og-friskmelding');
    };

    return (<SykepengerSkjema apentUtdrag tittel="Før du begynner">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="panel">
                <div className="redaksjonelt">
                    <BekreftAnsvar />
                </div>
            </div>
            <div className="knapperad">
                <button type="submit" className="knapp">Gå videre</button>
            </div>
        </form>
    </SykepengerSkjema>);
};

FoerDuBegynner.propTypes = {
    handleSubmit: PropTypes.func,
};

export const validate = (values) => {
    const feilmeldinger = {};
    if (!values.ansvarBekreftet) {
        feilmeldinger.ansvarBekreftet = 'Du må bekrefte dette før du går videre';
    }
    return feilmeldinger;
};

const FoerDuBegynnerSkjema = setup(validate, FoerDuBegynner, {
    perioder: [{
        gjennomsnittPerUke: {
            enhet: 'prosent',
        },
    }, {
        gjennomsnittPerUke: {
            enhet: 'prosent',
        },
    }],
});

export default FoerDuBegynnerSkjema;
