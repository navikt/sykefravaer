import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import AppSpinner from '../../AppSpinner';
import Feilmelding from '../../Feilmelding';
import {
    finnArbeidsoppgaverIkkeVurdertAvSykmeldt,
    OppfolgingsdialogInfoboks,
    NotifikasjonBoks,
    OppfolgingsdialogTabell,
    LagreArbeidsoppgaveSkjema,
    BRUKERTYPE,
    input2RSArbeidsoppgave,
    erArbeidsoppgavenOpprettet,
    sorterArbeidsoppgaverEtterOpprettet,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';

export const RenderNotifikasjonBoks = ({ virksomhetsnavn, antallIkkeVurderteArbeidsoppgaver }) => {
    return (<NotifikasjonBoks
        imgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/notifikasjon-illustrasjon.svg`}
        tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.ikke-vurderte-arbeidsoppgaver.tekst', {
            '%ARBEIDSGIVER%': virksomhetsnavn,
            '%ANTALLARBEIDSOPPGAVER%': antallIkkeVurderteArbeidsoppgaver.toString(),
        })}
        classNames={'panel--advarsel'}
    />);
};
RenderNotifikasjonBoks.propTypes = {
    virksomhetsnavn: PropTypes.string,
    antallIkkeVurderteArbeidsoppgaver: PropTypes.number,
};
export const RenderNotifikasjonBoksSuksess = ({ tekst }) => {
    return (<NotifikasjonBoks
        imgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/notifikasjon-suksess-illustrasjon.svg`}
        tekst={tekst}
        classNames={'panel--suksess'}
    />);
};
RenderNotifikasjonBoksSuksess.propTypes = {
    tekst: PropTypes.string,
};

export const RenderOppfolgingsdialogArbeidsoppgaverTabell = ({ ledetekster, arbeidsoppgaveListe, sendLagreArbeidsoppgave, sendSlettArbeidsoppgave, aktoerId }) => {
    return (
        <OppfolgingsdialogTabell
            ledetekster={ledetekster}
            liste={arbeidsoppgaveListe}
            tabellType="arbeidsoppgaver"
            urlImgArrow={`${window.APP_SETTINGS.APP_ROOT}/img/svg/arrow-down.svg`}
            urlImgVarsel={`${window.APP_SETTINGS.APP_ROOT}/img/svg/varseltrekant.svg`}
            urlImgCheckboks={`${window.APP_SETTINGS.APP_ROOT}/img/svg/oppfolgingdialog-checkbox.svg`}
            sendLagre={sendLagreArbeidsoppgave}
            sendSlett={sendSlettArbeidsoppgave}
            aktoerId={aktoerId}
            brukerType={BRUKERTYPE.ARBEIDSTAKER}
        />
    );
};
RenderOppfolgingsdialogArbeidsoppgaverTabell.propTypes = {
    ledetekster: PropTypes.object,
    arbeidsoppgaveListe: PropTypes.array,
    sendLagreArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    aktoerId: PropTypes.string,
};

