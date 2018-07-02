import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import Header from '../../../containers/sykepengesoknad-utland/SykepengesoknadUtlandHeader';
import Sporsmal from '../../soknad-felles/Sporsmal';
import { JA_NEI } from '../../../enums/svarverdityper';
import { soknad as soknadPt } from '../../../propTypes';


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
        console.log('send skjema');
    };
    return (<form className="soknadskjema" id="sykepengesoknad-utland-skjema" onSubmit={handleSubmit(onSubmit)}>
        <Header />
        <div className="begrensning">
            { sporsmalsliste }
            <div className="knapperad blokk">
                <input type="submit" value="Send" className="knapp" />
            </div>
        </div>
    </form>);
};

UtlandsSkjema.propTypes = {
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
};

const SYKEPENGER_UTLAND_SKJEMANAVN = 'SYKEPENGER_UTLAND';

export default reduxForm({
    form: SYKEPENGER_UTLAND_SKJEMANAVN,
})(UtlandsSkjema);
