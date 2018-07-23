import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {getLedetekst, toDatePrettyPrint, sykepengesoknadstatuser} from 'digisyfo-npm';
import {getContextRoot} from '../../routers/paths';
import {sykepengesoknad as sykepengesoknadPt, soknad as soknadPt} from '../../propTypes';
import {getSendtTilSuffix, erSendtTilBeggeMenIkkeSamtidig} from '../../utils/sykepengesoknadUtils';
import {OPPHOLD_UTLAND} from "../../enums/soknadtyper";

const {NY, SENDT, TIL_SENDING, UTKAST_TIL_KORRIGERING, AVBRUTT} = sykepengesoknadstatuser;

export const SendtUlikt = ({soknad}) => {
    return (<span>
        {
            getLedetekst('soknad.teaser.status.SENDT.til-arbeidsgiver', {
                '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato),
                '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
            })
        }
        <br/>
        {
            getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                '%DATO%': toDatePrettyPrint(soknad.sendtTilNAVDato),
            })
        }
    </span>);
};

SendtUlikt.propTypes = {
    soknad: sykepengesoknadPt.isRequired,
};

const SykepengesoknadTeaser = ({soknad}) => {
    const visStatus = [NY, SENDT, AVBRUTT].indexOf(soknad.status) === -1;
    const sendtTilBeggeMenIkkeSamtidig = erSendtTilBeggeMenIkkeSamtidig(soknad);
    const status = soknad.status ? soknad.status.toLowerCase() : '';
    return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
        <Link
            className={`inngangspanel js-panel js-soknad-${status}`}
            to={`${getContextRoot()}/soknader/${soknad.id}`}>
            <span className="inngangspanel__ikon inngangspanel__ikon--normal">
                <img alt="" className="js-ikon" src="/sykefravaer/img/svg/soknader.svg"/>
            </span>
            <span className="inngangspanel__ikon inngangspanel__ikon--hover">
                <img alt="" className="js-ikon" src="/sykefravaer/img/svg/soknader_hover-blue.svg"/>
            </span>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`soknad-header-${soknad.id}`}>
                        <small className="inngangspanel__meta js-meta">
                            {
                                (() => {
                                    if (soknad.soknadstype === OPPHOLD_UTLAND) {
                                        return getLedetekst('soknad.teaser.dato',
                                            {'%DATO%': toDatePrettyPrint(soknad.opprettetDato)})
                                    }
                                    return getLedetekst('soknad.teaser.dato', {'%DATO%': toDatePrettyPrint(soknad.tom)});
                                })()
                            }
                        </small>
                        <span className="inngangspanel__tittel">
                            {
                                (() => {
                                    if (soknad.soknadstype === OPPHOLD_UTLAND) {
                                        return getLedetekst('soknad.utland.teaser.tittel');
                                    }
                                    return getLedetekst('soknad.teaser.tittel');
                                })()
                            }
                        </span>
                    </h3>
                    {
                        visStatus &&
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
                        (() => {
                            if (soknad.soknadstype !== OPPHOLD_UTLAND) {
                                return getLedetekst('soknad.teaser.tekst', {
                                    '%FRA%': toDatePrettyPrint(soknad.fom),
                                    '%TIL%': toDatePrettyPrint(soknad.tom),
                                });
                            }
                            return null;
                        })()
                    }
                </p>
                <p className="inngangspanel__undertekst js-undertekst mute">
                    {
                        (() => {
                            if (soknad.status === AVBRUTT) {
                                return getLedetekst('soknad.teaser.status.AVBRUTT', {
                                    '%DATO%': toDatePrettyPrint(soknad.avbruttDato),
                                });
                            }
                            if (soknad.status !== SENDT && soknad.status !== TIL_SENDING && !soknad.soknadstype) {
                                return getLedetekst('soknad.teaser.undertekst', {'%ARBEIDSGIVER%': soknad.arbeidsgiver.navn});
                            }
                            if (sendtTilBeggeMenIkkeSamtidig && soknad.status !== NY) {
                                return <SendtUlikt soknad={soknad}/>;
                            }
                            if (soknad.status !== NY && soknad.status !== UTKAST_TIL_KORRIGERING) {
                                return getLedetekst(`soknad.teaser.status.${soknad.status}${getSendtTilSuffix(soknad)}`, {
                                    '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato),
                                    '%ARBEIDSGIVER%': soknad.arbeidsgiver ? soknad.arbeidsgiver.navn : null,
                                });
                            }
                            return null;
                        })()
                    }
                </p>
            </div>
        </Link>
    </article>);
};

SykepengesoknadTeaser.propTypes = {
    soknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]).isRequired,
};

export default SykepengesoknadTeaser;
