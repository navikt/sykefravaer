import React, { Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';
import { tidligsteFom, senesteTom } from '../../utils/periodeUtils';
import { NY, SENDT, TIL_SENDING, UTKAST_TIL_KORRIGERING } from '../../enums/sykepengesoknadstatuser';
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

        const perioder = soknad.aktiviteter.map(a => { return a.periode; });
        const visStatus = soknad.status !== NY && soknad.status !== SENDT;
        const sendtTilBeggeMenIkkeSamtidig = erSendtTilBeggeMenIkkeSamtidig(soknad);

        return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
            <Link className="inngangspanel js-panel" to={`${getContextRoot()}/soknader/${soknad.id}`}
                onMouseEnter={() => {this.onMouseEnter();}}
                onMouseLeave={() => {this.onMouseLeave();}}
            >
                <span className="inngangspanel__ikon">
                    <img className="js-ikon" src={`/sykefravaer/img/svg/${this.state.ikon}`} />
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
                                '%FRA%': toDatePrettyPrint(tidligsteFom(perioder)),
                                '%TIL%': toDatePrettyPrint(senesteTom(perioder)),
                            })
                        }
                    </p>
                    <p className="inngangspanel__undertekst js-undertekst mute">
                        {
                            soknad.status !== SENDT && soknad.status !== TIL_SENDING && getLedetekst('soknad.teaser.undertekst', { '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn })
                        }
                        {
                            sendtTilBeggeMenIkkeSamtidig && soknad.status !== NY && <SendtUlikt soknad={soknad} />
                        }
                        {
                            !sendtTilBeggeMenIkkeSamtidig && soknad.status !== NY && soknad.status !== UTKAST_TIL_KORRIGERING && getLedetekst(`soknad.teaser.status.${soknad.status}${getSendtTilSuffix(soknad)}`, {
                                '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato),
                                '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
                            })
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
