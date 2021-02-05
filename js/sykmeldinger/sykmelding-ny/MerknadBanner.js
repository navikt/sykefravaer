import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { scrollTo } from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import MannNoytral from '../../components/svg/MannNoytral';
import { sykmelding as sykmeldingPt } from '../../propTypes';

export const harMerknad = (sykmelding, merknadType) => {
    return (
        sykmelding.merknader
    && sykmelding.merknader.some((merknad) => {
        return merknad.type === merknadType;
    })
    );
};

const VeilederpanelWrapper = ({ children, skjemaRef }) => {
    return (
        <div style={{ paddingTop: '1rem', marginBottom: '2rem' }}>
            <Veilederpanel
                fargetema="advarsel"
                type="plakat"
                center
                kompakt
                svg={<MannNoytral />}
            >
                {children}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollTo(skjemaRef.current);
                        skjemaRef.current.focus();
                    }}
                    className="knapp knapp--mini"
                >
          Gå til utfyllingen
                </button>
            </Veilederpanel>
        </div>
    );
};

VeilederpanelWrapper.propTypes = {
    children: PropTypes.element,
    skjemaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
    ]),
};
const MerknadBanner = ({ sykmelding, skjemaRef }) => {
    if (harMerknad(sykmelding, 'UGYLDIG_TILBAKEDATERING')) {
        return (
            <VeilederpanelWrapper skjemaRef={skjemaRef}>
                <h2 className="js-merknad-banner-title">
          Tilbakedateringen kan ikke godkjennes
                </h2>
                <p>
          Vanligvis starter sykmeldingen den datoen du er hos behandleren. I
          enkelte tilfeller kan datoen i sykmeldingen settes tilbake i tid, det
          vi kaller tilbakedatering. NAV vurderer om det er en gyldig grunn for
          tilbakedateringen.
                </p>
                <p>
          Sykmeldingen din startet før du oppsøkte behandleren, og det er ikke
          oppgitt noen gyldig grunn. Derfor vil du ikke få sykepenger for disse
          dagene.
                </p>
                <h2>Hva gjør jeg nå?</h2>
                <p>
          Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du
          søknaden om sykepenger. Når søknaden er behandlet, vil du få en
          begrunnelse for hvorfor du ikke kan få sykepenger for de
          tilbakedaterte dagene, og du får samtidig mulighet til å klage.
                </p>
            </VeilederpanelWrapper>
        );
    }

    if (harMerknad(sykmelding, 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER')) {
        return (
            <VeilederpanelWrapper skjemaRef={skjemaRef}>
                <h2 className="js-merknad-banner-title">Behov for mer opplysninger</h2>
                <p>
          Sykmeldingen din starter tidligere enn den dagen du var hos
          behandleren. Vi kontakter nå behandleren din for å få opplysninger om
          hvorfor sykmeldingen er datert tilbake.
                </p>
                <p>
          Du kan likevel sende inn søknaden om sykepenger. Avhengig av hvilke
          opplysninger vi får fra behandleren din, kan det hende du ikke får
          sykepenger for dagene før sykmeldingstidspunktet.
                </p>
            </VeilederpanelWrapper>
        );
    }

    return null;
};

MerknadBanner.propTypes = {
    sykmelding: sykmeldingPt,
    skjemaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
    ]),
};

export default MerknadBanner;
