import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Field } from 'redux-form';
import { jaEllerNeiAlternativer } from './jaEllerNeiHelpers';
import Radioknapper from './Radioknapper';
import SporsmalMedTillegg from './SporsmalMedTillegg';
import { childEllerChildren, fieldPropTypes } from '../../propTypes';
import { Vis } from '../../utils';
import JaEllerNeiRadiopanelgruppe from './JaEllerNeiRadiopanelgruppe';

export const JaEllerNeiRadioknapper = (props) => {
    const { intro, input } = props;
    return (
        <div>
            <Vis
                hvis={intro}
                render={() => (<p className="skjema__sporsmal blokk--s js-intro">{intro}</p>)} />
            <Radioknapper {...props} name={input.name}>
                {
                    jaEllerNeiAlternativer.map((alternativ, index) => <input {...alternativ} key={index} />)
                }
            </Radioknapper>
        </div>
    );
};

JaEllerNeiRadioknapper.propTypes = {
    input: fieldPropTypes.input,
    intro: PropTypes.string,
};

export const RendreJaEllerNei = (props) => {
    const { children, hovedsporsmal, className } = props;
    const Sporsmal = hovedsporsmal
        ? <JaEllerNeiRadiopanelgruppe {...props} />
        : <JaEllerNeiRadioknapper {...props} />;
    const _className = cn('hovedsporsmal', className);
    return (
        <SporsmalMedTillegg
            {...props}
            Sporsmal={Sporsmal}
            className={_className}
            visTillegg={(_props) => {
                const { verdiMedTilleggssporsmal = true } = _props;
                return !!((_props.input.value === verdiMedTilleggssporsmal) && _props.children);
            }}>
            <div className="hovedsporsmal__tilleggssporsmal">{children}</div>
        </SporsmalMedTillegg>
    );
};

RendreJaEllerNei.propTypes = {
    hovedsporsmal: PropTypes.bool,
    children: childEllerChildren,
    className: PropTypes.string,
};

export const parseJaEllerNei = value => (value === 'true' || value === 'false'
    ? value === 'true'
    : value);

const JaEllerNei = props => <Field component={RendreJaEllerNei} {...props} parse={parseJaEllerNei} />;

export default JaEllerNei;
