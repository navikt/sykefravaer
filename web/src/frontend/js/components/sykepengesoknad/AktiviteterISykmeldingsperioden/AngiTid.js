import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import Radioknapper from '../../skjema/Radioknapper';
import Tallvelger from '../../skjema/Tallvelger';
import { lagDesimaltall } from '../../../utils';

class AngiTid extends Component {
    getValgtEnhet() {
        return this.props.perioder[this.props.periodeIndex].gjennomsnittPerUke.enhet.input.value;
    }

    getEnhetLabel() {
        return this.getValgtEnhet() === 'timer' ? 'timer totalt per uke' : 'prosent totalt per uke';
    }

    getNormalSporsmal() {
        return 'Hvor mange timer jobber du normalt per uke?';
    }

    visFaktiskAntall() {
        return this.getValgtEnhet() !== '';
    }

    visNormaltAntall() {
        return this.visFaktiskAntall() && this.props.perioder[this.props.periodeIndex].gjennomsnittPerUke.normaltAntall;
    }

    render() {
        const { input } = this.props;
        const enheter = [{
            value: 'prosent',
            label: 'i prosent',
        }, {
            value: 'timer',
            label: 'i timer',
        }];

        return (<div>
                <Field component={Radioknapper} name={this.props.names[0]} horisontal>
                    {enheter.map((enhet, index) => {
                        return <input {...enhet} key={index} />;
                    })}
                </Field>
                {this.visFaktiskAntall() && <div className={this.visNormaltAntall() ? 'blokk' : ''}>
                    <Field id={`angiTid--${this.props.periodeIndex}`} component={Tallvelger} parse={lagDesimaltall} label={this.getEnhetLabel()} name={this.props.names[1]} />
                </div> }
                {this.visNormaltAntall() && <div className="skjema__input">
                    <label htmlFor={`periode-${this.props.periodeIndex}-normal`} className="skjema__sporsmal">{this.getNormalSporsmal()}</label>
                    <Field name={this.props.names[2]} id={`periode-${this.props.periodeIndex}-normal`} component={Tallvelger} parse={lagDesimaltall} label="timer per uke" />
                </div>}
        </div>);
    }
}

AngiTid.propTypes = {
    perioder: PropTypes.array,
    periodeIndex: PropTypes.number,
    input: PropTypes.object,
    names: PropTypes.array,
};

export default AngiTid;
