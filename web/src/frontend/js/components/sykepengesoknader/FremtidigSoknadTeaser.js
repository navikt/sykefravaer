import React from 'react';
import { toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const FremtidigSoknadTeaser = ({ soknad }) => {
    return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
        <div className="inaktivtInngangspanel">
            <div className="inaktivtInngangspanel__inner">
                <span className="inngangspanel__ikon">
                    <img className="js-ikon" src="/sykefravaer/img/svg/soknader.svg" />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`soknad-header-${soknad.id}`}>
                            <small className="inngangspanel__meta js-meta">
                                {getLedetekst('soknad.teaser.dato', { '%DATO%': toDatePrettyPrint(soknad.opprettetDato) }) }
                            </small>
                            <span className="inngangspanel__tittel">
                                {getLedetekst('soknad.teaser.tittel')}
                            </span>
                        </h3>
                        {
                                <p className="inngangspanel__status js-status">
                                    {
                                        getLedetekst(`soknad.teaser.status.${soknad.status}`, {
                                            '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato),
                                        })
                                    }
                                </p>
                        }
                    </header>
                    <p className="inngangspanel__tekst js-tekst">
                        {
                            getLedetekst('soknad.teaser.tekst', {
                                '%FRA%': toDatePrettyPrint(soknad.fom),
                                '%TIL%': toDatePrettyPrint(soknad.tom),
                            })
                        }
                    </p>
                    <p className="inngangspanel__undertekst js-undertekst mute">
                        {soknad.arbeidsgiver.navn}
                    </p>
                </div>
            </div>
        </div>
    </article>);
};

FremtidigSoknadTeaser.propTypes = {
    soknad: sykepengesoknadPt,
};

export default FremtidigSoknadTeaser;
