import React, { Component, PropTypes } from 'react';
import Feilmelding from './Feilmelding';

class Tekstfelt extends Component {
    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
    }

    focus() {
        this.textInput.focus();
    }

    render() {
        const { meta, className, input, id, placeholder, type } = this.props;
        return (<div>
            <input
                autoComplete="off"
                placeholder={placeholder}
                type={type || 'text'}
                id={id}
                className={`${className}${meta.touched && meta.error ? ' input--feil' : ''}`}
                {...input}
                value={input.value} />
            <Feilmelding {...meta} />
        </div>);
    }
};

Tekstfelt.propTypes = {
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    className: PropTypes.string,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
};

export default Tekstfelt;
