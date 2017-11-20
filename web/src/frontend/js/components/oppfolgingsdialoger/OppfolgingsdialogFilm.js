import React from 'react';
import { getLedetekst, getHtmlLedetekst, Video, filmer } from 'digisyfo-npm';

const OppfolgingsdialogFilm = () => {
    return (<div className="panel">
        <h2 className="panel__tittel">
            {getLedetekst('oppfolgingsdialog.filmsnutt.tittel')}
        </h2>
        <Video
            film={filmer.OPPFOLGINGSDIALOG} />
        <p dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.filmsnutt.tekst')} />
    </div>);
};

export default OppfolgingsdialogFilm;
