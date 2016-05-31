import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/brukerinfo_actions.js';

export const VelgArbeidssituasjon = (props) => {
    const clickHandler = (e, verdi) => {
        e.preventDefault();
        props.setArbeidssituasjon(verdi);
    };

    return (<ul className="side-innhold">
            {
                props.arbeidssituasjoner.map((a, index) => {
                    return (<li key={index}>
                    {
                        a.verdi !== props.valgtArbeidssituasjon ?
                        <a href="#" onClick={(e) => { clickHandler(e, a.verdi); }}>{a.tittel}</a> : <span>{a.tittel}</span>
                    }
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
        valgtArbeidssituasjon: state.brukerinfo.innstillinger.arbeidssituasjon || 'arbeidstaker',
        arbeidssituasjoner: [{
            tittel: 'Arbeidstaker',
            verdi: 'arbeidstaker',
        }, {
            tittel: 'Ikke arbeidstaker',
            verdi: 'ikke-arbeidstaker',
        }],
    };
}

const TidslinjeVelgArbeidssituasjonContainer = connect(mapStateToProps, actionCreators)(VelgArbeidssituasjon);

export default TidslinjeVelgArbeidssituasjonContainer;
