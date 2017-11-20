import React from 'react';
import PropTypes from 'prop-types';
import * as filmer from '../enums/filmer';

const Video = ({ type }) => {
    const film = filmer[type];
    if (!film) {
        return null;
    }   
    return (<video width="100%" height="auto" controls poster={film.poster}>
        <source src={film.src} type="video/mp4" />
        { film.captionSrc && <track label="Norsk bokmål" kind="subtitles" srcLang="nb_no" src={film.captionSrc} default /> }
        <p>Nettleseren din støtter ikke denne videoavspillingen. <a href={film.src}>Gå direkte til videoklippet</a></p>
    </video>);
};

Video.propTypes = {
    type: PropTypes.oneOf(Object.keys(filmer.filmtyper)),
};

export default Video;
