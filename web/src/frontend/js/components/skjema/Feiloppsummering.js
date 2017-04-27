import React, { PropTypes, Component } from 'react';
import { Fields, Field } from 'redux-form';
import { getObjectValueByString } from '../../utils';
import { scrollTo, erSynligIViewport } from 'digisyfo-npm';

const FeilElement = ({ input, meta }) => {
    return (<li className="feiloppsummering__feil">
        <a href={`#${input.name}`}>{meta.error}</a>
    </li>);
};

FeilElement.propTypes = {
    input: PropTypes.shape({
        name: PropTypes.string,
    }),
    meta: PropTypes.shape({
        error: PropTypes.string,
    }),
};

class Feilliste extends Component {
    componentDidUpdate(prevProps) {
        const { settFokus, skjemaErGyldig, skjemanavn } = this.props;
        if (settFokus) {
            if (!erSynligIViewport(this.refs.oppsummering)) {
                scrollTo(this.refs.oppsummering, 300);
                setTimeout(() => {
                    this.fokuserOppsummering();
                }, 300);
            } else {
                this.fokuserOppsummering();
            }
        }
        if (this.getErrors(this.props).length === 0 && this.getErrors(prevProps).length > 0) {
            skjemaErGyldig(skjemanavn);
        }
    }

    getErrors(props) {
        return props.names.filter((field) => {
            const meta = getObjectValueByString(props, field).meta;
            return meta && meta.touched && meta.error && meta.error !== '';
        });
    }

    fokuserOppsummering() {
        const { sendSkjemaFeiletHandtert, skjemanavn } = this.props;
        this.refs.oppsummering.focus();
        sendSkjemaFeiletHandtert(skjemanavn);
    }

    render() {
        const errors = this.getErrors(this.props);
        return (<div aria-live="polite" role="alert">
        {
            (() => {
                if (errors.length > 0 && this.props.visFeilliste) {
                    return (<div className="panel panel--feiloppsummering blokk--xs" ref="oppsummering" tabIndex="-1">
                        <h3 className="feiloppsummering__tittel">Det er {errors.length} feil i skjemaet</h3>
                        <ul className="feiloppsummering__liste">
                        {
                            errors.map((field, index) => {
                                return <Field key={index} name={field} component={FeilElement} />;
                            })
                        }
                        </ul>
                    </div>);
                }
                return null;
            })()
        }
        </div>);
    }
}

Feilliste.propTypes = {
    settFokus: PropTypes.bool,
    sendSkjemaFeiletHandtert: PropTypes.func.isRequired,
    skjemaErGyldig: PropTypes.func.isRequired,
    skjemanavn: PropTypes.string.isRequired,
    visFeilliste: PropTypes.bool,
};

const Feiloppsummering = (props) => {
    return <Fields {...props} component={Feilliste} />;
};

export default Feiloppsummering;
