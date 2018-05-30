import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Radioknapper from '../skjema/Radioknapper';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { childEllerChildren, fieldPropTypes, svar as svarPt } from '../../propTypes';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import { JA, NEI } from '../../enums/svarEnums';

const jaEllerNeiAlternativer = [JA, NEI];

export const JaEllerNeiRadioknapper = (props) => {
    return (<Radioknapper {...props} name={props.input.name} spoersmal={props.sporsmalstekst}>
        {
            jaEllerNeiAlternativer
                .map((alternativ, index) => {
                    return (<input
                        value={alternativ}
                        label={getLedetekst(`sykepengesoknad.${alternativ.toLowerCase()}`)}
                        key={index} />);
                })
        }
    </Radioknapper>);
};

JaEllerNeiRadioknapper.propTypes = {
    input: fieldPropTypes.input,
    intro: PropTypes.string,
    sporsmalstekst: PropTypes.string,
};

export const RendreJaEllerNei = (props) => {
    const Sporsmal = <JaEllerNeiRadioknapper {...props} />;
    if (props.svar.undersporsmal.length === 0) {
        return Sporsmal;
    }
    return (<SporsmalMedTillegg
        {...props}
        Sporsmal={Sporsmal}
        className="hovedsporsmal blokk--xs"
        visTillegg={(_props) => {
            return _props.input.value === _props.svar.kriterieForVisningAvUndersporsmal;
        }}>
        <div className="hovedsporsmal__tilleggssporsmal">{props.children}</div>
    </SporsmalMedTillegg>);
};

RendreJaEllerNei.propTypes = {
    children: childEllerChildren,
    svar: svarPt,
};

const JaEllerNei = (props) => {
    return (<Field
        format={formaterEnkeltverdi}
        parse={genererParseForEnkeltverdi(props.id)}
        component={RendreJaEllerNei}
        {...props} />);
};

JaEllerNei.propTypes = {
    id: PropTypes.string,
};

export default JaEllerNei;
