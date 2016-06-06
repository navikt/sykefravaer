import React, { PropTypes } from 'react';
import Dropdown from '../components/Dropdown.js';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/dineSykmeldinger_actions.js';

const DropdownContainer = ({ alternativer, sorterSykmeldinger }) => {
    return (<div className="header-verktoy">
        <label htmlFor="sykmeldinger-sortering" className="header-verktoy-label">Sorter etter</label>
        <div className="select-container select-container--liten">
            <Dropdown alternativer={alternativer} id="sykmeldinger-sortering" ariaControls="sykmelding-liste" onChange={sorterSykmeldinger} />
        </div>
    </div>);
};

DropdownContainer.propTypes = {
    alternativer: PropTypes.array,
    sorterSykmeldinger: PropTypes.func,
};

function mapStateToProps() {
    return {
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
