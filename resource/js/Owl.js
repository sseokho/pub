Video.prototype.play = function(event) {
	var target = $(event.target),
		item = target.closest('.' + this._core.settings.itemClass),
		video = this._videos[item.attr('data-video')],
		width = video.width || '100%',
		height = video.height || this._core.$stage.height(),
		html;

	if (this._playing) {
		return;
	}

	this._core.enter('playing');
	this._core.trigger('play', null, 'video');

	item = this._core.items(this._core.relative(item.index()));

	this._core.reset(item.index());

	if (video.type === 'youtube') {
		html = '<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' +
			video.id + '?autoplay=1&rel=0&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
	} else if (video.type === 'vimeo') {
		html = '<iframe src="//player.vimeo.com/video/' + video.id +
			'?autoplay=1" width="' + width + '" height="' + height +
			'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
	} else if (video.type === 'vzaar') {
		html = '<iframe frameborder="0"' + 'height="' + height + '"' + 'width="' + width +
			'" allowfullscreen mozallowfullscreen webkitAllowFullScreen ' +
			'src="//view.vzaar.com/' + video.id + '/player?autoplay=true"></iframe>';
	}

	$('<div class="owl-video-frame">' + html + '</div>').insertAfter(item.find('.owl-video'));

	this._playing = item.addClass('owl-video-playing');
};

Video.prototype.isInFullScreen = function() {
	var element = document.fullscreenElement || document.mozFullScreenElement ||
			document.webkitFullscreenElement;

	return element && $(element).parent().hasClass('owl-video-frame');
};


(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay timeout.
		 * @type {Timeout}
		 */
		this._timeout = null;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = false;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				} else if (e.namespace && e.property.name === 'position') {
					//console.log('play?', e);
					if (this._core.settings.autoplay) {
						this._setAutoPlayInterval();
					}
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function(e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this),
			'touchstart.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'touchend.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	})