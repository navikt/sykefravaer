import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import SykepengerSkjema from '../SykepengerSkjema';
import history from '../../../history';
import setup from '../setup';
import Egenmeldingsdager from './Egenmeldingsdager';
import GjenopptattArbeidFulltUt from './GjenopptattArbeidFulltUt';
import FeriePermisjonEllerUtenlandsopphold from './FeriePermisjonEllerUtenlandsopphold';
import { KnapperadTilbake } from '../../skjema/Knapperad';
import validerFravaerOgFriskmelding from '../validering/validerFravaerOgFriskmelding';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import AvbrytSoknadContainer from '../../../containers/sykepengesoknad-arbeidstaker/AvbrytSoknadContainer';
import FeiloppsummeringContainer from '../../../containers/FeiloppsummeringContainer';
import { getSykepengesoknadSkjemanavn } from '../../../enums/skjemanavn';

export class FravaerOgFriskmeldingSkjema extends Component {
    componentDidMount() {
        if (this.form) {
            this.form.focus();
        }
    }

    render() {
        const { handleSubmit, sykepengesoknad, erEgenmeldingsperioderPreutfylt } = this.props;
        const onSubmit = () => {
            history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`);
        };
        return (<form
            className="soknadskjema"
            ref={(c) => {
                this.form = c;
            }}
            tabIndex="-1"
            id="fravaer-og-friskmelding-skjema"
            onSubmit={handleSubmit(onSubmit)}>
            <Egenmeldingsdager sykepengesoknad={sykepengesoknad} erEgenmeldingsperioderPreutfylt={erEgenmeldingsperioderPreutfylt} />
            <GjenopptattArbeidFulltUt sykepengesoknad={sykepengesoknad} />
            <FeriePermisjonEllerUtenlandsopphold sykepengesoknad={sykepengesoknad} />
            <KnapperadTilbake forrigeUrl={`/sykefravaer/soknader/${sykepengesoknad.id}/`} />
            <AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />
        </form>);
    }
}

FravaerOgFriskmeldingSkjema.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    sykepengesoknad: sykepengesoknadPt,
    erEgenmeldingsperioderPreutfylt: PropTypes.bool,
};

const FravaerOgFriskmeldingSkjemaSetup = setup(validerFravaerOgFriskmelding, FravaerOgFriskmeldingSkjema);

const FravaerOgFriskmelding = ({ sykepengesoknad, skjemasoknad }) => {
    return (
        <SykepengerSkjema
            aktivtSteg="2"
            tittel={getLedetekst('sykepengesoknad.fraver-og-friskmelding.tittel')}
            sykepengesoknad={sykepengesoknad}>
            <FeiloppsummeringContainer skjemanavn={getSykepengesoknadSkjemanavn(sykepengesoknad.id)} />
            <FravaerOgFriskmeldingSkjemaSetup
                form={getSykepengesoknadSkjemanavn(sykepengesoknad.id)}
                sykepengesoknad={sykepengesoknad}
                erEgenmeldingsperioderPreutfylt={skjemasoknad._erEgenmeldingsperioderPreutfylt} />
        </SykepengerSkjema>);
};

FravaerOgFriskmelding.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    skjemasoknad: PropTypes.shape(),
};

export default FravaerOgFriskmelding;
