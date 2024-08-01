"use strict";

// Include the copy image clipboard library
const CopyImageClipboard = function(n){"use strict";function t(n,t,o,e){return new(o||(o=Promise))((function(i,r){function c(n){try{a(e.next(n))}catch(n){r(n)}}function u(n){try{a(e.throw(n))}catch(n){r(n)}}function a(n){var t;n.done?i(n.value):(t=n.value,t instanceof o?t:new o((function(n){n(t)}))).then(c,u)}a((e=e.apply(n,t||[])).next())}))}function o(n){return t(this,void 0,void 0,(function*(){const t=yield fetch(`${n}`);return yield t.blob()}))}function e(n){return n.type.includes("jpeg")}function i(n){return n.type.includes("png")}function r(n){return t(this,void 0,void 0,(function*(){return new Promise((function(t,o){const e=document.createElement("img");e.crossOrigin="anonymous",e.src=n,e.onload=function(n){const o=n.target;t(o)},e.onabort=o,e.onerror=o}))}))}function c(n){return t(this,void 0,void 0,(function*(){return new Promise((function(t,o){const e=document.createElement("canvas"),i=e.getContext("2d");if(i){const{width:r,height:c}=n;e.width=r,e.height=c,i.drawImage(n,0,0,r,c),e.toBlob((function(n){n?t(n):o("Cannot get blob from image element")}),"image/png",1)}}))}))}function u(n){return t(this,void 0,void 0,(function*(){const t=URL.createObjectURL(n),o=yield r(t);return yield c(o)}))}function a(n){return t(this,void 0,void 0,(function*(){const t={[n.type]:n},o=new ClipboardItem(t);yield navigator.clipboard.write([o])}))}return n.canCopyImagesToClipboard=function(){var n;const t="undefined"!=typeof fetch,o="undefined"!=typeof ClipboardItem,e=!!(null===(n=null===navigator||void 0===navigator?void 0:navigator.clipboard)||void 0===n?void 0:n.write);return t&&o&&e},n.convertBlobToPng=u,n.copyBlobToClipboard=a,n.copyImageToClipboard=function(n){return t(this,void 0,void 0,(function*(){const t=yield o(n);if(e(t)){const n=yield u(t);return yield a(n),t}if(i(t))return yield a(t),t;throw new Error("Cannot copy this type of image to clipboard")}))},n.createImageElement=r,n.getBlobFromImageElement=c,n.getBlobFromImageSource=o,n.isJpegBlob=e,n.isPngBlob=i,n.requestClipboardWritePermission=function(){var n;return t(this,void 0,void 0,(function*(){if(!(null===(n=null===navigator||void 0===navigator?void 0:navigator.permissions)||void 0===n?void 0:n.query))return!1;const{state:t}=yield navigator.permissions.query({name:"clipboard-write"});return"granted"===t}))},n}({});

// Detect Android, iOS
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPad|iPhone|iPod/i.test(userAgent);
}

// Detect PNG or JPG
function isSupportedImageFormat(imageUrl) {
    const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    const extension = imageUrl.split('.').pop().toLowerCase();
    return supportedFormats.includes(`image/${extension}`);
}

const settings = require("../models/settings.js");
const views = require("../util/views.js");
const optimizedResize = require("../util/optimized_resize.js");

class PostContentControl {
    constructor(hostNode, post, viewportSizeCalculator, fitFunctionOverride) {
        this._post = post;
        this._viewportSizeCalculator = viewportSizeCalculator;
        this._hostNode = hostNode;
        this._template = views.getTemplate("post-content");

        let fitMode = settings.get().fitMode;
        if (typeof fitFunctionOverride !== "undefined") {
            fitMode = fitFunctionOverride;
        }

        this._currentFitFunction =
            {
                "fit-both": this.fitBoth,
                "fit-original": this.fitOriginal,
                "fit-width": this.fitWidth,
                "fit-height": this.fitHeight,
            }[fitMode] || this.fitBoth;

        this._install();

        this._post.addEventListener("changeContent", (e) =>
            this._evtPostContentChange(e)
        );
    }

    disableOverlay() {
        this._hostNode.querySelector(".post-overlay").style.display = "none";
    }

    fitWidth() {
        this._currentFitFunction = this.fitWidth;
        const mul = this._post.canvasHeight / this._post.canvasWidth;
        let width = this._viewportWidth;
        if (!settings.get().upscaleSmallPosts) {
            width = Math.min(this._post.canvasWidth, width);
        }
        this._resize(width, width * mul);
    }

    fitHeight() {
        this._currentFitFunction = this.fitHeight;
        const mul = this._post.canvasWidth / this._post.canvasHeight;
        let height = this._viewportHeight;
        if (!settings.get().upscaleSmallPosts) {
            height = Math.min(this._post.canvasHeight, height);
        }
        this._resize(height * mul, height);
    }

