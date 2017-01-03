import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dropdown from '../components/skjema/Dropdown';
import * as actionCreators from '../actions/dineSykmeldinger_actions';
import { getLedetekst } from 'digisyfo-npm';

const DropdownContainer = ({ alternativer, sorterSykmeldinger, ledetekster, status }) => {
    return (<div className="header-verktoy">
        <label htmlFor="sykmeldinger-sortering" className="header-verktoy-label">{getLedetekst('dine-sykmeldinger.sorter.label', ledetekster)}</label>
        <div className="selectContainer selectContainer--liten">
            <Dropdown alternativer={alternativer} id="sykmeldinger-sortering" ariaControls={`sykmelding-liste-${status}`} onChange={(kriterium) => {
                sorterSykmeldinger(kriterium, status);
            }} />
        </div>
    </div>);
};

DropdownContainer.propTypes = {
    alternativer: PropTypes.array,
    sorterSykmeldinger: PropTypes.func,
    ledetekster: PropTypes.object,
    status: PropTypes.string,
};

function mapStateToProps(state) {
    const ledetekster = state.ledetekster.data;

    return {
        ledetekster,
        alternativer: [{
            tekst: getLedetekst('dine-sykmeldinger.sorter.dato', ledetekster),
            verdi: 'fom',
        }, {
            tekst: getLedetekst('dine-sykmeldinger.sorter.arbeidsgiver', ledetekster),
            verdi: 'arbeidsgiver',
        }],
    };
}

const SykmeldingerSorteringContainer = connect(mapStateToProps, actionCreators)(DropdownContainer);

export default SykmeldingerSorteringContainer;
