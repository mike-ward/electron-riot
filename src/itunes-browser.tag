<itunes-browser>
  <itunes-browser-form query="{query}" filters="{filters}" />
  <hr>
  <itunes-browser-list results="{results}" filters="{filters}" track="{track}" />
  <itunes-browser-player media="{track}" />

  <script>
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
  </script>
</itunes-browser>