import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import { getLedetekst } from 'digisyfo-npm';
import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';
import { browserHistory } from 'react-router';
import Header from '../../../containers/sykepengesoknad-utland/SykepengesoknadUtlandHeader';
import Sporsmal from '../../soknad-felles/Sporsmal';
import { soknad as soknadPt } from '../../../propTypes';
import { OPPHOLD_UTLAND_SKJEMA } from '../../../enums/skjemanavn';
import validate from '../validering/validerUtlandsSkjema';
import FeiloppsummeringContainer, { onSubmitFail } from '../../../containers/FeiloppsummeringContainer';
import populerSoknadMedSvar from '../../../utils/soknad-felles/populerSoknadMedSvar';
import { IKKE_RELEVANT, JA_NEI } from '../../../enums/svartyper';
import { getContextRoot } from '../../../routers/paths';


export const Utlandsskjema = ({ soknad, handleSubmit, sender, sendSoknad, avbryter, avbrytSoknad, ferie }) => {
    const sporsmallisteSkjema = () => {
        return ferie ? soknad.sporsmal.filter((sporsmal) => {
            return IKKE_RELEVANT !== sporsmal.svartype;
        }) : soknad.sporsmal;
    };

    const sporsmalsliste = sporsmallisteSkjema().map((sporsmal) => {
        const className = cn({ hovedsporsmal: sporsmal.svartype !== JA_NEI, 'blokk--xs': true });
        return (<div className={className}>
            <Sporsmal
                hovedsporsmal
                sporsmal={sporsmal}
                key={sporsmal.tag}
                name={sporsmal.tag}
            />
        </div>);
    });
    const onSubmit = (values) => {
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        sendSoknad(populertSoknad);
    };

    const visKnapp = () => {
        return ferie
            ? (<Fareknapp
                type="button"
                disabled={avbryter}
                spinner={avbryter}
                onClick={(event) => {
                    avbrytSoknad(soknad);
                    browserHistory.push(getContextRoot());
                    event.preventDefault();
                }}>{getLedetekst('sykepengesoknad.avbryt-soknad')}</Fareknapp>)
            : <Hovedknapp type="submit" disabled={sender} spinner={sender}>{getLedetekst('sykepengesoknad.send')}</Hovedknapp>;
    };

    return (<form className="soknadskjema" id="sykepengesoknad-utland-skjema" onSubmit={handleSubmit(onSubmit)}>
        <Header />
        <div className="begrensning">
            <FeiloppsummeringContainer skjemanavn={OPPHOLD_UTLAND_SKJEMA} />
            {sporsmalsliste}
            <div className="knapperad blokk">
                {visKnapp(ferie)}
            </div>
        </div>
    </form>);
};

Utlandsskjema.propTypes = {
    soknad: soknadPt,
    ferie: PropTypes.bool,
    handleSubmit: PropTypes.func,
    sendSoknad: PropTypes.func,
    sender: PropTypes.bool,
    avbrytSoknad: PropTypes.func,
    avbryter: PropTypes.bool,
};

export default reduxForm({
    form: OPPHOLD_UTLAND_SKJEMA,
    validate,
    onSubmitFail: (errors, dispatch) => {
        onSubmitFail(errors, dispatch, OPPHOLD_UTLAND_SKJEMA);
    },
})(Utlandsskjema);
