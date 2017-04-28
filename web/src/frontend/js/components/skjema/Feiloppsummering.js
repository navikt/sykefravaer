import React, { PropTypes, Component } from 'react';
import { scrollTo, erSynligIViewport } from 'digisyfo-npm';

const FeillisteMelding = ({ feltnavn, feilmelding }) => {
    return (<li className="feiloppsummering__feil">
        <a href={`#${feltnavn}`}>{feilmelding}</a>
    </li>);
};

FeillisteMelding.propTypes = {
    feltnavn: PropTypes.string,
    feilmelding: PropTypes.string,
};

class Feiloppsummering extends Component {
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
        if (this.getFeilmeldinger(this.props).length === 0 && this.getFeilmeldinger(prevProps).length > 0) {
            skjemaErGyldig(skjemanavn);
        }
    }

    getFeilmeldinger(props) {
        return props.feilmeldinger || [];
    }

    fokuserOppsummering() {
        const { sendSkjemaFeiletHandtert, skjemanavn } = this.props;
        this.refs.oppsummering.focus();
        sendSkjemaFeiletHandtert(skjemanavn);
    }

    render() {
        const feilmeldinger = this.getFeilmeldinger(this.props);
        return (<div aria-live="polite" role="alert">
        {
            (() => {
                if (feilmeldinger.length > 0 && this.props.visFeilliste) {
                    return (<div className="panel panel--feiloppsummering blokk--xs" ref="oppsummering" tabIndex="-1">
                        <h3 className="feiloppsummering__tittel">Det er {feilmeldinger.length} feil i skjemaet</h3>
                        <ul className="feiloppsummering__liste">
                        {
                            feilmeldinger.map((feilmld, index) => {
                                return <FeillisteMelding key={index} {...feilmld} />;
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

Feiloppsummering.propTypes = {
    settFokus: PropTypes.bool,
    sendSkjemaFeiletHandtert: PropTypes.func.isRequired,
    skjemaErGyldig: PropTypes.func.isRequired,
    skjemanavn: PropTypes.string.isRequired,
    visFeilliste: PropTypes.bool,
    feilmeldinger: PropTypes.arrayOf(PropTypes.shape({
        feltnavn: PropTypes.string,
        feilmelding: PropTypes.string,
    })),
};

export default Feiloppsummering;
