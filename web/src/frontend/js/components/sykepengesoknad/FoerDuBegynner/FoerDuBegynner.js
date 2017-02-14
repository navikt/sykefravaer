import React, { PropTypes } from 'react';
import history from '../../../history';
import setup from '../setup';
import BekreftAnsvar from './BekreftAnsvar';
import SykmeldingUtdrag from '../SykmeldingUtdrag';
import Sidetopp from '../../Sidetopp';
import validate from '../validering/validerFoerDuBegynner';
import { getLedetekst } from 'digisyfo-npm';

const FoerDuBegynner = (props) => {
    const { handleSubmit, sykepengesoknad, ledetekster } = props;
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/fravaer-og-friskmelding`);
    };

    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel', ledetekster)} />
        <SykmeldingUtdrag erApen sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <h2 className="sykepenger__stegtittel">{getLedetekst('sykepengesoknad.for-du-begynner.tittel', ledetekster)}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="panel">
                <div className="redaksjonelt">
                    <BekreftAnsvar ledetekster={ledetekster} />
                </div>
            </div>
            <div className="knapperad">
                <button type="submit" className="knapp">{getLedetekst('sykepengesoknad.ga-videre', ledetekster)}</button>
            </div>
        </form>
    </div>);
};

FoerDuBegynner.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

const initialize = true;
const FoerDuBegynnerSkjema = setup(validate, FoerDuBegynner, initialize);

export default FoerDuBegynnerSkjema;
