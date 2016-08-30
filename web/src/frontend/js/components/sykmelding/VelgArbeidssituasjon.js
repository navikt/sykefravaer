import React, { PropTypes, Component } from 'react';
import DropdownWrapper from '../skjema/DropdownWrapper.js';
import Dropdown from '../skjema/Dropdown.js';
import { getLedetekst } from '../../ledetekster';
import Hjelpetekst from '../skjema/Hjelpetekst.js';
import arbeidssituasjoner from '../../arbeidssituasjonData';

class VelgArbeidssituasjon extends Component {

    onChange(arbeidssituasjon) {
        this.props.fields.arbeidssituasjon.onChange(arbeidssituasjon);
        this.props.untouch('sendSykmelding', 'valgtArbeidsgiver');
    }

    onBlur(arbeidssituasjon) {
        this.props.fields.arbeidssituasjon.onBlur(arbeidssituasjon);
        this.props.untouch('sendSykmelding', 'valgtArbeidsgiver');
    }

    getArbeidssituasjoner() {
        if (this.props.fields.arbeidssituasjon.value === '') {
            return arbeidssituasjoner;
        }
        return arbeidssituasjoner.filter((arbeidssituasjon) => {
            return arbeidssituasjon.verdi !== 'default';
        });
    }

    render() {
        const { ledetekster, fields: { arbeidssituasjon } } = this.props;

        return (
            <div className="blokk-l">
                <div className="hjelpetekst-parent hjelpetekst-parent-inline">
                    <label htmlFor="select-arbeidssituasjon" className="skjema-sporsmal med-hjelpetekst">
                        {getLedetekst('din-sykmelding.arbeidssituasjon.tittel', ledetekster)}
                    </label>
                    <Hjelpetekst
                        id="velg-arbeidssituasjon-hjelpetekst"
                        tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tittel', ledetekster)}
                        tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tekst', ledetekster)} />
                </div>
                <DropdownWrapper erFeil={arbeidssituasjon.touched && arbeidssituasjon.error !== undefined}
                    feilmelding={arbeidssituasjon.error}>
                    <div className="select-container">
                        <Dropdown id="select-arbeidssituasjon" alternativer={this.getArbeidssituasjoner()}
                            valgtAlternativ={arbeidssituasjon.value.length ? arbeidssituasjon.value : undefined}
                            onChange={(arbsit) => {
                                this.onChange(arbsit);
                            }}
                            onBlur={(arbsit) => {
                                this.onBlur(arbsit);
                            }} />
                    </div>
                </DropdownWrapper>
            </div>
        );
    }
}

VelgArbeidssituasjon.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    fields: PropTypes.object,
    untouch: PropTypes.func,
};

export default VelgArbeidssituasjon;
