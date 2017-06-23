import React from 'react';
import { connect } from 'react-redux';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { Link } from 'react-router';
import { Varselstripe, getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { getTidligsteSendtDato } from '../../utils/sykepengesoknadUtils';

export const KorrigertAv = ({ korrigertAvSoknad }) => {
    return (<div className="panel panel--komprimert blokk">
        <Varselstripe ikon="/sykefravaer/img/svg/hoder/utropstegn--gulfylt.svg">
            <div>
                <p className="sist">
                    {getLedetekst('sykepengesoknad.korrigert.tekst', {
                    '%DATO%': toDatePrettyPrint(getTidligsteSendtDato(korrigertAvSoknad)),
                })}
                </p>
                <p className="sist">
                    <Link className="lenke" to={`/sykefravaer/soknader/${korrigertAvSoknad.id}`}>{getLedetekst('sykepengesoknad.korrigert.lenketekst')}</Link>
                </p>
            </div>
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
