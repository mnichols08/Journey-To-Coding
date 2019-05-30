import imagesLoaded from 'imagesloaded';
import timeAgo from '../utils/timeAgo';

export default class Instagram {

  constructor() {
    this.$instagramContainer = $('.instagram-photo-container');
    this.accessToken = '';
    this._init();
  }

  _init() {
    this._generateMarkup();
    this._populateMarkup();
  }

  _generateMarkup() {
    const $columns = `<div class="instagram-column">
                      <a class="instagram-photo photo-0" target="_blank"></a>
                      <a class="instagram-photo photo-1" target="_blank"></a>
                      <a class="instagram-photo photo-2" target="_blank"></a>
                    </div>
                    <div class="instagram-column">
                      <a class="instagram-photo photo-3" target="_blank"></a>
                      <a class="instagram-photo photo-4" target="_blank"></a>
                      <a class="instagram-photo photo-5" target="_blank"></a>
                    </div>`;

    this.$instagramContainer.html($columns);
  }

  _populateMarkup() {
    instagram({
      imageCount: 6,
      accessToken: this.accessToken,
      filterByTag: false,
      render: false,
    }).done((json) => {
      // loop through empty containers and add our markup
      for (const index in json) {
        const $image = this.$instagramContainer.find(`.photo-${index}`);
        this._renderTile($image, json[index]);
      }

      // show everything once we're all loaded up
      imagesLoaded(this.$instagramContainer, () => {
        this.$instagramContainer.removeClass('loading');
      });

    }).fail(() => {
      this.$instagramContainer
        .removeClass('loading')
        .text('Sorry, it seems something has gone wrong with the instagram feed.');
    });
  }

  _renderTile($el, photoJSON) {
    // is there a caption?
    const caption = photoJSON.caption ? photoJSON.caption.text : `photo by @${photoJSON.user.username}`;
    // our wrapper element
    $el.attr('href', photoJSON.link);
    // the image
    const $img = $(`<img src="${photoJSON.images.standard_resolution.url}" alt="${caption}">`);
    $el.append($img);

    // add caption and timestamp
    if (photoJSON.caption) {
      const $caption = $('<div class="caption">').html(`<div class="text">${photoJSON.caption.text}</div>`);
      const timestamp = new Date(parseInt(photoJSON.created_time) * 1000);
      $caption.append($(`<div class="timestamp">${timeAgo(timestamp)} ago</div>`));
      $el.append($caption);
    }
  }
}
