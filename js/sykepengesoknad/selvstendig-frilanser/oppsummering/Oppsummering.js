import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { sykmelding as sykmeldingPt, getLedetekst, Utvidbar } from '@navikt/digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import Soknadskjema from '../../felles/Soknadskjema';
import { soknad as soknadPt, skjemasvar as skjemasvarPt } from '../../../propTypes/index';
import Feilstripe from '../../../components/Feilstripe';
import Knapperad from '../../../components/skjema/Knapperad';
import populerSoknadMedSvar from '../../utils/populerSoknadMedSvar';
import Oppsummeringsvisning from '../../felles/oppsummering/Oppsummeringsvisning';
import { BEKREFT_OPPLYSNINGER, VAER_KLAR_OVER_AT } from '../../../enums/tagtyper';
import Checkboxpanel from '../../felles/sporsmal/Checkboxpanel';
import OppsummeringUndertekst from '../../felles/oppsummering/OppsummeringUndertekst';
import AvbrytSoknadContainer from '../../felles/avbryt-soknad/AvbrytSoknadContainer';

const OppsummeringUtvidbar = ({ soknad }) => {
    const _soknad = {
        ...soknad,
        sporsmal: soknad.sporsmal.filter((s) => {
            return s.tag !== VAER_KLAR_OVER_AT;
        }),
    };
    return (<Utvidbar className="blokk js-soknad-oppsummering" tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')} erApen={false}>
        <Oppsummeringsvisning soknad={_soknad} />
    </Utvidbar>);
};

OppsummeringUtvidbar.propTypes = {
    soknad: soknadPt,
};

export const hentSporsmalForOppsummering = (soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === BEKREFT_OPPLYSNINGER;
    });
};

export const SykepengesoknadSelvstendigOppsummeringSkjema = (props) => {
    const { handleSubmit, soknad, skjemasvar, actions, sender, sendingFeilet } = props;
    const populertSoknad = populerSoknadMedSvar(soknad, skjemasvar);
    const sporsmal = hentSporsmalForOppsummering(soknad)[0];
    const vaerKlarOverAtSpm = soknad.sporsmal.find((s) => { return s.tag === VAER_KLAR_OVER_AT; });

    const onSubmit = () => {
        actions.sendSoknad(populertSoknad);
    };
    return (<form className="soknadskjema" id="oppsummering-skjema" onSubmit={handleSubmit(onSubmit)}>
        { skjemasvar && <OppsummeringUtvidbar soknad={populertSoknad} /> }
        <div className="panel blokk">
            <OppsummeringUndertekst {...vaerKlarOverAtSpm} />
        </div>
        <div className="bekreftet-container blokk">
            <Checkboxpanel {...sporsmal} name={sporsmal.tag} />
        </div>
        <Feilstripe vis={sendingFeilet} />
        <Knapperad variant="knapperad--forrigeNeste knapperad--medAvbryt">
            <Link
                to={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/aktiviteter-i-sykmeldingsperioden/`}
                className="knapp">{getLedetekst('sykepengesoknad.tilbake')}</Link>
            <Hovedknapp className="js-send" spinner={sender}>{getLedetekst('sykepengesoknad.send')}</Hovedknapp>
        </Knapperad>
        <AvbrytSoknadContainer sykepengesoknad={soknad} />
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
    sendingFeilet: PropTypes.bool,
};

const Oppsummering = (props) => {
    const { sykmelding, soknad, handleSubmit, skjemasvar, actions, sendingFeilet, sender } = props;
    return (<Soknadskjema
        aktivtSteg="4"
        sykmelding={sykmelding}
        soknad={soknad}>
        <SykepengesoknadSelvstendigOppsummeringSkjema
            soknad={soknad}
            handleSubmit={handleSubmit}
            skjemasvar={skjemasvar}
            sendingFeilet={sendingFeilet}
            sender={sender}
            actions={actions} />
    </Soknadskjema>);
};

Oppsummering.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    skjemasvar: skjemasvarPt,
    actions: PropTypes.shape({
        sendSoknad: PropTypes.func,
        utfyllingStartet: PropTypes.func,
    }),
    sendingFeilet: PropTypes.bool,
    sender: PropTypes.bool,
};

export default Oppsummering;
