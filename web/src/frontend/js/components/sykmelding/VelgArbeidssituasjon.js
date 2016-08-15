import React, { PropTypes, Component } from 'react';
import DropdownWrapper from '../skjema/DropdownWrapper.js';
import Dropdown from '../skjema/Dropdown.js';
import { getLedetekst } from '../../ledetekster';
import Hjelpetekst from '../skjema/Hjelpetekst.js';

class VelgArbeidssituasjon extends Component {

    onDropdownChange(status) {
        this.props.setArbeidssituasjon(status, this.props.sykmelding.id);
    }

    getArbeidssituasjoner() {
        if (!this.props.sykmelding.arbeidssituasjon) {
            return this.props.arbeidssituasjoner;
        }
        return this.props.arbeidssituasjoner.filter((situasjon) => {
            return situasjon.verdi !== 'default';
        });
    }

    render() {
        const { ledetekster, sykmelding } = this.props;
        return (
            <div className="blokk-l">
                <div className="hjelpetekst-parent hjelpetekst-parent-inline">
                    <label htmlFor="select-arbeidssituasjon" className="skjema-sporsmal med-hjelpetekst">
                        {getLedetekst('din-sykmelding.arbeidssituasjon.tittel', ledetekster.data)}
                    </label>
                    <Hjelpetekst
                        id="velg-arbeidssituasjon-hjelpetekst"
                        tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tittel', ledetekster.data)}
                        tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tekst', ledetekster.data)} />
                </div>
                <DropdownWrapper erFeil={this.props.erFeil}
                    feilmelding={getLedetekst('din-sykmelding.arbeidssituasjon.feilmelding', ledetekster.data)}>
                    <div className="select-container">
                        <Dropdown id="select-arbeidssituasjon" alternativer={this.getArbeidssituasjoner()}
                            valgtAlternativ={sykmelding.arbeidssituasjon}
                            onChange={(status) => {this.onDropdownChange(status);}} />
                    </div>
                </DropdownWrapper>
            </div>
        );
    }
}

VelgArbeidssituasjon.propTypes = {
    sykmelding: PropTypes.object,
    setArbeidssituasjon: PropTypes.func,
    ledetekster: PropTypes.object,
    arbeidssituasjoner: PropTypes.array,
    bekreftSykmelding: PropTypes.func,
    erFeil: PropTypes.bool,
};

export default VelgArbeidssituasjon;
