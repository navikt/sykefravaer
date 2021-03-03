import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '../../ledetekster';
import { keyValue } from '../../propTypes';
import Radiofaner from '../Radiofaner';
import { TIDSLINJE_TYPER } from '../../utils/tidslinjeUtils';

const verdier = {};
verdier[TIDSLINJE_TYPER.MED_ARBEIDSGIVER] = 'med-arbeidsgiver';
verdier[TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER] = 'uten-arbeidsgiver';

const arbeidssituasjoner = (ledetekster) => {
    return [{
        tittel: getLedetekst('tidslinje.filter.med-arbeidsgiver', ledetekster),
        verdi: TIDSLINJE_TYPER.MED_ARBEIDSGIVER,
    }, {
        tittel: getLedetekst('tidslinje.filter.uten-arbeidsgiver', ledetekster),
        verdi: TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER,
        hjelpetekst: getLedetekst('tidslinje.filter.med-arbeidsgiver.hjelpetekst.tekst', ledetekster),
    }];
};

class TidslinjeVelgArbeidssituasjon extends Component {
    changeHandler(verdi) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.endreUrl(`${this.props.rootUrl}/tidslinjen/${verdier[verdi]}`);
        // eslint-disable-next-line react/destructuring-assignment
        this.props.hentTidslinjer(verdi);
    }

    render() {
        const { valgtArbeidssituasjon, ledetekster } = this.props;
        return (
            <Radiofaner
                alternativer={arbeidssituasjoner(ledetekster)}
                valgtAlternativ={valgtArbeidssituasjon}
                changeHandler={(v) => {
                    this.changeHandler(v);
                }}
                radioName="tidslinje-arbeidssituasjon"
                className="blokk-xl"
            />
        );
    }
}

TidslinjeVelgArbeidssituasjon.propTypes = {
    ledetekster: keyValue,
    valgtArbeidssituasjon: PropTypes.string,
    hentTidslinjer: PropTypes.func,
    endreUrl: PropTypes.func,
    rootUrl: PropTypes.string,
};

export default TidslinjeVelgArbeidssituasjon;
