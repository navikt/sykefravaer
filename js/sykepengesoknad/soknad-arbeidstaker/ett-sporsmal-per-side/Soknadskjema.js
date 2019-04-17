import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { scrollTo } from '@navikt/digisyfo-npm';
import { UTKAST_TIL_KORRIGERING } from '../../enums/soknadstatuser';
import KorrigerVarsel from '../../../components/soknad-felles/KorrigerVarsel';
import TidligSoknad from '../../../components/soknad-felles/TidligSoknad';
import { soknadPt } from '../../prop-types/soknadProptype';
import StegindikatorEttSporsmalPerSide from './StegindikatorEttSporsmalPerSide';
import SykmeldingUtdrag from '../../felleskomponenter/sykmelding-utdrag/SykmeldingUtdrag';

class Soknadskjema extends Component {
    componentDidMount() {
        if (this.props.scroll) {
            scrollTo(this.stegindikator, 0);
        }
    }

    render() {
        const { children, sidenummer = null, tittel, soknad, intro = null } = this.props;
        const forrigeUrl = `/sykefravaer/soknader/${soknad.id}/${(sidenummer - 1)}`;

        return (<div>
            {
                sidenummer > 1 && (<div
                    ref={(stegindikator) => {
                        this.stegindikator = stegindikator;
                    }}>
                    <StegindikatorEttSporsmalPerSide soknad={soknad} sidenummer={sidenummer} />
                </div>)
            }
            {
                sidenummer > 1 && (<p>
                    <Link to={forrigeUrl} className="tilbakelenke">
                        Tilbake
                    </Link>
                </p>)
            }
            {soknad.status === UTKAST_TIL_KORRIGERING && <KorrigerVarsel />}
            <TidligSoknad soknad={soknad} />
            {intro}
            <SykmeldingUtdrag soknad={soknad} erApen={sidenummer === 1} />
            {tittel && <h2 className="soknad__stegtittel">{tittel}</h2>}
            {children}
        </div>);
    }
}

Soknadskjema.propTypes = {
    children: PropTypes.node,
    tittel: PropTypes.string,
    soknad: soknadPt,
    intro: PropTypes.node,
    sidenummer: PropTypes.number,
    scroll: PropTypes.bool,
};

Soknadskjema.defaultProps = {
    scroll: true,
};

export default Soknadskjema;
