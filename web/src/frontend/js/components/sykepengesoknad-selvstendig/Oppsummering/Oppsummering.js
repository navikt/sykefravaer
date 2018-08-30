import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { sykmelding as sykmeldingPt, getLedetekst, Utvidbar } from 'digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import SoknadskjemaSelvstendig from '../SoknadskjemaSelvstendig';
import { soknad as soknadPt, skjemasvar as skjemasvarPt } from '../../../propTypes';
import Feilstripe from '../../../components/Feilstripe';
import Knapperad from '../../skjema/Knapperad';
import populerSoknadMedSvar from '../../../utils/soknad-felles/populerSoknadMedSvar';
import Oppsummeringsvisning from '../../soknad-felles-oppsummering/Oppsummeringsvisning';
import { BEKREFT_OPPLYSNINGER, VAER_KLAR_OVER_AT } from '../../../enums/tagtyper';
import Checkboxpanel from '../../soknad-felles/Checkboxpanel';
import OppsummeringUndertekst from '../../soknad-felles-oppsummering/OppsummeringUndertekst';

const OppsummeringUtvidbar = ({ soknad }) => {
    return (<Utvidbar className="blokk" tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')} erApen={false}>
        <Oppsummeringsvisning soknad={soknad} />
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
        <div className="panel">
            <OppsummeringUndertekst {...vaerKlarOverAtSpm} />
        </div>
        <div className="bekreftet-container blokk">
            <Checkboxpanel {...sporsmal} name={sporsmal.tag} />
        </div>
        <Feilstripe vis={sendingFeilet} />
        <Knapperad variant="knapperad--forrigeNeste">
            <Link
                to={`/sykefravaer/soknader/${soknad.id}/aktiviteter-i-sykmeldingsperioden/`}
                className="knapp">{getLedetekst('sykepengesoknad.tilbake')}</Link>
            <Hovedknapp className="js-send" spinner={sender}>{getLedetekst('sykepengesoknad.send')}</Hovedknapp>
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
    sendingFeilet: PropTypes.bool,
};

const Oppsummering = (props) => {
    const { sykmelding, soknad, handleSubmit, skjemasvar, actions, sendingFeilet, sender } = props;
    return (<SoknadskjemaSelvstendig
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
    </SoknadskjemaSelvstendig>);
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
