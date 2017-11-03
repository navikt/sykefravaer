import React from 'react';
import { getLedetekst } from 'digisyfo-npm';

const OppfolgingsdialogFilm = () => {
    return (<div className="panel">
        <h2 className="js-begrensning lite-film typo-undertittel blokk--xxs">
            {getLedetekst('oppfolgingsdialog.filmsnutt.tittel')}
        </h2>
        <video width="100%" height="360px" controls>
            <source src="/sykefravaer/videoer/Film_06_288p.mp4" type="video/mp4" />
            <p>Nettleseren din støtter ikke denne videoavspillingen. Gå direkte til videoklippet <a href="/sykefravaer/videoer/Film_06_288p.mp4">her</a></p>
        </video>
        <p dangerouslySetInnerHTML={{ __html: getLedetekst('oppfolgingsdialog.filmsnutt.tekst') }} />
    </div>);
};

export default OppfolgingsdialogFilm;
