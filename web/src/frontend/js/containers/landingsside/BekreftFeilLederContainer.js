import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Varselstripe } from 'digisyfo-npm';
import * as actions from '../../actions/ledere_actions';
import { naermesteLeder as naermesteLederPt } from '../../propTypes';

export class LederAvkreftet extends Component {
    componentDidMount() {
        this.lukk.focus();
    }

    render() {
        const { onLukk } = this.props;
        return (<div>
            <p className="hode hode--suksess">Lederen er avkreftet!</p>
            <div className="knapperad">
                <button
                    ref={(c) => {
                        this.lukk = c;
                    }}
                    className="rammeknapp js-lukk"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onLukk();
                    }}>Lukk</button>
            </div>
        </div>);
    }
}

LederAvkreftet.propTypes = {
    onLukk: PropTypes.func,
};

export const BekreftFeil = ({ leder, onAvbryt, avkreftLeder, avkrefter, avkreftFeilet }) => {
    const knappClassName = 'knapp knapp--fare blokk--s js-bekreft';
    return (<div>
        <div className={avkreftFeilet ? 'blokk' : ''}>
            <h3 className="panel__tittel">Endre nærmeste leder</h3>
            <p>Er du sikker på at du vil fjerne <strong>{leder.navn}</strong> som din nærmeste leder i <strong>{leder.organisasjonsnavn}</strong>?</p>
        </div>
        <div aria-live="polite" role="alert" className={avkreftFeilet ? 'panel panel--ramme panel--komprimert' : ''}>
            {
                avkreftFeilet && <Varselstripe type="feil">
                    <p className="sist">Beklager, det oppstod en feil!</p>
                </Varselstripe>
            }
        </div>
        <div className="knapperad">
            <button
                type="button"
                disabled={avkrefter}
                className={knappClassName}
                onClick={() => {
                    avkreftLeder(leder.orgnummer);
                }}>Ja, jeg er sikker
                {avkrefter && <span className="knapp__spinner" />}
            </button>
            <p><a
                className="lenke js-avbryt"
                href="#"
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    onAvbryt();
                }}>Avbryt</a></p>
        </div>
    </div>);
};

BekreftFeil.propTypes = {
    leder: naermesteLederPt,
    onAvbryt: PropTypes.func,
    avkreftLeder: PropTypes.func,
    avkrefter: PropTypes.bool,
    avkreftFeilet: PropTypes.bool,
};

export const Container = (props) => {
    if (props.leder.avkreftet) {
        return <LederAvkreftet onLukk={props.onAvbryt} />;
    }
    return <BekreftFeil {...props} />;
};

Container.propTypes = {
    leder: naermesteLederPt,
    onAvbryt: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    return {
        leder: state.ledere.data.filter((leder) => {
            return leder.orgnummer === ownProps.orgnummer;
        })[0],
        onAvbryt: ownProps.onAvbryt,
        avkrefter: state.ledere.avkrefter,
        avkreftFeilet: state.ledere.avkreftFeilet,
    };
}

const BekreftFeilLederContainer = connect(mapStateToProps, actions)(Container);
export default BekreftFeilLederContainer;
