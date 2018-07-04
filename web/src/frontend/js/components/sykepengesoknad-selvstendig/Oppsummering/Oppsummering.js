import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cn from 'classnames';
import { sykmelding as sykmeldingPt, getLedetekst, Utvidbar } from 'digisyfo-npm';
import Soknadskjema from '../Soknadskjema';
import { soknad as soknadPt, skjemasvar as skjemasvarPt } from '../../../propTypes';
import Knapperad from '../../skjema/Knapperad';
import populerSoknadMedSvar from '../../../utils/soknad-felles/populerSoknadMedSvar';
import Oppsummeringsvisning from '../../soknad-felles-oppsummering/Oppsummeringsvisning';
import { BEKREFT_OPPLYSNINGER } from '../../../enums/tagtyper';
import Checkbox from '../../soknad-felles/Checkbox';

const OppsummeringUtvidbar = ({ soknad }) => {
    return (<Utvidbar className="blokk" variant="lilla" tittel={getLedetekst('sykepengesoknad.sidetittel')} erApen>
        <Oppsummeringsvisning soknad={soknad} />
    </Utvidbar>);
};

OppsummeringUtvidbar.propTypes = {
    soknad: soknadPt,
};

const Knapp = ({ children, className = '', visSpinner, ...rest }) => {
    const classNames = cn('knapp', {
        'knapp--spinner': visSpinner,
    });
    return (<button {...rest} className={`${classNames} ${className}`}>
        {children}
        { visSpinner && <span className="knapp__spinner" /> }
    </button>);
};

Knapp.propTypes = {
    children: PropTypes.string,
    className: PropTypes.string,
    visSpinner: PropTypes.bool,
};

export const hentSporsmalForOppsummering = (soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === BEKREFT_OPPLYSNINGER;
    });
};

export const SykepengesoknadSelvstendigOppsummeringSkjema = (props) => {
    const { handleSubmit, soknad, skjemasvar, actions, sender } = props;
    const populertSoknad = populerSoknadMedSvar(soknad, skjemasvar);
    const sporsmal = hentSporsmalForOppsummering(soknad)[0];
    const onSubmit = () => {
        actions.sendSoknad(populertSoknad);
    };
    return (<form className="soknadskjema" id="oppsummering-skjema" onSubmit={handleSubmit(onSubmit)}>
        { skjemasvar && <OppsummeringUtvidbar soknad={populertSoknad} /> }
        <div className="bekreftet-container">
            <Checkbox {...sporsmal} name={sporsmal.tag} />
        </div>
        <Knapperad variant="knapperad--forrigeNeste">
            <Link
                to={`/sykefravaer/soknader/${soknad.id}/aktiviteter-i-sykmeldingsperioden/`}
                className="rammeknapp">{getLedetekst('sykepengesoknad.tilbake')}</Link>
            <Knapp type="submit" className="js-send" visSpinner={sender}>{getLedetekst('sykepengesoknad.send')}</Knapp>
        </Knapperad>
    </form>);
};

SykepengesoknadSelvstendigOppsummeringSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
    skjemasvar: skjemasvarPt,
    actions: PropTypes.shape({
        sendSoknad: PropTypes.func,
    }),
    sender: PropTypes.bool,
};

const Oppsummering = (props) => {
    const { sykmelding, soknad, handleSubmit, skjemasvar, actions } = props;
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
