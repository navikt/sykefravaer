import React, { Component, PropTypes } from 'react';
import { erSynligIViewport } from 'digisyfo-npm';
import { KANGJENNOMFOERES } from '../../enums/arbeidsoppgavesvar';
import LagreArbeidsoppgaveSkjema from './LagreArbeidsoppgaveSkjema';
import VisArbeidsoppgave from './VisArbeidsoppgave';

const kanGjennomfoeresTekst = (arbeidsoppgave, urlImgVarsel) => {
    const kanGjennomfoeres = arbeidsoppgave.gjennomfoering.kanGjennomfoeres;
    if (!arbeidsoppgave.erVurdertAvSykmeldt) {
        return (
            <div>
                <img className="arbeidsgivertabell__rad__advarsel" src={urlImgVarsel} alt="varsel" />
                <span>Ikke vurdert</span>
            </div>
        );
    }
    if (kanGjennomfoeres === KANGJENNOMFOERES.KAN_IKKE) {
        return 'Nei';
    } else if (kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING) {
        return 'Med tilrettelegging';
    } else if (kanGjennomfoeres === KANGJENNOMFOERES.KAN) {
        return 'Ja';
    }
    return '';
};

export class ArbeidsoppgaveRad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erApen: props.erApen,
            containerClassName: '',
            hindreToggle: false,
            hoyde: !props.erApen ? '0' : 'auto',
            visInnhold: props.erApen,
            harTransisjon: false,
            visLagreSkjema: false,
        };
        this.visLagreSkjema = this.visLagreSkjema.bind(this);
    }


    onTransitionEnd() {
        if (this.state.harTransisjon) {
            // Forhindrer scrolling til utenforliggnede
            // Utvidbar dersom flere er nøstet inni hverandre
            this.setState({
                harTransisjon: false,
            });
            if (this.state.erApen) {
                scrollTo(this.refs.utvidbar, 600);
                this.setState({
                    hindreToggle: false,
                });
                this.setAutoHoyde();
            } else {
                this.setState({
                    hindreToggle: false,
                    visInnhold: false,
                });
                if (!erSynligIViewport(this.refs.utvidbar)) {
                    scrollTo(this.refs.utvidbar, 600);
                }
                this.refs['js-toggle'].focus();
            }
        }
    }

    getHeaderClassName() {
        let c = !this.state.erApen ? 'utvidbar__header' : 'utvidbar__header utvidbar__header--erApen';
        if (this.props.variant) {
            c = `${c} utvidbar__header--${this.props.variant}`;
        }
        return c;
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

    apne() {
        this.setState({
            hoyde: '0',
            hindreToggle: true,
            containerClassName: ' utvidbar__innholdContainer--medAnimasjon',
            visInnhold: true,
            harTransisjon: true,
            visLagreSkjema: false,
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
            harTransisjon: true,
        });
        setTimeout(() => {
            this.setState({
                containerClassName: ' utvidbar__innholdContainer--medAnimasjon',
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    toggle(e) {
        e.preventDefault();
        if (!this.state.hindreToggle) {
            /* hindreToggle for å hindre dobbelklikk,
             eller at noen klikker mens animasjonen pågår.
             Dobbelklikk vil skape kluss med logikken. */
            if (this.state.erApen) {
                this.lukk();
            } else {
                this.apne();
            }
        }
    }

    visLagreSkjema() {
        this.setState({
            visLagreSkjema: true,
        });
    }

    render() {
        const { arbeidsoppgave, sendArbeidsoppgave, sendSlettArbeidsoppgave, urlImgVarsel, urlImgArrow } = this.props;

        return (
            <div ref="js-toggle" className="arbeidsgivertabell__rad arbeidsgivertabell__rad--arbeidsgiver">
                <div ref="utvidbar" className="rad">
                    <div className="arbeidsgivertabell__rad__celle">
                        { arbeidsoppgave.arbeidsoppgavenavn }
                    </div>
                    <div className="arbeidsgivertabell__rad__celle">
                        { arbeidsoppgave.opprettetAv.navn }
                    </div>
                    <div className="arbeidsgivertabell__rad__celle">
                        { kanGjennomfoeresTekst(arbeidsoppgave, urlImgVarsel) }
                    </div>
                    <div className="arbeidsgivertabell__rad__celle">
                        <img className="arbeidsgivertabell__rad__pil" src={urlImgArrow} alt="utvid" onClick={(event) => {this.toggle(event);}} />
                    </div>
                </div>
                <div ref="container" style={{ height: this.state.hoyde }} className={`utvidbar__innholdContainer${this.state.containerClassName}`} onTransitionEnd={() => {
                    this.onTransitionEnd();
                }}>
                     <div ref="innhold">
                         {
                             this.state.visInnhold && !this.state.visLagreSkjema &&
                             <VisArbeidsoppgave
                                 arbeidsoppgave={arbeidsoppgave}
                                 visLagreSkjema={this.visLagreSkjema}
                                 sendSlettArbeidsoppgave={sendSlettArbeidsoppgave}
                             />
                         }
                         {
                             this.state.visInnhold && this.state.visLagreSkjema &&
                             <LagreArbeidsoppgaveSkjema
                                 sendArbeidsoppgave={sendArbeidsoppgave}
                                 arbeidsoppgave={arbeidsoppgave}
                                 form={arbeidsoppgave.arbeidsoppgaveId}
                             />
                         }
                     </div>
                </div>
            </div>
        );
    }
}

ArbeidsoppgaveRad.propTypes = {
    arbeidsoppgave: PropTypes.object,
    sendArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    lagtTilAvNavn: PropTypes.string,
    urlImgVarsel: PropTypes.string,
    urlImgArrow: PropTypes.string,
    erApen: PropTypes.bool.isRequired,
    tittel: PropTypes.string,
    ikon: PropTypes.string,
    ikonHover: PropTypes.string,
    ikonAltTekst: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    visLukklenke: PropTypes.bool.isRequired,
};

ArbeidsoppgaveRad.defaultProps = {
    erApen: false,
    Overskrift: 'H3',
    visLukklenke: true,
};

export default ArbeidsoppgaveRad;
