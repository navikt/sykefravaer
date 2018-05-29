import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import history from '../../../history';
import Soknadskjema from '../Soknadskjema';
import FeiloppsummeringContainer from '../../../containers/FeiloppsummeringContainer';
import { SYKEPENGER_SKJEMANAVN } from '../../../utils/sykepengesoknadUtils';
import Checkbox from '../../soknad-felles/Checkbox';
import { ANSVARSERKLARING } from '../../../enums/tagtyper';
import { soknad as soknadPt } from '../../../propTypes';

export const hentSporsmalForDuBegynner = (soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === ANSVARSERKLARING;
    });
}

export const FoerDuBegynnerSkjema = (props) => {
    const { handleSubmit, soknad } = props;
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${soknad.id}/fravaer-og-friskmelding`);
    };

    const sporsmal = hentSporsmalForDuBegynner(soknad);

    return (<form className="soknadskjema" id="foer-du-begynner-skjema" onSubmit={handleSubmit(onSubmit)}>
        <FeiloppsummeringContainer skjemanavn={SYKEPENGER_SKJEMANAVN} />
        <div className="panel">
            <div className="redaksjonelt-innhold">
                <Checkbox {...sporsmal[0]} name={sporsmal[0].tag} />
            </div>
        </div>
        <div className="knapperad">
            <p className="blokk--s">
                <button type="submit" className="knapp js-ga-videre">{getLedetekst('sykepengesoknad.ga-videre')}</button>
            </p>
        </div>
    </form>);
};

FoerDuBegynnerSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
};

const FoerDuBegynner = (props) => {
    return (<div>
        <Soknadskjema
            aktivtSteg="1"
            tittel={getLedetekst('sykepengesoknad.for-du-begynner.tittel')}
            sykmelding={props.sykmelding}
            soknad={props.soknad}>
            <FoerDuBegynnerSkjema soknad={props.soknad} handleSubmit={props.handleSubmit} />
        </Soknadskjema>
    </div>);
};

FoerDuBegynner.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
};

export default FoerDuBegynner;
