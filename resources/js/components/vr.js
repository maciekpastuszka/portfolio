import Promise from 'es6-promise';
import ajax from './ajax';

class Vr {
    constructor(vr_container) {
        this.vr_container = vr_container;
        this.vr_show_btn = document.querySelector('.hero__btn--vr');
        this.vr_hide_btn = document.querySelector('.hero__btn--vr-close');
        this.vr_loader = document.querySelector('.hero__vr-loader');
        this.hero_layers = document.querySelector('.hero__layers');
        this.hero_container = document.querySelector('.hero__container');
        this.mouse_animation = document.querySelector('.mouse');
        this.state = {
            vr_loaded: false
        };
    }

    _loadAframe() {
        return new Promise((resolve) => {
            if (!this.state.vr_loaded) {
                /**
                 * Start loading, fetch script and run aframe then show VR mode
                 */
                this.vr_loader.classList.add('hero__vr-loader--start');
                this._addAframeScript()
                    .then(this._triggerDOMContentLoadedEvent)
                    .then(() => ajax('aframe/portfolio.html', 'GET', 'text'))
                    .then((data) => {
                        this.vr_container.innerHTML = data;
                        return this._aframeLoadImages();
                    })
                    .then(() => {
                        this.state.vr_loaded = true;
                        this.vr_loader.classList.add('hero__vr-loader--complete');
                        this.mouse_animation.classList.add('mouse--start');
                        resolve('aframe loaded');
                    });
            } else {
                /**
                 * Just show VR mode
                 */
                resolve('show vr mode');
            }
        });
    }

    _addAframeScript() {
        return new Promise((resolve, reject) => {
            const aframe_script = document.createElement('script');
            aframe_script.setAttribute('src', '/aframe/aframe.min.js');
            document.querySelector('head').appendChild(aframe_script);
            aframe_script.addEventListener('load', () => {
                resolve();
            });
        });
    }

    _triggerDOMContentLoadedEvent() {
        const DOMContentLoaded_event = document.createEvent("Event");
        DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
        window.document.dispatchEvent(DOMContentLoaded_event);
    }

    _aframeLoadImages() {
        return new Promise((resolve) => {
            let loaded_aframe_images = 0;
            const aframe_images = this.vr_container.querySelectorAll('a-image');

            for (let i = 0; i < aframe_images.length; i++) {
                let image = aframe_images[i];
                let temp_image = new Image();
                temp_image.onload = () => {
                    image.src = this.src;
                    loaded_aframe_images++;
                    if (loaded_aframe_images === aframe_images.length) {
                        resolve('images loaded');
                    }
                };
                temp_image.src = image.getAttribute('src');
            }
        });
    }

    _toggleVrMode() {
        this.hero_layers.classList.toggle('hero__layers--hidden');
        this.hero_container.classList.toggle('hero__container--hidden');
    }

    _events() {
        this.vr_show_btn.addEventListener('click', () => {
            this._loadAframe().then(() => {
                this._toggleVrMode();
            });
        });

        this.vr_hide_btn.addEventListener('click', () => {
            this._toggleVrMode();
        });
    }

    init() {
        if (this.vr_container) {
            try {
                this._events();
            } catch (e) {
                console.warn(e);
            }
        }
    }
}

export default Vr;
