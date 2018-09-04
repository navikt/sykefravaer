export const getOnChange = (props) => {
    if (props.pavirkerAndreSporsmal) {
        return (event, newValue) => {
            props.actions.soknadEndret(props.soknad, props.name, newValue);
        };
    }
    return null;
};
