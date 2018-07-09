import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { soknad as soknadPt, sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import Lightbox from '../Lightbox';

const SoknadLightbox = ({ soknad, onClose }) => {
    return (<Lightbox onClose={onClose}>
        <p className="lightbox__p">{
            getLedetekst('soknader.teaser.fremtidig.dato-info', {
                '%DATO%': toDatePrettyPrint(soknad.tom),
            })
        }</p>
        <div className="knapperad">
            <Knapp onClick={onClose}>Lukk</Knapp>
        </div>
    </Lightbox>);
};

SoknadLightbox.propTypes = {
    soknad: sykepengesoknadPt,
    onClose: PropTypes.func,
};

class FremtidigSoknadTeaser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vis: false,
        };
    }

    render() {
        const { soknad } = this.props;

        return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
            <button
                className="inngangspanel inngangspanel--inaktivt"
                onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                        vis: true,
                    });
                }}>
                <span className="inngangspanel__ikon">
                    <img alt="" className="js-ikon" src="/sykefravaer/img/svg/soknader.svg" />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`soknad-header-${soknad.id}`}>
                            <small className="inngangspanel__meta js-meta">
                                {getLedetekst('soknad.teaser.dato.fremtidig', { '%DATO%': toDatePrettyPrint(soknad.tom) })}
                            </small>
                            <span className="inngangspanel__tittel">
                                {getLedetekst('soknad.teaser.tittel')}
                            </span>
                        </h3>
                        <p className="inngangspanel__status js-status">
                            {getLedetekst(`soknad.teaser.status.${soknad.status}`)}
                        </p>
                    </header>
                    <p className="inngangspanel__tekst js-tekst">
                        {
                            getLedetekst('soknad.teaser.tekst', {
                                '%FRA%': toDatePrettyPrint(soknad.fom),
                                '%TIL%': toDatePrettyPrint(soknad.tom),
                            })
                        }
                    </p>
                    {
                        soknad.arbeidsgiver &&
                        (<p className="inngangspanel__undertekst js-undertekst mute">
                            {soknad.arbeidsgiver.navn}
                        </p>)
                    }
                </div>
            </button>
            {
                this.state.vis && <SoknadLightbox
                    soknad={soknad}
                    onClose={() => {
                        this.setState({
                            vis: false,
                        });
                    }} />
            }
        </article>);
    }
}

FremtidigSoknadTeaser.propTypes = {
    soknad: PropTypes.oneOfType(sykepengesoknadPt, soknadPt),
};

export default FremtidigSoknadTeaser;
