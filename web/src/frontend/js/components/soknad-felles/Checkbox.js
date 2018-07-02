import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Checkboks from '../skjema/Checkbox';
import { fieldPropTypes, sporsmal as sporsmalPt } from '../../propTypes';
import Undersporsmal from './Undersporsmal';
import { formaterEnkeltverdi, genererParseForCheckbox } from './fieldUtils';
import Feilomrade from '../skjema/Feilomrade';

const rendreCheckbox = (props) => {
    return (<Feilomrade {...props.meta}>
        <Checkboks {...props} />
    </Feilomrade>);
};

rendreCheckbox.propTypes = {
    meta: fieldPropTypes.meta,
};

const Checkbox = ({ sporsmalstekst, undersporsmal, name, id }) => {
    const parse = genererParseForCheckbox(id);
    return (<Field
        parse={parse}
        format={formaterEnkeltverdi}
        component={rendreCheckbox}
        name={name}
        label={sporsmalstekst}
        id={name}>
        {
            undersporsmal.length > 0
                ? undersporsmal.map((spm, index) => {
                    return <Undersporsmal sporsmal={spm} key={`${spm.tag}-${index}`} />;
                })
                : null
        }
    </Field>);
};

Checkbox.propTypes = {
    sporsmalstekst: PropTypes.string,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    name: PropTypes.string,
    id: PropTypes.string,
};

export default Checkbox;
