import React from 'react';

/* eslint-disable max-len */
export const TEKSTER = {
    folketrygdloven: 'Ifølge folketrygdloven skal NAV innkalle til dialogmøte senest innen 26 ukers sykefravær, med mindre det er åpenbart unødvendig. Vi bruker opplysningene du gir her til å vurdere om det er behov for møte. ',
    lenke: 'Les mer om reglene for dialogmøte.',
};
/* eslint-enable max-len */

const FolketrygdlovenTekst = () => (
    <div className="panel folketrygdlovenTekst">
        <p>
            {TEKSTER.folketrygdloven}
            <a
                className="lenke"
                href="https://www.nav.no/no/Bedrift/Oppfolging/Sykmeldt+arbeidstaker/Relatert+informasjon/oppfolging-av-sykmeldte-arbeidstakere?kap=394785"
                title="Følg lenke">
                {TEKSTER.lenke}
            </a>
        </p>
    </div>
);

export default FolketrygdlovenTekst;
