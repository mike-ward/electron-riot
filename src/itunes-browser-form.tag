<itunes-browser-form>
  <form class="pure-form" onsubmit="{onSearch}">
    <label>Search for</label>
    <input name="artist" type="text" placeholder="Required" class="pure-input-rounded" required>

    <label>Media Type</label>
    <select name="media">
      <option value="all" selected>All</option>
      <option value="musicVideo">Video</option>
      <option value="movie">Movie</option>
      <option value="music">Music</option>
      <option value="podcast">Podcast</option>
      <option value="tvShow">TV Show</option>
    </select>

    <button class="pure-button pure-button-primary">Search</button>

    <span class="pull-right">
      <label>Sort by</label>
      <select name="sortby" onchange="{onFilter}">
        <option value="artistName">Artist</option>
        <option value="trackName">Track</option>
        <option value="collectionName">Collection</option>
        <option value="kind">Type</option>
      </select>
      
      <label>Filter by</label>
      <input name="filterby" type="text" oninput="{onFilter}">
    </span>
  </form>

  <script>
    'use strict';
    this.onSearch = e => this.opts.query.trigger('changed', this.artist.value, this.media.value);
    this.onFilter = e => this.opts.filters.trigger('changed', this.filterby.value, this.sortby.value);
  </script>
</itunes-browser-form>