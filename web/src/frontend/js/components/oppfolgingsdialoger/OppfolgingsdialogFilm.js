import React from 'react';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Video from '../Video';

const OppfolgingsdialogFilm = () => {
    return (<div className="panel">
        <h2 className="panel__tittel">
            {getLedetekst('oppfolgingsdialog.filmsnutt.tittel')}
        </h2>
        <Video
            src="/sykefravaer/filmer/oppfolgingsplan.mp4"
            img="/sykefravaer/img/filmer/oppfolgingsplan.jpg"
            captionSrc="/sykefravaer/filmer/oppfolgingsplan.vtt" />
        <p dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.filmsnutt.tekst')} />
    </div>);
};

export default OppfolgingsdialogFilm;
