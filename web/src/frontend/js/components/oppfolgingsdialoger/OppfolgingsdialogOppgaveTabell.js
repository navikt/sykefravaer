import React, { PropTypes } from 'react';
import ArbeidsoppgaveRad from './ArbeidsoppgaveRad';

const OppfolgingsdialogOppgaveTabell = ({ arbeidsoppgaveListe, sendArbeidsoppgave, sendSlettArbeidsoppgave, urlImgArrow, urlImgVarsel }) => {
    return (
        <div className="arbeidsgivertabell">
            <div className="arbeidsgivertabell__rad arbeidsgivertabell__rad--hode">
                <div className="arbeidsgivertabell__rad__celle">Arbeidsoppgave</div>
                <div className="arbeidsgivertabell__rad__celle">Lagt til av</div>
                <div className="arbeidsgivertabell__rad__celle">Kan gjennomføres</div>
            </div>
            {
                arbeidsoppgaveListe.map((arbeidsoppgave, index) => {
                    return (<ArbeidsoppgaveRad
                        arbeidsoppgave={arbeidsoppgave}
                        key={index}
                        urlImgArrow={urlImgArrow}
                        urlImgVarsel={urlImgVarsel}
                        sendArbeidsoppgave={sendArbeidsoppgave}
                        sendSlettArbeidsoppgave={sendSlettArbeidsoppgave}
                    />);
                })
            }
        </div>
    );
};

OppfolgingsdialogOppgaveTabell.propTypes = {
    arbeidsoppgaveListe: PropTypes.array,
    sendArbeidsoppgave: PropTypes.func,
    sendSlettArbeidsoppgave: PropTypes.func,
    urlImgVarsel: PropTypes.string,
    urlImgArrow: PropTypes.string,
};

export default OppfolgingsdialogOppgaveTabell;

