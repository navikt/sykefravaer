import React from 'react';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Video from '../Video';
import { filmtyper } from '../../enums/filmer';

const OppfolgingsdialogFilm = () => {
    return (<div className="panel">
        <h2 className="panel__tittel">
            {getLedetekst('oppfolgingsdialog.filmsnutt.tittel')}
        </h2>
        <Video
            type={filmtyper.OPPFOLGINGSDIALOG} />
        <p dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.filmsnutt.tekst')} />
    </div>);
};

export default OppfolgingsdialogFilm;
