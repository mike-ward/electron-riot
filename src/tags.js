riot.tag2('itunes-browser-form', '<form class="pure-form" onsubmit="{onSearch}"> <label>Search for</label> <input name="artist" type="text" placeholder="Required" class="pure-input-rounded" required> <label>Media Type</label> <select name="media"> <option value="all" selected>All</option> <option value="musicVideo">Video</option> <option value="movie">Movie</option> <option value="music">Music</option> <option value="podcast">Podcast</option> <option value="tvShow">TV Show</option> </select> <button class="pure-button pure-button-primary">Search</button> <span class="pull-right"> <label>Sort by</label> <select name="sortby" onchange="{onFilter}"> <option value="artistName">Artist</option> <option value="trackName">Track</option> <option value="collectionName">Collection</option> <option value="kind">Type</option> </select> <label>Filter by</label> <input name="filterby" type="text" oninput="{onFilter}"> </span> </form>', '', '', function(opts) {
    'use strict';
    this.onSearch = e => this.opts.query.trigger('changed', this.artist.value, this.media.value);
    this.onFilter = e => this.opts.filters.trigger('changed', this.filterby.value, this.sortby.value);
}, '{ }');
riot.tag2('itunes-browser-list', '<table show="{mediaItems.resultCount}" class="pure-table"> <thead> <tr> <th></th> <th>Cover</th> <th>Track</th> <th>Type</th> <th>Artist</th> <th>Collection</th> <th>Track</th> <th>Collection</th> </tr> </thead> <tbody> <tr each="{filter(mediaItems)}"> <td><button onclick="{play}" class="pure-button" __disabled="{!previewUrl}">►</button></td> <td><img riot-src="{artworkUrl60}"></td> <td>{trackName || collectionName}</td> <td>{kind}</td> <td>{artistName}</td> <td>{collectionName}</td> <td>{trackPrice}</td> <td>{collectionPrice}</td> </tr> </tbody> </table>', '', '', function(opts) {
    'use strict';
    this.mediaItems = [];
    this.filterby = '';
    this.sortby = 'artistName';

    this.play = e => this.opts.track.trigger('changed', e && e.item);

    this.opts.results.on('changed', items => {
      this.play(null);
      this.update({mediaItems: items});
    })

    this.opts.filters.on('changed', (fb, sb) => this.update({filterby: fb, sortby: sb}));

    this.filter = items => {
      let filterOn = (field, text) => r => r[field] && r[field].toLowerCase().includes(text);
      let sortOn = field => (l, r) => l[field] ? l[field].localeCompare(r[field]) : 0;

      return items
        .results
        .filter(filterOn(this.sortby, this.filterby.toLowerCase()))
        .sort(sortOn(this.sortby));
      }
}, '{ }');
riot.tag2('itunes-browser-player', '<div show="{media}" class="popupPlayer"> <div> <button onclick="{close}" class="pure-button pure-button-xsmall pull-right">x</button> <div>{media.trackName}</div> <small>by&nbsp;<cite>{media.artistName}</cite></small> </div> <video name="player" type="video/mp4" width="320px" height="240px"> </div>', 'itunes-browser-player .popupPlayer,[riot-tag="itunes-browser-player"] .popupPlayer { z-index: 10; position: fixed; top: 50%; left: 50%; margin-left: -160px; margin-top: -150px; width: 360px; border: solid 1px #bbb; padding: 20px; background-color: white; } itunes-browser-player .pull-right,[riot-tag="itunes-browser-player"] .pull-right { float: right; }', '', function(opts) {
    'use-strict';
    this.opts.media.on('changed', media => {
      this.close();
      this.media = media;
      this.play(this.media && this.media.previewUrl);
      this.update();
    })

    this.play = src => {
        this.player.src = src;
        this.player.load();
        this.player.play();
    }

    this.close = e => {
        this.player.pause();
        this.media = null;
    }
}, '{ }');
riot.tag2('itunes-browser', '<itunes-browser-form query="{query}" filters="{filters}"></itunes-browser-form> <hr> <itunes-browser-list results="{results}" filters="{filters}" track="{track}"></itunes-browser-list> <itunes-browser-player media="{track}"></itunes-browser-player>', '', '', function(opts) {
    'use strict';
    this.query = riot.observable();
    this.filters = riot.observable();
    this.results = riot.observable();
    this.track = riot.observable();

    this.query.on('changed', (term, media) =>
      jsonp({
        url: 'https://itunes.apple.com/search',
        data: { term: term, media: media },
        success: data => this.results.trigger('changed', data),
        error: err => alert(err)
      }));
}, '{ }');