import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { getHtmlLedetekst, getLedetekst } from '../../digisyfoNpm';
import { naermesteLeder as naermesteLederPt } from '../../propTypes/index';
import Feilstripe from '../../components/Feilstripe';

export const LederAvkreftet = ({ onLukk }) => {
    return (
        <div>
            <h3 className="hode hode--suksess panel__tittel">{getLedetekst('sykefravaer.endre-naermeste-leder.kvittering.tittel')}</h3>
            <div className="knapperad">
                <Knapp
                    className="knapp js-lukk"
                    onClick={(e) => {
                        e.preventDefault();
                        onLukk();
                    }}
                >
                    Lukk
                </Knapp>
            </div>
        </div>
    );
};

LederAvkreftet.propTypes = {
    onLukk: PropTypes.func,
};

const BekreftFeilLeder = ({
    leder, onAvbryt, avkreftLeder, avkrefter, avkreftFeilet,
}) => {
    const knappClassName = 'knapp knapp--fare blokk--s js-bekreft';
    return (
        <div>
            <div className={avkreftFeilet ? 'blokk' : ''}>
                <h3 className="modal__tittel">{getLedetekst('sykefravaer.endre-naermeste-leder.tittel')}</h3>
                <div dangerouslySetInnerHTML={getHtmlLedetekst('sykefravaer.endre-naermeste-leder.melding', {
                    '%LEDER%': leder.navn,
                    '%ARBEIDSGIVER%': leder.organisasjonsnavn,
                })} />
            </div>
            <Feilstripe vis={avkreftFeilet} />
            <div className="knapperad">
                <Knapp
                    htmlType="button"
                    disabled={avkrefter}
                    className={knappClassName}
                    spinner={avkrefter}
                    onClick={() => {
                        avkreftLeder(leder.orgnummer);
                    }}>
                    Ja, jeg er sikker
                </Knapp>
                <p>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        className="lenke js-avbryt"
                        href="#"
                        role="button"
                        onClick={(e) => {
                            e.preventDefault();
                            onAvbryt();
                        }}>
                        Avbryt
                    </a>
                </p>
            </div>
        </div>
    );
};

BekreftFeilLeder.propTypes = {
    leder: naermesteLederPt,
    onAvbryt: PropTypes.func,
    avkreftLeder: PropTypes.func,
    avkrefter: PropTypes.bool,
    avkreftFeilet: PropTypes.bool,
};

export default BekreftFeilLeder;
