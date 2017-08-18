import React, { PropTypes, Component } from 'react';
import { getContextRoot } from '../../../routers/paths';

export class Samtykke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            samtykke: true,
        };
        this.sendSamtykke = this.sendSamtykke.bind(this);
        this.settSamtykke = this.settSamtykke.bind(this);
    }

    settSamtykke(samtykke) {
        this.setState({
            samtykke,
        });
    }

    sendSamtykke() {
        this.props.sendSamtykke(this.props.oppfolgingsdialog.oppfoelgingsdialogId, this.state.samtykke);
    }

    render() {
        return (
            <div className="panel blokk">
                <div className="illustrertTittel">
                    <img className="illustrertTittel__img" src={`${getContextRoot()}/img/svg/samtykke.svg`} alt="samtykke" />
                    <h2 className="illustrertTittel__tittel">Samtykke</h2>
                </div>
                <p className="samtykke__tekst">Opplysningene du gir her vil bli synlige i oppfølgingsplanen som dere lager
                    sammen. Når begge parter har godkjent planen, blir den synlig for NAV veilederen på NAV-kontoret.
                    Veileder bruker informasjonen til å … Dere har rett til å slette eller endre opplysninger når som
                    helst.</p>
                    <div className="inputgruppe inputgruppe--oppfolgingsdialog">
                        <div tabIndex="-1" id="samtykkeGitt" className="skjema__feilomrade">
                            <div className="inputgruppe">
                                <div>
                                    <div className="skjema__input">
                                        <input autoFocus type="radio" id="giSamtykke" checked={this.state.samtykke === true ? 'checked' : null } className="radioknapp" name="samtykkeGitt" value="true" onChange={(e) => { this.settSamtykke(e.target.value); }} />
                                            <label htmlFor="giSamtykke">Ja, jeg samtykker i at NAV kan bruke anonymisert data fra min oppfølgingsplan til å utvikle></label>
                                    </div>
                                </div>
                                <div>
                                    <div className="skjema__input">
                                        <input type="radio" id="ikkeGiSamtykke" checked={this.state.samtykke === false ? 'checked' : null } className="radioknapp" name="samtykkeGitt" value="false" onChange={(e) => { this.settSamtykke(e.target.value); }} />
                                            <label htmlFor="ikkeGiSamtykke">Nei, jeg ønsker ikke at NAV bruker data fra min oppfølgingsplan</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="knapperad">
                        <button type="submit" onClick={this.sendSamtykke} className="knapp knapperad__element">Start oppfølgingsplan</button>
                        <button className="lenke lenke--avbryt" onClick={this.sendSamtykke} type="button">Avbryt</button>
                    </div>
            </div>
        );
    }
}
Samtykke.propTypes = {
    sendSamtykke: PropTypes.func,
    oppfolgingsdialog: PropTypes.object,
};

export default Samtykke;
