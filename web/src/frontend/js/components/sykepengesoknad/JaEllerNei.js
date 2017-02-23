import React, { Component, PropTypes } from 'react';
import Radioknapper from '../skjema/Radioknapper';
import { Field } from 'redux-form';
import { scrollTo, erSynligIViewport } from 'digisyfo-npm';

export const jaEllerNeiAlternativer = [{
    value: true,
    label: 'Ja',
}, {
    value: false,
    label: 'Nei',
}];

export const JaEllerNeiRadioknapper = (props) => {
    return (<Radioknapper {...props} name={props.input.name}>
        {
            jaEllerNeiAlternativer.map((alternativ, index) => {
                return <input {...alternativ} key={index} />;
            })
        }
    </Radioknapper>);
};

JaEllerNeiRadioknapper.propTypes = {
    input: PropTypes.object,
};

export class SporsmalMedTillegg extends Component {
    constructor(props) {
        super(props);
        const erApen = this.getErApen(props);
        this.state = {
            erApen,
            containerClassName: '',
            hindreToggle: false,
            hoyde: !erApen ? '0' : 'auto',
            visInnhold: erApen,
            opacity: erApen ? '1' : '0',
        };
    }

    componentDidUpdate(prevProps) {
        const varApen = this.getErApen(prevProps);
        const erApen = this.getErApen(this.props);
        if (erApen !== varApen) {
            if (erApen) {
                this.apne();
            } else {
                this.lukk();
            }
        }
    }

    getContainerClass() {
        return `tilleggssporsmal__innholdContainer${this.state.containerClassName}`;
    }

    onHoydeTransitionEnd(event) {
        if (!this.state.harAnimasjon) {
            return false;
        }
        if (this.state.erApen) {
            this.setState({
                hindreToggle: false,
                harAnimasjon: false,
            });
            this.setAutoHoyde();
            this.fadeIn();
            setTimeout(() => {
                scrollTo(this.refs.sporsmal, 600);
            }, 300);
        } else {
            this.setState({
                hindreToggle: false,
                visInnhold: false,
                harAnimasjon: false,
                opacity: '0',
            });
            if (!erSynligIViewport(this.refs.sporsmal)) {
                scrollTo(this.refs.sporsmal, 600);
            }
        }
        return;
    }

    getErApen(props) {
        const { input, children, verdiMedTilleggssporsmal = true } = props;
        return (input.value === verdiMedTilleggssporsmal) && children ? true : false;
    }

    setAutoHoyde() {
        /* Fjerner animasjonsklassen slik at Safari ikke
        tegner komponenten på nytt når høyde settes til 'auto': */
        this.setState({
            containerClassName: '',
        });
        // Setter høyde til auto:
        setTimeout(() => {
            this.setState({
                hoyde: 'auto',
                containerClassName: '',
            });
        }, 0);
    }

    fadeUt() {
        this.setState({
            opacity: '0',
        });
    }

    fadeIn() {
        this.setState({
            opacity: '1',
        });
    }

    apne() {
        this.setState({
            hoyde: '0',
            hindreToggle: true,
            containerClassName: ' tilleggssporsmal__innholdContainer--medAnimasjon',
            visInnhold: true,
            harAnimasjon: true,
        });
        setTimeout(() => {
            const hoyde = this.refs.innhold.offsetHeight;
            this.setState({
                erApen: true,
                hoyde,
            });
        }, 0);
    }

    lukk() {
        const hoyde = this.refs.innhold.offsetHeight;
        this.setState({
            hoyde,
            hindreToggle: true,
            opacity: '0',
        });
        setTimeout(() => {
            this.setState({
                containerClassName: ' tilleggssporsmal__innholdContainer--medAnimasjon',
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    render() {
        const { intro, input, children, Valg } = this.props;
        return (<div className="blokk--xs">
            <div className="hovedsporsmal" ref="sporsmal">
                { intro && <p className="skjema__sporsmal blokk--s js-intro">{intro}</p> }
                {Valg}
            </div>
            <div ref="container" style={{ height: this.state.hoyde }} className={this.getContainerClass()} onTransitionEnd={(event) => {
                this.onHoydeTransitionEnd(event);
            }}>
                {
                    this.state.visInnhold ? <div className="tilleggssporsmal js-tillegg" ref="innhold">
                        <div className="tilleggssporsmal__innhold" style={{ opacity: this.state.opacity }}>
                            {children}
                        </div>
                    </div> : null
                }
            </div>
        </div>);
    }
};

export const RendreJaEllerNei = (props) => {
    const Valg = <JaEllerNeiRadioknapper {...props} />
    return <SporsmalMedTillegg {...props} Valg={Valg} />;
}

SporsmalMedTillegg.propTypes = {
    intro: PropTypes.string,
    input: PropTypes.object,
    verdiMedTilleggssporsmal: PropTypes.bool,
    children: PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
};

export const parseJaEllerNei = (value) => {
    return value === 'true' || value === 'false' ? value === 'true' : value;
};

const JaEllerNei = (props) => {
    return <Field component={RendreJaEllerNei} {...props} parse={parseJaEllerNei} />;
};

export default JaEllerNei;
