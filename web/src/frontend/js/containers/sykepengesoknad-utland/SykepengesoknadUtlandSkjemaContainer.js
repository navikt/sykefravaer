import React from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import StrippetSide from '../../sider/StrippetSide';
import { soknad as soknadPt } from '../../propTypes';
import { NY } from '../../enums/soknadstatuser';
import UtlandsSkjema from '../../components/sykepengesoknad-utland/UtlandsSkjema/UtlandsSkjema';

export const Container = ({ soknad }) => {
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


Container.propTypes = {
    soknad: soknadPt,
};

export const finnSoknad = (state, ownProps) => {
    return state.soknader.data.find((s) => {
        return s.id === ownProps.params.sykepengesoknadId && s.status === NY;
    });
};

export function mapStateToProps(state, ownProps) {
    const soknad = finnSoknad(state, ownProps);
    return {
        soknad,
    };
}


export default connect(mapStateToProps)(Container);
