import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {

    BRUKERTYPE,
    captitalizeFirstLetter,
    LagreArbeidsoppgaveSkjema,
    LeggTilElementKnapper,
    OppfolgingsdialogInfoboks,
    ArbeidsoppgaverListe,
    sorterArbeidsoppgaverEtterOpprettet,
    proptypes as oppfolgingProptypes,
    NotifikasjonBoksVurderingOppgave,
    ArbeidsoppgaverInfoboks,
} from 'oppfolgingsdialog-npm';
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';

export const RenderOpprettArbeidsoppgave = ({ ledetekster, sendLagreArbeidsoppgave, toggleArbeidsoppgaveSkjema }) => {
    return (<div>
        <LagreArbeidsoppgaveSkjema
            ledetekster={ledetekster}
            sendLagre={sendLagreArbeidsoppgave}
            avbryt={toggleArbeidsoppgaveSkjema}
            rootUrlImg={getContextRoot()}
        />
    </div>);
};

RenderOpprettArbeidsoppgave.propTypes = {
    ledetekster: keyValue,
    sendLagreArbeidsoppgave: PropTypes.func,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

class Arbeidsoppgaver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nyArbeidsoppgave: false,
            oppdatertArbeidsoppgave: false,
            visArbeidsoppgaveSkjema: false,
        };
        this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
        this.scrollToForm = this.scrollToForm.bind(this);
    }

    componentWillMount() {
        window.location.hash = 'arbeidsoppgaver';
        window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
    }

    componentDidMount() {
        if (this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    sendLagreArbeidsoppgave(values) {
        if (!values.arbeidsoppgaveId) {
            this.state.nyArbeidsoppgave = true;
            this.state.oppdatertArbeidsoppgave = false;
        } else {
            this.state.nyArbeidsoppgave = false;
            this.state.oppdatertArbeidsoppgave = true;
        }
        const nyeValues = {
            ...values,
            arbeidsoppgavenavn: captitalizeFirstLetter(values.arbeidsoppgavenavn),
        };
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialog.id, nyeValues);
    }

    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(this.props.oppfolgingsdialog.id, arbeidsoppgaveId);
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    scrollToForm() {
        const form = findDOMNode(this.lagreSkjema);
        scrollTo(form, 300);
    }

    render() {
        const {
            ledetekster,
            oppfolgingsdialog,
        } = this.props;
        const {
            lagrer,
            lagringFeilet,
            sletter,
            slettingFeilet,
        } = this.props.arbeidsoppgaver;
        const antallIkkeVurdererteArbOppgaver = oppfolgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
            return !arbeidsoppgave.gjennomfoering;
        }).length;
        return (
            (() => {
                if (lagrer || sletter) {
                    return <AppSpinner />;
                } else if (lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                }
                return isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                    <div>
                        { this.state.visArbeidsoppgaveSkjema &&
                        <ArbeidsoppgaverInfoboks
                            ledetekster={ledetekster}
                            tittel={getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.tittel.arbeidstaker')}
                            visSkjema={this.state.visArbeidsoppgaveSkjema}
                            toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                        >
                            { oppfolgingsdialog.arbeidstaker.stillinger.length > 0 &&
                            <div>
                                { oppfolgingsdialog.arbeidstaker.stillinger.map((stilling, idx) => {
                                    return (<p key={idx}>
                                        {getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.arbeidstaker.stilling', {
                                            '%YRKE%': stilling.yrke.toLowerCase(),
                                            '%PROSENT%': stilling.prosent,
                                        })}
                                    </p>);
                                })
                                }
                            </div>
                            }
                        </ArbeidsoppgaverInfoboks>
                        }
                        {
                            !this.state.visArbeidsoppgaveSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl={`${getContextRoot()}/img/svg/arbeidsoppgave-onboarding.svg`}
                                    svgAlt="nyArbeidsoppgave"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tekst')}
                                >
                                    <LeggTilElementKnapper
                                        ledetekster={ledetekster}
                                        visSkjema={this.state.visArbeidsoppgaveSkjema}
                                        toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                                    />
                                </OppfolgingsdialogInfoboks> :
                                <RenderOpprettArbeidsoppgave
                                    ledetekster={ledetekster}
                                    sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                        }
                    </div>
                    :
                    <div>
                        {
                            antallIkkeVurdererteArbOppgaver > 0 && <NotifikasjonBoksVurderingOppgave
                                ledetekster={ledetekster}
                                antallIkkeVurderte={antallIkkeVurdererteArbOppgaver}
                                rootUrl={getContextRoot()}
                                tekst="oppfolgingsdialog.notifikasjonBoksVurderingOppgave.arbeidstaker.tekst"
                            />
                        }
                        <ArbeidsoppgaverInfoboks
                            ledetekster={ledetekster}
                            tittel={getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.tittel.arbeidstaker')}
                            visSkjema={this.state.visArbeidsoppgaveSkjema}
                            toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                        >
                            { oppfolgingsdialog.arbeidstaker.stillinger.length > 0 &&
                                <div>
                                    { oppfolgingsdialog.arbeidstaker.stillinger.map((stilling, idx) => {
                                        return (<p key={idx}>
                                            {getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.arbeidstaker.stilling', {
                                                '%YRKE%': stilling.yrke.toLowerCase(),
                                                '%PROSENT%': stilling.prosent,
                                            })}
                                        </p>);
                                    })
                                    }
                                </div>
                            }
                        </ArbeidsoppgaverInfoboks>
                        {
                            this.state.visArbeidsoppgaveSkjema && <LagreArbeidsoppgaveSkjema
                                ledetekster={ledetekster}
                                sendLagre={this.sendLagreArbeidsoppgave}
                                avbryt={this.toggleArbeidsoppgaveSkjema}
                                ref={(lagreSkjema) => {
                                    this.lagreSkjema = lagreSkjema;
                                }}
                                rootUrlImg={getContextRoot()}
                            />
                        }
                        <ArbeidsoppgaverListe
                            ledetekster={ledetekster}
                            liste={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                            sendLagre={this.sendLagreArbeidsoppgave}
                            sendSlett={this.sendSlettArbeidsoppgave}
                            fnr={oppfolgingsdialog.arbeidstaker.fnr}
                            brukerType={BRUKERTYPE.ARBEIDSTAKER}
                            rootUrlImg={getContextRoot()}
                        />
                    </div>;
            })()
        );
    }
}

Arbeidsoppgaver.propTypes = {
    ledetekster: keyValue,
    arbeidsoppgaver: oppfolgingProptypes.arbeidsoppgaverReducerPt,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
};

export default Arbeidsoppgaver;
