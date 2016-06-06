import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import DropdownWrapper from '../components/DropdownWrapper.js';
import Dropdown from '../components/Dropdown.js';
import { getLedetekst } from '../ledetekster';

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
                <div className="blokk-l">
                    <DropdownWrapper erFeil={this.state.forsoktSendt}
                        feilmelding={getLedetekst('dinsykmelding.arbeidssituasjon.feilmelding', this.props.ledetekster.data)}>
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
