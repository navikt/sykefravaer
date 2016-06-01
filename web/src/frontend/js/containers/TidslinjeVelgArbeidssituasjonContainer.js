import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/brukerinfo_actions.js';

export const VelgArbeidssituasjon = (props) => {
    const clickHandler = (e, verdi) => {
        e.preventDefault();
        props.setArbeidssituasjon(verdi);
    };

    return (<ul className="tidslinje-velg-arbeidssituasjon">
            {
                props.arbeidssituasjoner.map((a, index) => {
                    return (<li key={index}>
                    <a
                        role="button"
                        aria-pressed={a.verdi === props.valgtArbeidssituasjon}
                        className={(a.verdi === props.valgtArbeidssituasjon) ? 'er-valgt' : ''}
                        href="#"
                        onClick={(e) => { clickHandler(e, a.verdi); }}>{a.tittel}</a>
                    </li>);
                })
            }
        </ul>);
};

VelgArbeidssituasjon.propTypes = {
    arbeidssituasjoner: PropTypes.array,
    valgtArbeidssituasjon: PropTypes.string,
};

export function mapStateToProps(state) {
    return {
        valgtArbeidssituasjon: state.brukerinfo.data.arbeidssituasjon || 'MED_ARBEIDSGIVER',
        arbeidssituasjoner: [{
            tittel: 'Jeg har arbeidsgiver',
            verdi: 'MED_ARBEIDSGIVER',
        }, {
            tittel: 'Jeg har ikke arbeidsgiver',
            verdi: 'UTEN_ARBEIDSGIVER',
        }],
    };
}

const TidslinjeVelgArbeidssituasjonContainer = connect(mapStateToProps, actionCreators)(VelgArbeidssituasjon);

export default TidslinjeVelgArbeidssituasjonContainer;
