import { BlogAppAngularPage } from './app.po';

describe('blog-app-angular App', function() {
  let page: BlogAppAngularPage;

  beforeEach(() => {
    page = new BlogAppAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
