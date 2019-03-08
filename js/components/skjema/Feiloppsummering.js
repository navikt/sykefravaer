import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scrollTo, erSynligIViewport } from '@navikt/digisyfo-npm';
import { Vis } from '../../utils';
import { SKJEMANAVN_OPPHOLD_UTLAND, PREFIX_SKJEMANAVN_SOKNAD } from '../../enums/skjemanavn';

const FeillisteMelding = ({ feltnavn, feilmelding }) => {
    return (<li className="feiloppsummering__feil">
        <a
            onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(feltnavn);
                if (el) {
                    scrollTo(el, 500, () => {
                        el.focus();
                    });
                }
            }}
            href={`#${feltnavn}`}>{feilmelding}</a>
    </li>);
};

FeillisteMelding.propTypes = {
    feltnavn: PropTypes.string,
    feilmelding: PropTypes.string,
};

const getFeilmeldinger = (props) => {
    return props.feilmeldinger || [];
};

class Feiloppsummering extends Component {
    componentDidUpdate(prevProps) {
        const { settFokus, skjemaErGyldig, skjemanavn } = this.props;
        if (settFokus && this.oppsummering) {
            if (!erSynligIViewport(this.oppsummering)) {
                scrollTo(this.oppsummering, 600);
                setTimeout(() => {
                    this.fokuserOppsummering();
                }, 1600);
            } else {
                this.fokuserOppsummering();
            }
        }
        if (getFeilmeldinger(this.props).length === 0 && getFeilmeldinger(prevProps).length > 0) {
            skjemaErGyldig(skjemanavn);
        }
    }

    fokuserOppsummering() {
        const { sendSkjemaFeiletHandtert, skjemanavn } = this.props;
        this.oppsummering.focus();
        sendSkjemaFeiletHandtert(skjemanavn);
    }

    hentTitteltekst() {
        const skjemanavn = this.props.skjemanavn;
        if (this.props.tittel) {
            return this.props.tittel;
        }
        if (skjemanavn.indexOf(PREFIX_SKJEMANAVN_SOKNAD) > -1 || skjemanavn === SKJEMANAVN_OPPHOLD_UTLAND) {
            return 'Søknaden inneholder %ANTALLFEIL% feil du må rette opp før du kan gå videre';
        }
        return 'Skjemaet inneholder %ANTALLFEIL% feil du må rette opp før du kan gå videre';
    }

    hentTittel() {
        const tall = ['null', 'én', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'åtte', 'ni', 'ti'];
        const tittel = this.hentTitteltekst();
        const antallFeil = getFeilmeldinger(this.props).length;
        const antallFeilTekst = antallFeil <= 10 ? tall[antallFeil] : antallFeil;
        return tittel.replace('%ANTALLFEIL%', antallFeilTekst);
    }

    render() {
        const feilmeldinger = getFeilmeldinger(this.props);
        return (<div aria-live="polite" role="alert">
            <Vis
                hvis={feilmeldinger.length > 0 && this.props.visFeilliste}
                render={() => {
                    return (<div
                        className="feiloppsummering blokk"
                        ref={(c) => {
                            this.oppsummering = c;
                        }}
                        tabIndex="-1">
                        <h3 className="feiloppsummering__tittel">{this.hentTittel()}</h3>
                        <ul className="feiloppsummering__liste">
                            {
                                feilmeldinger.map((feilmld, index) => {
                                    return <FeillisteMelding key={index} {...feilmld} />;
                                })
                            }
                        </ul>
                    </div>);
                }} />
        </div>);
    }
}

Feiloppsummering.propTypes = {
    settFokus: PropTypes.bool,
    sendSkjemaFeiletHandtert: PropTypes.func.isRequired,
    skjemaErGyldig: PropTypes.func.isRequired,
    skjemanavn: PropTypes.string.isRequired,
    visFeilliste: PropTypes.bool,
    tittel: PropTypes.string,
    feilmeldinger: PropTypes.arrayOf(PropTypes.shape({
        feltnavn: PropTypes.string,
        feilmelding: PropTypes.string,
    })),
};

export default Feiloppsummering;
