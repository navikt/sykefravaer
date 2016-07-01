import React, { PropTypes } from 'react';
import Dropdown from '../components/Dropdown.js';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/dineSykmeldinger_actions.js';
import { getLedetekst } from '../ledetekster';

const DropdownContainer = ({ alternativer, sorterSykmeldinger, ledetekster, status }) => {
    return (<div className="header-verktoy">
        <label htmlFor="sykmeldinger-sortering" className="header-verktoy-label">{getLedetekst('dine-sykmeldinger.sorter.label', ledetekster.data)}</label>
        <div className="select-container select-container--liten">
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
    return {
        ledetekster: state.ledetekster,
        alternativer: [{
            tekst: 'Dato',
            verdi: 'fom',
        }, {
            tekst: 'Arbeidsgiver',
            verdi: 'arbeidsgiver',
        }],
    };
}

const SykmeldingerSorteringContainer = connect(mapStateToProps, actionCreators)(DropdownContainer);

export default SykmeldingerSorteringContainer;
