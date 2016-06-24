import React, { PropTypes, Component } from 'react';

class Dropdown extends Component {

    componentDidUpdate() {
        // Dette for å hindre at fokus settes på noe annet, f.eks. en hjelpetekst
        this.refs.select.focus();
    }

    render() {
        return (<select
            onChange={(event) => {this.props.onChange(event.target.value);}}
            defaultValue={this.props.valgtAlternativ}
            aria-controls={this.props.ariaControls}
            ref="select"
            id={this.props.id}>
            {this.props.alternativer.map((alt, idx) => {
                return (<option key={idx}
                    value={alt.verdi}>{alt.tekst}</option>);
            })}
        </select>);
    }
}
Dropdown.propTypes = {
    alternativer: PropTypes.array,
    valgtAlternativ: PropTypes.string,
    ariaControls: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    onChange: () => {
        return;
    },
};

export default Dropdown;
