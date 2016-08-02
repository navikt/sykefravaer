import React, { PropTypes, Component } from 'react';
import { getLedetekst } from '../ledetekster';
import TidslinjeBudskap from './TidslinjeBudskap.js';
import { scrollTo } from '../utils';

class TidslinjeBoble extends Component {

    getContainerClass() {
        let className = this.props.erApen ? 'boble-budskap-container er-apen' : 'boble-budskap-container';
        if (this.props.medAnimasjon) {
            className = `${className} med-animasjon`;
        }
        return className;
    }

    setNaavaerendeHoyde() {
        const budskapHoyde = this.refs['js-budskap'].offsetHeight;
        const naaHoyde = !this.props.erApen ? null : budskapHoyde;

        this.props.setHendelseState({
            hoyde: `${naaHoyde}px`,
        });
    }

    apne() {
        this.setNaavaerendeHoyde();
        this.props.setHendelseState({
            visBudskap: true,
            medAnimasjon: true,
            hindreToggle: true,
        });
        setTimeout(() => {
            const nyHoyde = `${this.refs['js-budskap'].offsetHeight}px`;
            this.props.setHendelseState({
                hoyde: nyHoyde,
                erApen: true,
            });
        }, 0);
        setTimeout(() => {
            scrollTo(this.refs.boble, 1000);
            this.props.setHendelseState({
                medAnimasjon: false,
                hoyde: 'auto',
                hindreToggle: false,
            });
            setTimeout(() => {
                this.props.setHendelseState({
                    medAnimasjon: true,
                });
            }, 20);
        }, 300);
    }

    lukk() {
        this.props.setHendelseState({
            medAnimasjon: true,
            hindreToggle: true,
        });
        this.setNaavaerendeHoyde();
        setTimeout(() => {
            this.props.setHendelseState({
                hoyde: '0',
                erApen: false,
            });
        }, 0);
        setTimeout(() => {
            this.props.setHendelseState({
                visBudskap: false,
                medAnimasjon: false,
                hindreToggle: false,
            });
        }, 300);
    }

    toggle(e) {
        e.preventDefault();
        if (this.props.erApen && !this.props.hindreToggle) {
            this.lukk();
        } else if (!this.props.hindreToggle) {
            this.apne();
        }
    }

    render() {
        return (<article className="boble" ref="boble">
            <a
                role="button"
                onClick={(e) => { this.toggle(e); }}
                aria-pressed={this.props.erApen}
                href={`#${this.props.id}`}
                className={!this.props.erApen ? 'header-boble' : 'header-boble er-apen'}>
                <h3 className={!this.props.erApen ? 'boble-tittel boble-tittel-collapse' : 'boble-tittel boble-tittel-collapse er-apen'}>
                    {getLedetekst(`${this.props.tekstkey}.tittel`, this.props.ledetekster)}
                </h3>
            </a>
            <div
                aria-hidden={!this.props.erApen}
                style={this.props.hoyde ? { height: this.props.hoyde } : {}}
                className={this.getContainerClass()}>
                <div ref="js-budskap">
                    <TidslinjeBudskap
                        vis={this.props.visBudskap}
                        bilde={this.props.bilde}
                        alt={this.props.alt}
                        innhold={getLedetekst(`${this.props.tekstkey}.budskap`, this.props.ledetekster)} />
                </div>
            </div>
        </article>);
    }
}

TidslinjeBoble.propTypes = {
    erApen: PropTypes.bool,
    ledetekster: PropTypes.object,
    bilde: PropTypes.string,
    alt: PropTypes.string,
    setHendelseState: PropTypes.func,
    hoyde: PropTypes.string,
    visBudskap: PropTypes.bool,
    medAnimasjon: PropTypes.bool,
    hindreToggle: PropTypes.bool,
    id: PropTypes.string,
    tekstkey: PropTypes.string,
};

export default TidslinjeBoble;
