require('dotenv').config();
const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

const requestDecorator = (callback) => request(`${process.env.DECORATOR_URL}/?chatbot=false`, callback);

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (
                !error &&
                response.statusCode >= 200 &&
                response.statusCode < 400
            ) {
                const { document } = new JSDOM(body).window;
                const prop = 'innerHTML';

                const data = {
                    NAV_SKIPLINKS: document.getElementById("skiplinks")[prop],
                    NAV_SCRIPTS: document.getElementById("scripts")[prop],
                    NAV_STYLES: document.getElementById("styles")[prop],
                    NAV_HEADING: document.getElementById("header-withmenu")[prop],
                    NAV_FOOTER: document.getElementById("footer-withmenu")[prop],
                    MEGAMENU_RESOURCES: document.getElementById("megamenu-resources")[
                        prop
                    ],
                };
                resolve(data);
            } else {
                console.log(error);
                reject(new Error(error));
            }
        };

        requestDecorator(callback);
    });

module.exports = getDecorator;
