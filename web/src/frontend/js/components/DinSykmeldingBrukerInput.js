import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import DropdownWrapper from '../components/DropdownWrapper.js';
import Dropdown from '../components/Dropdown.js';
import { getLedetekst } from '../ledetekster';
import Hjelpetekst from '../components/Hjelpetekst.js';

class DinSykmeldingBrukerInput extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onDropdownChange(status) {
        this.setState({ forsoktSendt: false });
        this.props.setArbeidssituasjon(status, this.props.sykmelding.id);
    }

    valider(sykmelding) {
        if (sykmelding.arbeidssituasjon !== undefined) {
            this.setState({ forsoktSendt: false });
            this.redirect();
        } else {
            this.setState({ forsoktSendt: true });
        }
    }

    redirect() {
        browserHistory.push(`/sykefravaer/app/sykmeldinger/${this.props.sykmelding.id}/send`);
    }

    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                this.valider(this.props.sykmelding);
            }}>
                <div className="hjelpetekst-parent hjelpetekst-parent-inline">
                    <h3 className="skjema-sporsmal med-hjelpetekst">{getLedetekst('din-sykmelding.arbeidssituasjon.tittel', this.props.ledetekster.data)}</h3>
                    <Hjelpetekst
                        id="velg-arbeidssituasjon-hjelpetekst"
                        tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tittel', this.props.ledetekster.data)}
                        tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tekst', this.props.ledetekster.data)} />
                </div>
                <div className="blokk-l">
                    <DropdownWrapper erFeil={this.state.forsoktSendt}
                        feilmelding={getLedetekst('din-sykmelding.arbeidssituasjon.feilmelding', this.props.ledetekster.data)}>
                        <div className="select-container">
                            <Dropdown alternativer={this.props.arbeidssituasjoner}
                                valgtAlternativ={this.props.sykmelding.arbeidssituasjon}
                                onChange={(status) => {this.onDropdownChange(status);}} />
                        </div>
                    </DropdownWrapper>
                </div>
                <div className="knapperad knapperad-adskilt">
                    <input value="Gå videre" type="submit" className="knapp knapp-hoved js-videre" />
                </div>
            </form>
        );
    }
}

DinSykmeldingBrukerInput.propTypes = {
    sykmelding: PropTypes.object,
    setArbeidssituasjon: PropTypes.func,
    ledetekster: PropTypes.object,
    arbeidssituasjoner: PropTypes.array,
};

export default DinSykmeldingBrukerInput;
