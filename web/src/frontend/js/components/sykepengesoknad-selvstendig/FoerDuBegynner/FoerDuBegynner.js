import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import history from '../../../history';
import Soknadskjema from '../Soknadskjema';
import FeiloppsummeringContainer from '../../../containers/FeiloppsummeringContainer';
import Checkboxpanel from '../../soknad-felles/Checkboxpanel';
import { ANSVARSERKLARING } from '../../../enums/tagtyper';
import { soknad as soknadPt } from '../../../propTypes';
import { getSykepengesoknadArbeidstakerSkjemanavn } from '../../../enums/skjemanavn';
import ForsteSoknadIntro from './ForsteSelvstendigFrilanserSoknadIntro';
import SoknadIntro from './SelvstendigFrilanserSoknadIntro';

export const hentSporsmalForDuBegynner = (soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === ANSVARSERKLARING;
    });
};

export class FoerDuBegynnerSkjema extends Component {
    componentDidMount() {
        if (this.props.soknad) {
            this.props.utfyllingStartet(this.props.soknad.id);
        }
    }

    render() {
        const { handleSubmit, soknad } = this.props;
        const onSubmit = () => {
            history.push(`/sykefravaer/soknader/${soknad.id}/fravaer-og-friskmelding`);
        };

        const sporsmal = hentSporsmalForDuBegynner(soknad);

        return (<form className="soknadskjema" id="foer-du-begynner-skjema" onSubmit={handleSubmit(onSubmit)}>
            <FeiloppsummeringContainer skjemanavn={getSykepengesoknadArbeidstakerSkjemanavn(soknad.id)} />
            <div className="panel redaksjonelt-innhold">
                <p className="blokk">{getLedetekst('sykepengesoknad.bekreft-ansvar.introtekst')}</p>
                <Checkboxpanel {...sporsmal[0]} name={sporsmal[0].tag} />
            </div>
            <div className="knapperad">
                <button type="submit" className="knapp js-ga-videre">{getLedetekst('sykepengesoknad.ga-videre')}</button>
            </div>
        </form>);
    }
};

FoerDuBegynnerSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    utfyllingStartet: PropTypes.func,
    soknad: soknadPt,
};

const FoerDuBegynner = (props) => {
    const intro = props.erForsteSoknad
        ? <ForsteSoknadIntro />
        : <SoknadIntro />;

    return (<Soknadskjema
        aktivtSteg="1"
        tittel={getLedetekst('sykepengesoknad.for-du-begynner.tittel')}
        sykmelding={props.sykmelding}
        intro={intro}
        soknad={props.soknad}>
        <FoerDuBegynnerSkjema soknad={props.soknad} handleSubmit={props.handleSubmit} />
    </Soknadskjema>);
};

FoerDuBegynner.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    erForsteSoknad: PropTypes.bool,
};

export default FoerDuBegynner;
