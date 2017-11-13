import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ src, img, captionSrc }) => {
    return (<video width="100%" height="auto" controls poster={img}>
        <source src={src} type="video/mp4" />
        { captionSrc && <track label="Norsk bokmål" kind="subtitles" srcLang="nb_no" src={captionSrc} default /> }
        <p>Nettleseren din støtter ikke denne videoavspillingen. <a href={src}>Gå direkte til videoklippet</a></p>
    </video>);
};

Video.propTypes = {
    src: PropTypes.string.isRequired,
    img: PropTypes.string,
    captionSrc: PropTypes.string,
};

export default Video;
