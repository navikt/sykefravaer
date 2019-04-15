import React from 'react';
import { getLedetekst, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import * as proptypes from '../../propTypes';
import { soknadPt } from '../../sykepengesoknad/prop-types/soknadProptype';
import { OPPHOLD_UTLAND } from '../../sykepengesoknad/enums/soknadtyper';
import { settErOppdelt as settErOppdeltGammel } from '../../sykepengesoknad-gammel-plattform/data/sykepengesoknader/sykepengesoknader';
import { settErOppdelt as settErOppdeltNy } from '../../sykepengesoknad/utils/settErOppdelt';

const SykepengesoknadBanner = ({ soknad }) => {
    const settErOppdelt = soknad && soknad.soknadstype ? settErOppdeltNy : settErOppdeltGammel;

    const { _erOppdelt } = settErOppdelt(soknad);
    const tittel = soknad && soknad.soknadstype === OPPHOLD_UTLAND
        ? getLedetekst('sykepengesoknad-utland.tittel')
        : getLedetekst('sykepengesoknad.sidetittel');

    return (<React.Fragment>
        <header className="soknadtopp">
            <h1 className="soknadtopp__tittel">{tittel}</h1>
            {
                _erOppdelt
                && (<div className="medHjelpetekst sidetopp__meta begrensning">
                    <p>
                        {
                            getLedetekst('sykepengesoknad.sidetittel.periode-2', {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })
                        }
                    </p>
                    <Hjelpetekst id="oppdelt-soknad-hjelpetekst">{getLedetekst('sykepengesoknad.sidetittel.hjelpetekst.tekst')}</Hjelpetekst>
                </div>)
            }
        </header>
    </React.Fragment>);
};

SykepengesoknadBanner.propTypes = {
    soknad: PropTypes.oneOfType([
        proptypes.sykepengesoknad,
        soknadPt,
    ]),
};

export default SykepengesoknadBanner;
