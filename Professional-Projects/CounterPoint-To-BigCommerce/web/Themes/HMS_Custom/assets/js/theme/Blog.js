import PageManager from '../PageManager';
import Pagination from './global/Pagination'

export default class Blog extends PageManager {
  constructor() {
    super();
  }

  loaded(next) {
    const blogPostsPerPage = this.context.blogPostsPerPage;

    const requestOptionsContent = {
      config: {
        blog: {
          posts: {
            limit: blogPostsPerPage,
          },
        },
      },
      template: 'blog/blog-index',
    };

    const options = {
      blocker: '.collection-progress-overlay',
      bodyClass: 'ajax-progress',
    };

    new Pagination(requestOptionsContent, options, (content) => {
      $('.blog-index').html(content);
    });

    next();
  }
}