    fitBoth() {
        this._currentFitFunction = this.fitBoth;
        let mul = this._post.canvasHeight / this._post.canvasWidth;
        if (this._viewportWidth * mul < this._viewportHeight) {
            let width = this._viewportWidth;
            if (!settings.get().upscaleSmallPosts) {
                width = Math.min(this._post.canvasWidth, width);
            }
            this._resize(width, width * mul);
        } else {
            let height = this._viewportHeight;
            if (!settings.get().upscaleSmallPosts) {
                height = Math.min(this._post.canvasHeight, height);
            }
            this._resize(height / mul, height);
        }
    }

    fitOriginal() {
        this._currentFitFunction = this.fitOriginal;
        this._resize(this._post.canvasWidth, this._post.canvasHeight);
    }

    get _viewportWidth() {
        return this._viewportSizeCalculator()[0];
    }

    get _viewportHeight() {
        return this._viewportSizeCalculator()[1];
    }

    _evtPostContentChange(e) {
        this._post = e.detail.post;
        this._post.mutateContentUrl();
        this._reinstall();
    }

    _resize(width, height) {
        const resizeListenerNodes = [this._postContentNode].concat(
            ...this._postContentNode.querySelectorAll(".resize-listener")
        );
        for (let node of resizeListenerNodes) {
            node.style.width = width + "px";
            node.style.height = height + "px";
        }
    }

    _refreshSize() {
        if (window.innerWidth <= 800) {
            const buttons = document.querySelector(".sidebar > .buttons");
            if (buttons) {
                const content = document.querySelector(".content");
                content.insertBefore(buttons, content.querySelector(".post-container + *"));

                const afterControls = document.querySelector(".content > .after-mobile-controls");
                if (afterControls) {
                    afterControls.parentElement.parentElement.appendChild(afterControls);
                }
            }
        } else {
            const buttons = document.querySelector(".content > .buttons");
            if (buttons) {
                const sidebar = document.querySelector(".sidebar");
                sidebar.insertBefore(buttons, sidebar.firstElementChild);
            }

            const afterControls = document.querySelector(".content + .after-mobile-controls");
            if (afterControls) {
                document.querySelector(".content").appendChild(afterControls);
            }
        }

        this._currentFitFunction();
    }

    _install() {
        this._reinstall();
        optimizedResize.add(() => this._refreshSize());
        views.monitorNodeRemoval(this._hostNode, () => {
            this._uninstall();
        });
    }

    _reinstall() {
        const newNode = this._template({
            post: this._post,
            autoplay: settings.get().autoplayVideos,
        });
        if (settings.get().transparencyGrid) {
            newNode.classList.add("transparency-grid");
        }
        if (this._postContentNode) {
            this._hostNode.replaceChild(newNode, this._postContentNode);
        } else {
            this._hostNode.appendChild(newNode);
        }
        this._postContentNode = newNode;
        this._refreshSize();

        // Add event listener for the copy image button
	const copyImageButton = document.getElementById('copyImageButton');
	const postImage = document.getElementById('postImage');

	// console.log('copyImageButton:', copyImageButton);
	// console.log('postImage:', postImage);

        // Hide on Android + Safari
        if (isMobileDevice() || !isSupportedImageFormat(postImage.src)) {
            if (copyImageButton) {
                copyImageButton.style.display = 'none';
            }
            return;
        }
        
        if (copyImageButton && postImage) {
            copyImageButton.addEventListener('click', async () => {
                try {
                    if (!navigator.clipboard) {
                        throw new Error('Clipboard API not supported');
                    }

                    const imageUrl = postImage.src;
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();

                    let clipboardBlob = blob;
                    if (blob.type === 'image/jpeg') {
                        clipboardBlob = await CopyImageClipboard.convertBlobToPng(blob);
                    }

                    const clipboardItem = new ClipboardItem({ [clipboardBlob.type]: clipboardBlob });
                    await navigator.clipboard.write([clipboardItem]);

                    // Change button text and color on success
                    copyImageButton.innerHTML = '<i class="fa fa-check"></i>&nbsp;Snagged!';
                    copyImageButton.classList.add('button-success');

                    // Optionally, revert the button text and color after a delay
                    setTimeout(() => {
                        copyImageButton.innerHTML = '<i class="fa fa-copy"></i>&nbsp;Copy';
                        copyImageButton.classList.remove('button-success');
                    }, 2200); // Revert after 2.2 seconds

                } catch (e) {
                    alert(`Error: ${e.message}`);
                }
            });

        } else {
            console.error('Copy image button or post image not found');
        }
    }

    _uninstall() {
        optimizedResize.remove(() => this._refreshSize());
    }
}

module.exports = PostContentControl;
