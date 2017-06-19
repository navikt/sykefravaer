import React from 'react';
import { connect } from 'react-redux';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { Link } from 'react-router';
import { Varselstripe } from 'digisyfo-npm';

const KorrigertAv = ({ korrigertAvSoknad }) => {
    return (<div className="panel panel--komprimert">
        <Varselstripe>
            <p>Søknaden er korrigert. <Link className="lenke" to={`/sykefravaer/soknader/${korrigertAvSoknad.id}`}>Se ny søknad</Link></p>
        </Varselstripe>
    </div>);
};

KorrigertAv.propTypes = {
    korrigertAvSoknad: sykepengesoknadPt,
};

export const mapStateToProps = (state, ownProps) => {
    const id = ownProps.sykepengesoknad.id;
    const sykepengesoknader = state.sykepengesoknader.data;
    let korrigertAvSoknad = { id };

    sykepengesoknader.forEach(() => {
        sykepengesoknader.forEach((s) => {
            if (s.korrigerer === korrigertAvSoknad.id) {
                korrigertAvSoknad = s;
            }
        });
    });

    return {
        korrigertAvSoknad,
    };
};

const KorrigertAvContainer = connect(mapStateToProps)(KorrigertAv);

export default KorrigertAvContainer;
