import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';

class SoknadTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ikon: 'soknader.svg',
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: 'soknader_hover-blue.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'soknader.svg',
        });
    }

    render() {
        const { soknad, ledetekster } = this.props;

        const visStatus = soknad.status !== 'NY';

        return (<article aria-labelledby={`soknader-header-${this.props.soknad.id}`}>
            <Link className="inngangspanel" to={`${getContextRoot()}/soknader/${this.props.soknad.id}`}
                onMouseEnter={() => {this.onMouseEnter();}}
                onMouseLeave={() => {this.onMouseLeave();}}
            >
            <span className="inngangspanel__ikon">
                <img className="js-ikon" src={`/sykefravaer/img/svg/${this.state.ikon}`} />
            </span>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`soknad-header-${this.props.soknad.id}`}>
                        <small className="inngangspanel__meta">{getLedetekst('soknad.teaser.dato', ledetekster, { '%DATO%': this.props.soknad.fom }) } </small>
                        <span className="inngangspanel__tittel">
                            {getLedetekst('soknad.teaser.tittel', ledetekster)}
                        </span>
                    </h3>
                    {
                        visStatus &&
                            <p className="inngangspanel__status">
                            { getLedetekst(`soknad.teaser.status.${soknad.status}`, ledetekster, { '%DATO%': this.props.soknad.innsendingsDato }) }
                            </p>
                    }
                </header>
                <p className="inngangspanel__tekst">{getLedetekst('soknad.teaser.tekst', ledetekster, { '%FRA%': this.props.soknad.fom, '%TIL%': this.props.soknad.tom }) }</p>
                <p className="inngangspanel__undertekst mute">{getLedetekst('soknad.teaser.undertekst', ledetekster, { '%ARBEIDSGIVER%': this.props.soknad.arbeidsgiver }) }</p>
            </div>
        </Link></article>);
    }
}

SoknadTeaser.propTypes = {
    soknad: PropTypes.object.isRequired,
    ledetekster: PropTypes.object,
};

export default SoknadTeaser;
