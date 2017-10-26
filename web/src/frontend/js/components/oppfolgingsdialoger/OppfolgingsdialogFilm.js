import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Video from '../Video';

const OppfolgingsdialogFilm = () => {
    const filmUrl = 'https://video.qbrick.com/play2/embed/player?accountId=763558&mediaId=25edfd35-00015227-b68553ad&configId=default&pageStyling=adaptive&&autoplay=false&repeat=false&sharing=false';
    return (<div className="panel">
        <h2 className="js-begrensning lite-film typo-undertittel blokk--xxs">
            {getLedetekst('oppfolgingsdialog.filmsnutt.tittel')}
        </h2>
        <Video width="476" height="360" src={filmUrl} />
        <p dangerouslySetInnerHTML={{ __html: getLedetekst('oppfolgingsdialog.filmsnutt.tekst') }} />
    </div>);
};

export default OppfolgingsdialogFilm;
