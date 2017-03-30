import React, { Component, PropTypes } from 'react';
import { scrollTo, erSynligIViewport } from 'digisyfo-npm';

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

    onHoydeTransitionEnd() {
        if (!this.state.harAnimasjon) {
            return;
        }
        if (this.state.erApen) {
            this.setState({
                hindreToggle: false,
                harAnimasjon: false,
            });
            this.setAutoHoyde();
            this.fadeIn();
            setTimeout(() => {
                this.scrollToHovedsporsmal();
            }, 300);
            return;
        }
        this.setState({
            hindreToggle: false,
            visInnhold: false,
            harAnimasjon: false,
            opacity: '0',
        });
        this.scrollToHovedsporsmal();
        return;
    }

    getContainerClass() {
        return `tilleggssporsmal__innholdContainer${this.state.containerClassName}`;
    }

    getErApen(props) {
        return this.props.visTillegg(props);
    }

    setAutoHoyde() {
        /* Fjerner animasjonsklassen slik at Safari ikke
        tegner komponenten på nytt når høyde settes til 'auto': */
        this.setState({
            gammelHoyde: this.state.hoyde,
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

    scrollToHovedsporsmal() {
        if (!erSynligIViewport(this.refs.hovedsporsmal)) {
            scrollTo(this.refs.hovedsporsmal, 600);
        }
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
        const that = this;
        setTimeout(() => {
            const hoyde = that.refs.tilleggsinnhold.offsetHeight;
            that.setState({
                erApen: true,
                hoyde,
            });
        }, 0);
    }

    lukk() {
        const hoyde = this.refs.tilleggsinnhold.offsetHeight || this.state.gammelHoyde;
        this.setState({
            hoyde,
            hindreToggle: true,
            opacity: '0',
        });
        setTimeout(() => {
            this.setState({
                harAnimasjon: true,
                containerClassName: ' tilleggssporsmal__innholdContainer--medAnimasjon',
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    render() {
        const { children, Sporsmal, className } = this.props;
        return (<div className={className}>
            <div ref="hovedsporsmal">
                {Sporsmal}
            </div>
            <div ref="container" style={{ height: this.state.hoyde }} className={this.getContainerClass()} onTransitionEnd={() => {
                this.onHoydeTransitionEnd();
            }}>
                {
                    this.state.visInnhold ? <div className="js-tillegg" ref="tilleggsinnhold">
                        <div className="tilleggsinnhold__innhold" style={{ opacity: this.state.opacity }}>
                            {children}
                        </div>
                    </div> : null
                }
            </div>
        </div>);
    }
}

SporsmalMedTillegg.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    Sporsmal: PropTypes.element,
    visTillegg: PropTypes.func,
    className: PropTypes.string,
};

export default SporsmalMedTillegg;
