import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { KANGJENNOMFOERES } from '../../enums/arbeidsoppgavesvar';

export const ArbeidsoppgaveKnapper = ({ arbeidsoppgave, visLagreSkjema, sendSlettArbeidsoppgave }) => {
    return (
        <div className="knapperad knapperad--justervenstre">
            <a
                role="button"
                className="rammeknapp knapperad__element"
                onClick={visLagreSkjema}>
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.endre-arbeidsoppgave')}
            </a>
            <a
                role="button"
                onClick={() => {sendSlettArbeidsoppgave(arbeidsoppgave.arbeidsoppgaveId);}}
                className="rammeknapp knapperad__element">
                {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.slett-arbeidsoppgave')}
            </a>
        </div>
    );
};
ArbeidsoppgaveKnapper.propTypes = {
    arbeidsoppgave: PropTypes.object,
    visLagreSkjema: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
};

export const RenderArbeidsoppgaveInformasjon = ({ arbeidsoppgave }) => {
    let gjennomfoeringTekst = '';
    let beskrivelseTekst = '';

    switch (arbeidsoppgave.gjennomfoering.kanGjennomfoeres) {
        case KANGJENNOMFOERES.KAN: {
            gjennomfoeringTekst = getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.vis.gjennomfoering.kan');
            break;
        }
        case KANGJENNOMFOERES.TILRETTELEGGING: {
            gjennomfoeringTekst = getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.vis.gjennomfoering.tilrettelegging');
            beskrivelseTekst = arbeidsoppgave.gjennomfoering.kanBeskrivelse;
            break;
        }
        case KANGJENNOMFOERES.KAN_IKKE: {
            gjennomfoeringTekst = getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.vis.gjennomfoering.kanikke');
            beskrivelseTekst = arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse;
            break;
        }
        default: {
            break;
        }
    }
    return (
        <div className="visarbeidsoppgave__innhold">
            <p>{gjennomfoeringTekst}</p>
            {
                arbeidsoppgave.gjennomfoering.kanGjennomfoeres !== KANGJENNOMFOERES.KAN && <p>{beskrivelseTekst}</p>
            }
        </div>
    );
};
RenderArbeidsoppgaveInformasjon.propTypes = {
    arbeidsoppgave: PropTypes.object,
};

export const VisArbeidsoppgave = ({ arbeidsoppgave, visLagreSkjema, sendSlettArbeidsoppgave }) => {
    return (
        <div className={'arbeidsgivertabell__rad__utvidbar visarbeidsoppgave'}>

            <RenderArbeidsoppgaveInformasjon arbeidsoppgave={arbeidsoppgave} />

            <ArbeidsoppgaveKnapper
                arbeidsoppgave={arbeidsoppgave}
                visLagreSkjema={visLagreSkjema}
                sendSlettArbeidsoppgave={sendSlettArbeidsoppgave}
            />
        </div>
    );
};

VisArbeidsoppgave.propTypes = {
    arbeidsoppgave: PropTypes.object,
    visLagreSkjema: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
};

export default VisArbeidsoppgave;
