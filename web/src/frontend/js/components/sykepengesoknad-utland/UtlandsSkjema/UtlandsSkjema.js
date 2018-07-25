import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import { getLedetekst } from 'digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import Header from '../../../containers/sykepengesoknad-utland/SykepengesoknadUtlandHeader';
import Sporsmal from '../../soknad-felles/Sporsmal';
import { JA_NEI } from '../../../enums/svarverdityper';
import { soknad as soknadPt } from '../../../propTypes';
import { OPPHOLD_UTLAND_SKJEMA } from '../../../enums/skjemanavn';
import validate from '../validering/validerUtlandsSkjema';
import FeiloppsummeringContainer, { onSubmitFail } from '../../../containers/FeiloppsummeringContainer';
import populerSoknadMedSvar from '../../../utils/soknad-felles/populerSoknadMedSvar';


const UtlandsSkjema = ({ soknad, handleSubmit, sender, sendSoknad }) => {
    const sporsmalsliste = soknad.sporsmal.map((sporsmal) => {
        const className = cn({ hovedsporsmal: sporsmal.svartype !== JA_NEI, 'blokk--xs': true });
        return (<div className={className}>
            <Sporsmal
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

    return (<form className="soknadskjema" id="sykepengesoknad-utland-skjema" onSubmit={handleSubmit(onSubmit)}>
        <Header />
        <div className="begrensning">
            <FeiloppsummeringContainer skjemanavn={OPPHOLD_UTLAND_SKJEMA} />
            {sporsmalsliste}
            <div className="knapperad blokk">
                <Hovedknapp
                    type="submit"
                    disabled={sender}
                    spinner={sender}>{getLedetekst('sykepengesoknad.send')}</Hovedknapp>
            </div>
        </div>
    </form>);
};

UtlandsSkjema.propTypes = {
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    sendSoknad: PropTypes.func,
    sender: PropTypes.bool,
};

export default reduxForm({
    form: OPPHOLD_UTLAND_SKJEMA,
    validate,
    onSubmitFail: (errors, dispatch) => {
        onSubmitFail(errors, dispatch, OPPHOLD_UTLAND_SKJEMA);
    },
})(UtlandsSkjema);
