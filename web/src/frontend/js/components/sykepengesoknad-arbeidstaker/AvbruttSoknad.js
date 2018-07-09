import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, SykmeldingNokkelOpplysning, toDatePrettyPrint, sykepengesoknadstatuser } from 'digisyfo-npm';
import Knapp from 'nav-frontend-knapper';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';

const Verktoylinje = ({ sykepengesoknad, gjenapneSoknad, gjenapner, gjenapneFeilet }) => {
    return (<div>
        <div className={`verktoylinje ${gjenapneFeilet ? 'blokk--mini' : ''}`}>
            <div className="verktoylinje__element">
                <Knapp
                    spinner={gjenapner}
                    disabled={gjenapner}
                    mini
                    onClick={(e) => {
                        e.preventDefault();
                        gjenapneSoknad(sykepengesoknad.id);
                    }}
                    className="js-gjenapne">
                    {getLedetekst('sykepengesoknad.gjenapne.knapp')}</Knapp>
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
            { sykepengesoknad.status === sykepengesoknadstatuser.AVBRUTT && <Verktoylinje {...props} /> }
        </div>
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

AvbruttSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default AvbruttSoknad;
