import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import { log } from 'digisyfo-npm';
import Header from '../../../containers/sykepengesoknad-utland/SykepengesoknadUtlandHeader';
import Sporsmal from '../../soknad-felles/Sporsmal';
import { JA_NEI } from '../../../enums/svarverdityper';
import { soknad as soknadPt } from '../../../propTypes';
import { OPPHOLD_UTLAND_SKJEMA } from '../../../enums/skjemanavn';
import validate from '../validering/validerUtlandsSkjema';
import FeiloppsummeringContainer, {onSubmitFail} from "../../../containers/FeiloppsummeringContainer";


const UtlandsSkjema = ({ soknad, handleSubmit }) => {
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

    const onSubmit = () => {
        log('send skjema');
    };
    return (<form className="soknadskjema" id="sykepengesoknad-utland-skjema" onSubmit={handleSubmit(onSubmit)}>
        <Header />
        <div className="begrensning">
            <FeiloppsummeringContainer skjemanavn={ OPPHOLD_UTLAND_SKJEMA } />
            {sporsmalsliste}
            <div className="knapperad blokk">
                <input type="submit" value="Send" className="knapp knapp--hoved" />
            </div>
        </div>
    </form>);
};

UtlandsSkjema.propTypes = {
    soknad: soknadPt,
    handleSubmit: PropTypes.func,

};

export default reduxForm({
    form: OPPHOLD_UTLAND_SKJEMA,
    validate,
    onSubmitFail: (errors, dispatch) => {
        onSubmitFail(errors, dispatch, OPPHOLD_UTLAND_SKJEMA);
    },
})(UtlandsSkjema);
