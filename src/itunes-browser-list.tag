<itunes-browser-list>
  <table show="{mediaItems.resultCount}" class="pure-table">
    <thead>
      <tr>
        <th></th>
        <th>Cover</th>
        <th>Track</th>
        <th>Type</th>
        <th>Artist</th>
        <th>Collection</th>
        <th>Track</th>
        <th>Collection</th>
      </tr>
    </thead>
    <tbody>
      <tr each="{filter(mediaItems)}">
        <td><button onclick="{play}" class="pure-button" disabled="{!previewUrl}">►</button></td>
        <td><img src="{artworkUrl60}" /></td>
        <td>{trackName || collectionName}</td>
        <td>{kind}</td>
        <td>{artistName}</td>
        <td>{collectionName}</td>
        <td>{trackPrice}</td>
        <td>{collectionPrice}</td>
      </tr>
    </tbody>
  </table>
  
  <script>
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
  </script>
</itunes-browser-list>