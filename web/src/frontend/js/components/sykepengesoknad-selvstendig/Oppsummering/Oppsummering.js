import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt, getLedetekst, Utvidbar } from 'digisyfo-npm';
import Soknadskjema from '../Soknadskjema';
import { soknad as soknadPt, skjemasvar as skjemasvarPt } from '../../../propTypes';
import { KnapperadTilbake } from '../../skjema/Knapperad';
import populerSoknadMedSvar from '../../../utils/soknad-felles/populerSoknadMedSvar';
import Oppsummeringsvisning from '../../soknad-felles-oppsummering/Oppsummeringsvisning';

const OppsummeringUtvidbar = ({ soknad }) => {
    return (<Utvidbar variant="lilla" tittel={getLedetekst('sykepengesoknad.sidetittel')} erApen>
        <Oppsummeringsvisning soknad={soknad} />
    </Utvidbar>);
};

OppsummeringUtvidbar.propTypes = {
    soknad: soknadPt,
};

export const SykepengesoknadSelvstendigOppsummeringSkjema = (props) => {
    const { handleSubmit, soknad, skjemasvar, actions } = props;
    const populertSoknad = populerSoknadMedSvar(soknad, skjemasvar);
    const onSubmit = () => {
        console.log(JSON.stringify(populertSoknad));
        actions.sendSoknad(populertSoknad);
    };
    return (<form className="soknadskjema" id="oppsummering-skjema" onSubmit={handleSubmit(onSubmit)}>
        { skjemasvar && <OppsummeringUtvidbar soknad={populertSoknad} /> }
        <KnapperadTilbake forrigeUrl={`/sykefravaer/soknader/${soknad.id}/aktiviteter-i-sykmeldingsperioden/`} />
    </form>);
};

SykepengesoknadSelvstendigOppsummeringSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
    skjemasvar: skjemasvarPt,
    actions: PropTypes.shape({
        sendSoknad: PropTypes.func,
    }),
};

const Oppsummering = (props) => {
    const { sykmelding, soknad, handleSubmit, skjemasvar, actions } = props;
    console.log("actions", actions);
    return (<Soknadskjema
        aktivtSteg="4"
        tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')}
        sykmelding={sykmelding}
        soknad={soknad}>
        <SykepengesoknadSelvstendigOppsummeringSkjema soknad={soknad} handleSubmit={handleSubmit} skjemasvar={skjemasvar} actions={actions} />
    </Soknadskjema>);
};

Oppsummering.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    skjemasvar: skjemasvarPt,
    actions: PropTypes.shape({
        sendSoknad: PropTypes.func,
    }),
};

export default Oppsummering;
