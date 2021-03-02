import React from 'react';
import PropTypes from 'prop-types';
import { log } from '../utils';

const Video = ({ film }) => {
    if (!film) {
        return null;
    }
    return (
        <video
            width="100%"
            height="auto"
            controls
            poster={film.poster}
            onCanPlay={() => {
                log('Film klar til visning');
                /* eslint-disable quote-props */
                window.dataLayer.push({
                    'event': 'DIGISYFO_FILM',
                    'category': 'FILM_KLAR_TIL_VISNING',
                    'film': film.src,
                    'url': window.location.href,
                });
            /* eslint-enable quote-props */
            }}
            onPlaying={() => {
                log('Film startet');
                /* eslint-disable quote-props */
                window.dataLayer.push({
                    'event': 'DIGISYFO_FILM',
                    'category': 'FILM_STARTET',
                    'film': film.src,
                    'url': window.location.href,
                });
            /* eslint-enable quote-props */
            }}>
            <source src={film.src} type="video/mp4" />
            <track label="Norsk bokmål" kind="captions" srcLang="nb_no" src={film.captionSrc} default />
            <p>
Nettleseren din støtter ikke denne videoavspillingen.
                <a href={film.src}>Gå direkte til videoklippet</a>
            </p>
        </video>
    );
};

Video.propTypes = {
    film: PropTypes.shape({
        src: PropTypes.string.isRequired,
        captionSrc: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
    }),
};

export default Video;
