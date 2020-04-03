/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';

class PapirsykmeldingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            harGittPapirsykmelding: undefined,
        };
    }

    render() {
        return (
            <div className="panel blokk">
                <img rc={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/blue-info.svg`} alt="informasjon" />
                <Undertittel>Før du bruker sykmeldingen</Undertittel>
                <RadioPanelGruppe
                    name="arbeidssituasjon"
                    legend="Hvilket arbeid gjelder egenmeldingen? Har du begge roller, velger du bare en av dem."
                    radios={[
                        {
                            label: 'Selvstendig næringsdrivende',
                            value: 'NAERINGSDRIVENDE',
                            id: 'naringsdrivende',
                        },
                        { label: 'Frilanser', value: 'FRILANSER', id: 'frilanser' },
                    ]}
                    checked={this.state.harGittPapirsykmelding}
                    onChange={(event) => {
                        event.persist();
                    }}
                />
            </div>
        );
    }
}


export default PapirsykmeldingPanel;
