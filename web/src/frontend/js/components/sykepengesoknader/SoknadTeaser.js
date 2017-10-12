import React, { Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';
import { NY, SENDT, TIL_SENDING, UTKAST_TIL_KORRIGERING, AVBRUTT } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { getSendtTilSuffix, erSendtTilBeggeMenIkkeSamtidig } from '../../utils/sykepengesoknadUtils';

export const SendtUlikt = ({ soknad }) => {
    return (<span>
        {
            getLedetekst('soknad.teaser.status.SENDT.til-arbeidsgiver', {
                '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato),
                '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
            })
        }
        <br />
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

class SoknadTeaser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ikon: 'soknader.svg',
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: 'soknader_hover-blue.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'soknader.svg',
        });
    }

    render() {
        const { soknad } = this.props;

        const visStatus = [NY, SENDT, AVBRUTT].indexOf(soknad.status) === -1;
        const sendtTilBeggeMenIkkeSamtidig = erSendtTilBeggeMenIkkeSamtidig(soknad);

        return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
            <Link
                className="inngangspanel js-panel"
                to={`${getContextRoot()}/soknader/${soknad.id}`}
                onMouseEnter={() => {
                    this.onMouseEnter();
                }}
                onMouseLeave={() => {
                    this.onMouseLeave();
                }}>
                <span className="inngangspanel__ikon">
                    <img alt="" className="js-ikon" src={`/sykefravaer/img/svg/${this.state.ikon}`} />
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
                            getLedetekst('soknad.teaser.tekst', {
                                '%FRA%': toDatePrettyPrint(soknad.fom),
                                '%TIL%': toDatePrettyPrint(soknad.tom),
                            })
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
                                if (soknad.status !== SENDT && soknad.status !== TIL_SENDING) {
                                    return getLedetekst('soknad.teaser.undertekst', { '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn });
                                }
                                if (sendtTilBeggeMenIkkeSamtidig && soknad.status !== NY) {
                                    return <SendtUlikt soknad={soknad} />;
                                }
                                if (soknad.status !== NY && soknad.status !== UTKAST_TIL_KORRIGERING) {
                                    return getLedetekst(`soknad.teaser.status.${soknad.status}${getSendtTilSuffix(soknad)}`, {
                                        '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato),
                                        '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
                                    });
                                }
                                return null;
                            })()
                        }
                    </p>
                </div>
            </Link>
        </article>);
    }
}

SoknadTeaser.propTypes = {
    soknad: sykepengesoknadPt.isRequired,
};

export default SoknadTeaser;
