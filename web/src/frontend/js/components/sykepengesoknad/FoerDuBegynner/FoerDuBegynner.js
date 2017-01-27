import React, { PropTypes } from 'react';
import history from '../../../history';
import setup from '../setup';
import BekreftAnsvar from './BekreftAnsvar';
import SykmeldingUtdrag from '../SykmeldingUtdrag';
import Sidetopp from '../../Sidetopp';

const FoerDuBegynner = (props) => {
    const { handleSubmit, sykepengesoknad, ledetekster } = props;
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/fravaer-og-friskmelding`);
    };

    return (<div>
        <Sidetopp tittel="Søknad om sykepenger" />
        <SykmeldingUtdrag erApen sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <h2 className="sykepenger__stegtittel">Før du begynner</h2>
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
    </div>);
};

FoerDuBegynner.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export const validate = (values) => {
    const feilmeldinger = {};
    if (!values.ansvarBekreftet) {
        feilmeldinger.ansvarBekreftet = 'Du må bekrefte dette før du går videre';
    }
    return feilmeldinger;
};

const initialize = true;
const FoerDuBegynnerSkjema = setup(validate, FoerDuBegynner, initialize);

export default FoerDuBegynnerSkjema;