export const RenderArbeidsoppgaverKnapper = ({ visArbeidsoppgaveSkjema, toggleArbeidsoppgaveSkjema }) => {
    return (
        <div className="knapperad">
            <button
                className="knapp knapperad__element"
                aria-pressed={visArbeidsoppgaveSkjema}
                onClick={toggleArbeidsoppgaveSkjema}>
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.leggtil-arbeidsoppgave')}
            </button>
        </div>
    );
};
RenderArbeidsoppgaverKnapper.propTypes = {
    visArbeidsoppgaveSkjema: PropTypes.bool,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

export const RenderOpprettArbeidsoppgave = ({ ledetekster, sendLagreArbeidsoppgave, toggleArbeidsoppgaveSkjema }) => {
    return (<div>
        <h2>{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
        <LagreArbeidsoppgaveSkjema
            ledetekster={ledetekster}
            sendLagre={sendLagreArbeidsoppgave}
            avbryt={toggleArbeidsoppgaveSkjema}
        />
    </div>);
};
RenderOpprettArbeidsoppgave.propTypes = {
    ledetekster: PropTypes.object,
    sendLagreArbeidsoppgave: PropTypes.func,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

export class Arbeidsoppgaver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arbeidsoppgaver: [],
            lagretArbeidsoppgave: {},
            slettetId: 0,
            visArbeidsoppgaveSkjema: false,
            arbeidsoppgaveOpprettet: false,
        };
        this.lagreArbeidsoppgave = this.lagreArbeidsoppgave.bind(this);
        this.slettArbeidsoppgave = this.slettArbeidsoppgave.bind(this);
        this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
        this.scrollToForm = this.scrollToForm.bind(this);
    }

    componentWillMount() {
        if (this.props.oppfolgingsdialogerHentet) {
            this.setState({
                arbeidsoppgaver: sorterArbeidsoppgaverEtterOpprettet(this.props.oppfolgingsdialog.arbeidsoppgaveListe),
            });
        }
    }

    componentDidMount() {
        if (this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.lagrer && nextProps.lagret) {
            this.lagreArbeidsoppgave(nextProps.lagretId);
        } else if (this.props.sletter && nextProps.slettet) {
            this.slettArbeidsoppgave();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, form.getBoundingClientRect().bottom);
        }
    }

    lagreArbeidsoppgave(lagretId) {
        const nyArbeidsoppgave = Object.assign({}, this.state.lagretArbeidsoppgave);
        nyArbeidsoppgave.arbeidsoppgaveId = lagretId;
        const nyArbeidsoppgaveListe = [...this.state.arbeidsoppgaver];

        if (erArbeidsoppgavenOpprettet(this.state.arbeidsoppgaver, nyArbeidsoppgave)) {
            const index = nyArbeidsoppgaveListe.findIndex((arbeidsoppgave) => {
                return arbeidsoppgave.arbeidsoppgaveId === lagretId;
            });
            nyArbeidsoppgaveListe[index] = nyArbeidsoppgave;
            this.setState({
                arbeidsoppgaver: sorterArbeidsoppgaverEtterOpprettet(nyArbeidsoppgaveListe),
                visArbeidsoppgaveSkjema: false,
                arbeidsoppgaveOpprettet: false,
            });
        } else {
            this.setState({
                arbeidsoppgaver: sorterArbeidsoppgaverEtterOpprettet(nyArbeidsoppgaveListe.concat([nyArbeidsoppgave])),
                visArbeidsoppgaveSkjema: true,
                arbeidsoppgaveOpprettet: true,
            });
        }
    }

    slettArbeidsoppgave() {
        if (this.state.slettetId > 0) {
            const nyArbeidsoppgaveListe = this.state.arbeidsoppgaver.filter((arbeidsoppgave) => {
                return arbeidsoppgave.arbeidsoppgaveId !== this.state.slettetId;
            });
            this.setState({
                arbeidsoppgaver: nyArbeidsoppgaveListe,
                visArbeidsoppgaveSkjema: false,
            });
        }
    }

    sendLagreArbeidsoppgave(values) {
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialogId, values);
        const arbeidsoppgave = input2RSArbeidsoppgave(values);
        arbeidsoppgave.opprettetAvAktoerId = this.props.oppfolgingsdialog.arbeidstaker.aktoerId;
        arbeidsoppgave.opprettetAv = {
            aktoerId: this.props.oppfolgingsdialog.arbeidstaker.aktoerId,
            navn: this.props.oppfolgingsdialog.arbeidstaker.navn,
        };
        this.setState({
            lagretArbeidsoppgave: arbeidsoppgave,
        });
    }
    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(arbeidsoppgaveId);
        this.setState({
            slettetId: arbeidsoppgaveId,
        });
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    scrollToForm() {
        const form = findDOMNode(this.lagreSkjema);
        scrollTo(form, form.getBoundingClientRect().bottom);
    }

    render() {
        const {
            lagrer,
            lagret,
            sletter,
            lagringFeilet,
            slettingFeilet,
            ledetekster,
            oppfolgingsdialog,
            oppfolgingsdialogId,
        } = this.props;

        const antallIkkeVurderteArbeidsoppgaver = oppfolgingsdialog ? finnArbeidsoppgaverIkkeVurdertAvSykmeldt(oppfolgingsdialog.arbeidsoppgaveListe).length : 0;

        return (
            (() => {
                if (lagrer || sletter) {
                    return <AppSpinner />;
                } else if (lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                }
                return isEmpty(this.state.arbeidsoppgaver) ?
                    <div>
                        {
                            !this.state.visArbeidsoppgaveSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/arbeidsoppgave-onboarding.svg`}
                                    svgAlt="nyArbeidsoppgave"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tekst')}
                                >
                                    <RenderArbeidsoppgaverKnapper
                                        toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema} />
                                </OppfolgingsdialogInfoboks> :
                                <RenderOpprettArbeidsoppgave
                                    ledetekster={ledetekster}
                                    oppfolgingsdialogId={oppfolgingsdialogId}
                                    sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                        }

                    </div>
                    :
                    <div>
                        <h2 className="typo-undertittel">{getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.tittel')}</h2>
                        {
                            lagret && !this.state.arbeidsoppgaveOpprettet &&
                            <RenderNotifikasjonBoksSuksess
                                tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.lagret-arbeidsoppgave.tekst')}
                            />
                        }
                        {
                            lagret && this.state.arbeidsoppgaveOpprettet &&
                            <RenderNotifikasjonBoksSuksess
                                tekst={getLedetekst('oppfolgingsdialog.notifikasjonboks.opprettet-arbeidsoppgave.tekst')}
                            />
                        }
                        {
                            antallIkkeVurderteArbeidsoppgaver > 0 &&
                            <RenderNotifikasjonBoks
                                virksomhetsnavn={oppfolgingsdialog.arbeidsgiver.navn}
                                antallIkkeVurderteArbeidsoppgaver={antallIkkeVurderteArbeidsoppgaver}
                            />
                        }
                        {
                            <RenderOppfolgingsdialogArbeidsoppgaverTabell
                                ledetekster={ledetekster}
                                arbeidsoppgaveListe={this.state.arbeidsoppgaver}
                                sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                                sendSlettArbeidsoppgave={this.sendSlettArbeidsoppgave}
                                aktoerId={oppfolgingsdialog.arbeidstaker.aktoerId}
                            />
                        }
                        {
                            this.state.visArbeidsoppgaveSkjema ?
                                <LagreArbeidsoppgaveSkjema
                                    ledetekster={ledetekster}
                                    sendLagre={this.sendLagreArbeidsoppgave}
                                    avbryt={this.toggleArbeidsoppgaveSkjema}
                                    ref={(lagreSkjema) => {
                                        this.lagreSkjema = lagreSkjema;
                                    }}
                                /> :
                                <RenderArbeidsoppgaverKnapper
                                    visArbeidsoppgaveSkjema={this.state.visArbeidsoppgaveSkjema}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                        }
                    </div>;
            })()
        );
    }
}

Arbeidsoppgaver.propTypes = {
    lagrer: PropTypes.bool,
    lagret: PropTypes.bool,
    lagretId: PropTypes.number,
    sletter: PropTypes.bool,
    slettet: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    oppfolgingsdialogerHentet: PropTypes.bool,
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    arbeidsoppgaveOpprettet: PropTypes.bool,
};

export default Arbeidsoppgaver;
