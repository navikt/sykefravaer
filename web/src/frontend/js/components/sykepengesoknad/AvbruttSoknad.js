import React, { PropTypes } from 'react';
import { getLedetekst, Varselstripe, SykmeldingNokkelOpplysning, toDatePrettyPrint } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';
import { AVBRUTT } from '../../enums/sykepengesoknadstatuser';

const Verktoylinje = ({ sykepengesoknad, gjenapneSoknad, gjenapner, gjenapneFeilet }) => {
    return (<div>
        <div className={`verktoylinje ${gjenapneFeilet ? 'blokk--mini' : ''}`}>
            <div className="verktoylinje__element">
                <button onClick={(e) => {
                    e.preventDefault();
                    gjenapneSoknad(sykepengesoknad.id);
                }} className="rammeknapp rammeknapp--mini js-gjenapne">{getLedetekst('sykepengesoknad.gjenapne.knapp')} { gjenapner ? <span className="knapp__spinner" /> : null }</button>
            </div>
        </div>
        <div aria-live="polite">
            { gjenapneFeilet && <p className="skjema__feilmelding">Beklager, søknaden kunne ikke gjenåpnes</p> }
        </div>
    </div>);
};

Verktoylinje.propTypes = {
    gjenapneSoknad: PropTypes.func,
    gjenapner: PropTypes.bool,
    gjenapneFeilet: PropTypes.bool,
    sykepengesoknad: sykepengesoknadPt,
};

const AvbruttSoknad = (props) => {
    const { sykepengesoknad } = props;
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <div className="panel panel--komprimert">
            <Varselstripe ikon="/sykefravaer/img/svg/avbryt-sykmelding.svg">
                <div>
                    <div>
                        <div className="statusopplysninger">
                            <SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift="h2" tittel="Status">
                                <p>
                                    {getLedetekst(`sykepengesoknad.status.${sykepengesoknad.status}`)}
                                </p>
                            </SykmeldingNokkelOpplysning>
                            <SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift="h2" tittel="Dato avbrutt">
                                <p>
                                    {toDatePrettyPrint(sykepengesoknad.avbruttDato)}
                                </p>
                            </SykmeldingNokkelOpplysning>
                        </div>
                    </div>
                    { sykepengesoknad.status === AVBRUTT && <Verktoylinje {...props} /> }
                </div>
            </Varselstripe>
        </div>
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

AvbruttSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default AvbruttSoknad;
