import React, { PropTypes } from 'react';
import Radiogruppe from '../skjema/Radiogruppe';
import { getHtmlLedetekst, getLedetekst } from '../../ledetekster';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths.js';

const VelgArbeidsgiver = ({ valgtArbeidsgiverOrgnummer, onChange, arbeidsgivere, feilmelding, erFeil, ledetekster, sykmelding }) => {
    return (<div className="blokk">
        <Radiogruppe
            name="valgt-arbeidsgiver"
            spoersmaal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal', ledetekster)}
            valgtVerdi={valgtArbeidsgiverOrgnummer}
            feilmelding={feilmelding}
            erFeil={erFeil}
            onChange={onChange}
            setFokus={erFeil}
            Overskrift="H3">
            {
                arbeidsgivere.map((arbeidsgiver) => {
                    let labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                        `(${getLedetekst('send-til-arbeidsgiver.orgnr', ledetekster)}: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
                        : null;
                    return (<input
                        key={arbeidsgiver.orgnummer}
                        id={arbeidsgiver.orgnummer}
                        value={arbeidsgiver.orgnummer}
                        label={arbeidsgiver.navn}
                        labelSekundaer={labelSekundaer}
                        erValgt={arbeidsgiver.orgnummer === valgtArbeidsgiverOrgnummer}>
                        {arbeidsgiver.orgnummer !== '0' ? null :
                            <div className="panel panel-ekstra">
                                <div className="hode hode-advarsel hode-brodtekst redaksjonelt-innhold side-innhold"
                                    dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst', ledetekster)} />
                                <div className="knapperad side-innhold">
                                    <p>
                                    <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}/skriv-ut`} className="rammeknapp">
                                        {getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.skriv-ut', ledetekster)}
                                    </Link>
                                    </p>
                                </div>
                            </div>}
                        </input>);
                })
            }
        </Radiogruppe>
    </div>);
};

VelgArbeidsgiver.propTypes = {
    valgtArbeidsgiverOrgnummer: PropTypes.string,
    onChange: PropTypes.func,
    arbeidsgivere: PropTypes.array,
    feilmelding: PropTypes.string,
    erFeil: PropTypes.bool,
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
};

export default VelgArbeidsgiver;
