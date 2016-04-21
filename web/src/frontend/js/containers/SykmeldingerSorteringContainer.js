import React, { PropTypes } from 'react';
import Dropdown from '../components/Dropdown.js';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/sykmeldinger_actions.js';

const DropdownContainer = (props) => {
    return (<div className="header-verktoy">
        <label htmlFor="sykmeldinger-sortering" className="header-verktoy-label">Sorter etter</label>
        <Dropdown {...props} onChange={props.sorterSykmeldinger} />
    </div>);
};

function mapStateToProps() {
    return {
        alternativer: [{
            tekst: 'Startdato',
            verdi: 'fom',
        }, {
            tekst: 'Arbeidsgiver',
            verdi: 'arbeidsgiver',
        }],
        ariaControls: 'sykmelding-liste',
        id: 'sykmeldinger-sortering',
    };
}

DropdownContainer.propTypes = {
    sorterSykmeldinger: PropTypes.function,
};

const SykmeldingerSorteringContainer = connect(mapStateToProps, actionCreators)(DropdownContainer);

export default SykmeldingerSorteringContainer;
