import React from 'react';
import OppsummeringSporsmal from './OppsummeringSporsmal';
import { soknad as soknadPt } from '../../propTypes/index';

export const getKey = (tag, id) => {
    return `${tag}_${id}`;
};

const Oppsummeringsvisning = ({ soknad }) => {
    return (<div>
        {
            soknad.sporsmal
                .filter((sporsmal) => {
                    return sporsmal.svar.svarverdi.length > 0;
                })
                .map((sporsmal) => {
                    return (<div className="oppsummering__seksjon" key={getKey(sporsmal.tag, sporsmal.id)}>
                        <OppsummeringSporsmal {...sporsmal} />
                    </div>);
                })
        }
    </div>);
};

Oppsummeringsvisning.propTypes = {
    soknad: soknadPt,
};

export default Oppsummeringsvisning;
