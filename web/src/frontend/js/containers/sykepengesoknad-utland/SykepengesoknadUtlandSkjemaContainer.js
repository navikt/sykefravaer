import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import StrippetSide from '../../sider/StrippetSide';
import { soknad as soknadPt } from '../../propTypes';
import UtlandsSkjema from '../../components/sykepengesoknad-utland/UtlandsSkjema/UtlandsSkjema';

export const SykepengesoknadUtlandSkjemaContainer = ({ soknad }) => {
    return (<StrippetSide tittel={getLedetekst('sykepengesoknad-utland.sidetittel')}>
        {(() => {
            if (soknad) {
                return (<UtlandsSkjema
                    soknad={soknad}
                />);
            }
            return (<p className="panel begrensning">
                    Lat som om vi redirecter til fremsiden!
            </p>); // redirect til fremside
        })()
        }
    </StrippetSide>);
};


SykepengesoknadUtlandSkjemaContainer.propTypes = {
    soknad: soknadPt,
};
