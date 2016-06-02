import React, { PropTypes, Component } from 'react';

class Hjelpetekst extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erApen: false,
        };
    }

    aapne(){
        this.setState({erApen: true})
    }

    lukk(){
        this.setState({erApen: false})
    }

    toggle(event){
        if (this.state.erApen) {
            this.lukk()
        } else {
            this.aapne()
        }
    }

    render() {
        const ariaId = `tooltip-${this.props.id}`;
        return (
            <div className="hjelpetekst">
                <button type="button" className="hjelpetekst-ikon" aria-describedby={ariaId} onClick={(event)=>{this.toggle(event)}} ref="js-aapne">
             <span aria-hidden="true">
                ?
            </span>
             <span className="vekk">
                ? Hjelpetekst
            </span>
                </button>
                <div role="tooltip" id={ariaId} className={`hjelpetekst-tooltip ${this.state.erApen ? "er-synlig" : ""}`}>
                    <h3 className="decorated hjelpetekst-tittel">
                        Hjelpetekst tittel
                    </h3>
                    <div className="hjelpetekst-tekst js-tekst">
                        <p>
                            Her er litt hjelpetekst.
                        </p>
                    </div>
                    <button type="button" className="hjelpetekst-lukk"
                            aria-controls={ariaId}
                            onClick={()=>{this.lukk()}}
                            ref="js-lukk">
                 <span className="vekk">
                    Lukk
                </span>
                    </button>
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        if (this.state.erApen) {
            this.refs['js-lukk'].focus()
        } else {
            this.refs['js-aapne'].focus()
        }
    }
};

export default Hjelpetekst;

