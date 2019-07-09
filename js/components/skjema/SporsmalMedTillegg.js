/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { erSynligIViewport, scrollTo } from '@navikt/digisyfo-npm';
import { Vis } from '../../utils';

class SporsmalMedTillegg extends Component {
    constructor(props) {
        super(props);
        const erApen = this.getErApen(props);
        this.state = {
            erApen,
            containerClassName: '',
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
        const { harAnimasjon, erApen } = this.state;
        if (!harAnimasjon) {
            return;
        }
        this.setState(prevState => ({
            containerClassName: prevState.containerClassName.replace(' animerer', ''),
        }));

        if (erApen) {
            this.setState({
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
            visInnhold: false,
            harAnimasjon: false,
            opacity: '0',
        });
        this.scrollToHovedsporsmal();
    }

    getContainerClass() {
        const { containerClassName } = this.state;
        return `tilleggssporsmal__innholdContainer${containerClassName}`;
    }

    getErApen(props) {
        const { visTillegg } = this.props;
        return visTillegg(props);
    }

    setAutoHoyde() {
        /* Fjerner animasjonsklassen slik at Safari ikke
        tegner komponenten på nytt når høyde settes til 'auto': */
        this.setState(prevState => ({
            gammelHoyde: prevState.hoyde,
            containerClassName: '',
        }));
        // Setter høyde til auto:
        setTimeout(() => {
            this.setState({
                hoyde: 'auto',
                containerClassName: '',
            });
        }, 0);
    }

    scrollToHovedsporsmal() {
        if (!erSynligIViewport(this.hovedsporsmal)) {
            scrollTo(this.hovedsporsmal, 600);
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
            containerClassName: ' tilleggssporsmal__innholdContainer--medAnimasjon',
            visInnhold: true,
            harAnimasjon: true,
        });
        const that = this;
        setTimeout(() => {
            const hoyde = that.tilleggsinnhold ? that.tilleggsinnhold.offsetHeight : 'auto';
            that.setState(prevState => ({
                erApen: true,
                hoyde,
                containerClassName: `${prevState.containerClassName} animerer`,
            }));
        }, 0);
    }

    lukk() {
        const { gammelHoyde } = this.state;

        const hoyde = this.tilleggsinnhold && this.tilleggsinnhold.offsetHeight ? this.tilleggsinnhold.offsetHeight : gammelHoyde;
        this.setState({
            hoyde,
            opacity: '0',
        });
        setTimeout(() => {
            this.setState({
                harAnimasjon: true,
                containerClassName: ' tilleggssporsmal__innholdContainer--medAnimasjon animerer',
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    render() {
        const {
            children, Sporsmal, className, informasjon,
        } = this.props;
        const {
            hoyde, visInnhold, opacity,
        } = this.state;
        return (
            <div className={className}>
                <div ref={(c) => {
                    this.hovedsporsmal = c;
                }}>
                    {Sporsmal}
                </div>
                <div
                    ref={(c) => {
                        this.container = c;
                    }}
                    style={{ height: hoyde }}
                    className={this.getContainerClass()}
                    onTransitionEnd={() => {
                        this.onHoydeTransitionEnd();
                    }}>
                    <Vis
                        hvis={visInnhold}
                        render={() => (
                            <div
                                className="js-tillegg"
                                ref={(c) => {
                                    this.tilleggsinnhold = c;
                                }}>
                                <div className="tilleggsinnhold__innhold" style={{ opacity }}>
                                    {children}
                                </div>
                            </div>
                        )}
                    />
                </div>
                {informasjon}
            </div>
        );
    }
}

SporsmalMedTillegg.propTypes = {
    children: PropTypes.node,
    Sporsmal: PropTypes.element,
    visTillegg: PropTypes.func,
    className: PropTypes.string,
    informasjon: PropTypes.element,
};

export default SporsmalMedTillegg;
