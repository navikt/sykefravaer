import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Checkboks from '../skjema/Checkbox';
import { fieldPropTypes, sporsmal as sporsmalPt } from '../../propTypes';
import Undersporsmal from './Undersporsmal';
import { formaterEnkeltverdi, genererParseForCheckbox } from './fieldUtils';

const rendreCheckbox = (props) => {
    return (<Checkboks {...props} />);
};

rendreCheckbox.propTypes = {
    meta: fieldPropTypes.meta,
};

const Checkbox = ({ sporsmalstekst, undersporsmal, name, id, renderComponent = rendreCheckbox }) => {
    const parse = genererParseForCheckbox(id);
    return (<Field
        parse={parse}
        format={formaterEnkeltverdi}
        component={renderComponent}
        name={name}
        label={sporsmalstekst}
        id={name}>
        {
            undersporsmal.map((spm, index) => {
                return <Undersporsmal sporsmal={spm} key={`${spm.tag}-${index}`} />;
            })
        }
    </Field>);
};

Checkbox.propTypes = {
    sporsmalstekst: PropTypes.string,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    name: PropTypes.string,
    id: PropTypes.string,
    renderComponent: PropTypes.func,
};

export default Checkbox;
