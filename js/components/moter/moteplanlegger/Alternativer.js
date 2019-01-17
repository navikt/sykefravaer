import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { Field } from 'redux-form';
import {
    fieldPropTypes,
    motePt,
    moteplanleggerAlternativPt,
    moteplanleggerDeltakertypePt,
} from '../../../propTypes';
import { BRUKER, ARBEIDSGIVER } from '../../../enums/moteplanleggerDeltakerTyper';
import Feilomrade from './Feilomrade';
import { SvarMedIkon, NavKan } from './SvarMedIkon';
import DatoOgTid from './DatoOgTid';

const Checkbox = (props) => {
    const erAvkrysset = props.input.value.avkrysset === true;
    return (<div className="skjemaelement">
        <input
            className="skjemaelement__input checkboks"
            checked={erAvkrysset}
            type="checkbox"
            id={props.id}
            {...props.input}
            onClick={props.onClick} />
        <label
            className="skjemaelement__label"
            htmlFor={props.id}>
            {props.children}
        </label>
    </div>);
};

Checkbox.propTypes = {
    id: PropTypes.string,
    tid: PropTypes.string,
    input: fieldPropTypes.input,
    name: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    onClick: PropTypes.func,
};

export const Label = ({ tid }) => {
    return (<DatoOgTid
        Tag="div"
        tid={tid}
    />);
};

Label.propTypes = {
    tid: PropTypes.instanceOf(Date),
};

const Alternativer = (props) => {
    const { alternativer, mote, meta = { touched: false, error: '' }, touch, autofill, deltakertype = BRUKER } = props;

    const arbeidsgiver = mote.deltakere.filter((d) => {
        return d.type === ARBEIDSGIVER;
    })[0];
    const bruker = mote.deltakere.filter((d) => {
        return d.type === BRUKER;
    })[0];

    let annenBruker = arbeidsgiver;

    if (deltakertype === ARBEIDSGIVER) {
        annenBruker = bruker;
    }

    return (<Feilomrade {...meta}>
        <ol className="motetidspunkter motetidspunkter--nyeTidspunkter">
            {
                alternativer
                    .sort((a, b) => {
                        if (a.tid > b.tid) {
                            return 1;
                        }
                        if (a.tid < b.tid) {
                            return -1;
                        }
                        return 0;
                    })
                    .map((field, index) => {
                        const annensSvar = annenBruker.svar.filter((s) => {
                            return s.id === field.id;
                        })[0];
                        return (<li className="js-alternativ motetidspunkt" key={index}>
                            <Field
                                component={Checkbox}
                                id={`alternativ_${index}`}
                                name={`alternativer[${index}]`}
                                key={index}
                                onClick={() => {
                                    touch('tidspunkter');
                                    autofill(`alternativer[${alternativer.length}]`, null);
                                }}
                                parse={(erAvkrysset) => {
                                    return {
                                        verdi: field.id,
                                        avkrysset: erAvkrysset,
                                    };
                                }}>
                                <Label tid={field.tid} />
                            </Field>
                            <ul className="alternativsvar">
                                <SvarMedIkon
                                    bruker={annenBruker}
                                    svar={annensSvar}
                                />
                                <NavKan />
                            </ul>
                        </li>);
                    })
            }
        </ol>
        <div className="ingenTidspunktPasser">
            <Field
                onClick={() => {
                    alternativer.forEach((field, index) => {
                        autofill(`alternativer[${index}]`, null);
                    });
                }}
                component={Checkbox}
                id="ingen"
                name={`alternativer[${alternativer.length}]`}
                parse={(erAvkrysset) => {
                    return {
                        verdi: 'ingen',
                        avkrysset: erAvkrysset,
                    };
                }}>{getLedetekst('mote.skjema.alternativer.ingen-alternativer-passer')}</Field>
        </div>
    </Feilomrade>);
};

Alternativer.propTypes = {
    meta: fieldPropTypes.meta,
    alternativer: PropTypes.arrayOf(moteplanleggerAlternativPt),
    touch: PropTypes.func,
    autofill: PropTypes.func,
    visInfo: PropTypes.func,
    mote: motePt,
    deltakertype: moteplanleggerDeltakertypePt,
};

export default Alternativer;
