# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

### [1.20.1] - 2019-03-07

### Added
- Support for CSRF protection added
- You can now use the basic features of Google Enhance Ecomm Analytics on your
  shop
- We've given the user the ability to edit options from the cart (fixes THEME-942)

### Changed
- Stencil Utils needed an update to support CSRF protection
- Added the ability to add to multiple wishlists on the product page
  (fixes THEME-898)

### Fixed
- Fancy product descriptions with lots of HTML were failing the google
  structured data test, we've fixed that so your google search results look
  good again!

### [1.20.0] - 2018-11-29

### Added
- Vaulted credit cards are now supported in Venture if you want them to be

### [1.19.3] - 2018-10-25

### Fixed
- The other filter is nice in faceted search, but only if you can use it like
  you want to. Now if you don't want all three items showing you don't have to
  have them showing and the other filter still works (fixes THEME-1683)
- There was a whoops in a recent price update that threw an error if you had a
  sales price and a default price which wasn't particularly useful, but now it's
  fixed

### [1.19.2] - 2018-10-18

### Fixed
- All the rating icons and modal x's went missing, we found them and put them
  back

### [1.19.1] - 2018-10-10

### Fixed
- The sales badge was showing up when it shouldn't have been sending out
  mixed signals which no one likes so we fixed it (fixes THEME-1682)

### Added
- Add support for Paypal smart buttons settings

### [1.19.0] - 2018-10-04

### Added
- Option for a product price label

### Fixed
- Product options now update correctly on page load again, we got a little
  carried away (fixes THEME-1680)

### [1.18.6] - 2018-09-27

### Changed
- Implemented new pricing structure, sale badges are now controlled by
  sale price and not the existence of a retail price.
- Changed "As low as" wording to price ranges for product options. It's more
  descriptive and works regardless of the default.

### Fixed
- Don't show a default price on quick-shop if there isn't one.

### Added
- Price label settings

### [1.18.5] - 2018-08-09

#### Added
- We added support for multiple shipping addresses to your theme, now if you
  want your shoppers can ship to more then one place in each transaction

### [1.18.4] - 2018-07-26

#### Fixed
- Custom carousel aspect ratios no longer break the carousel on mobile

### [1.18.3] - 2018-06-21

#### Fixed
- Title is now displayed when posting a product to pinterest(THEME-1290)
- Icons weren't loading in some cases when this theme was uploaded, we
  switched them to svgs so we no longer have that issue (THEME-1518)

### [1.18.2] - 2018-06-14

#### Fixed
- Non-required file upload options no longer block ATC on ios (THEME-1605)
- "Leave a review" emails now actually link to review form

### [1.18.1] - 2018-06-07

#### Changed
- All dependencies now point to GH. This should save some developers
  headaches

### [1.18.0] - 2018-05-31

#### Added
- You can use a newsletter summary provided in the control panel to tell users
  what your newsletter is all about and how you will use it. Now, Venture can
  display that summary for the reading pleasure of your shoppers

### [1.17.1] - 2018-05-24

#### Fixed
- JS file name case is important, that's why we just made sure how they are
  called matches how they were named


### [1.17.0] - 2018-05-10

#### Added
- We AMPed up the product pages, so now shoppers can also see them from their
  google searches

### [1.16.3] - 2018-04-19

#### Fixed
- Copyright script in AMP footer removed

### [1.16.2] - 2018-04-12

#### Fixed
- No longer show "shop by price" in sidebar if all products are in the same
price range

### [1.16.1] - 2018-03-29

#### Added
- Header and footer scripts are now accessible on the checkout and order
  confirmation pages

### [1.16.0] - 2018-03-22

#### Added
- Venture just caught up with Google AMP. Now if users find your category Pages
  through a Google search and your AMP settings are turned on in the control
  panel, they will be served up an AMP for faster browsing

### [1.15.2] - 2018-03-15

#### Fixed
- Carousel caption now aligns all the way to the left when it should.

### [1.15.1] - 2018-03-08

#### Fixed
- The error message on the cart got lost in translation. It's back from Japan
  though and will now give your customers helpful information

### [1.15.0] - 2018-03-01

#### Added
- GeoTrust seals can now be added through your theme settings, no more will you
  need to use the footer script area to display them

### [1.14.0] - 2018-02-15

#### Changed
- Update to webpack 3, you might not notice but it's more efficient

### [1.13.2] - 2018-02-01

#### Fixed
- Select labels were not updating correctly after the last update, now they are

### [1.13.1] - 2018-01-11

#### Fixed
- Account forms
  - Countries with no states no longer require state input
  - Forms with a required checkbox no longer force all checkboxes to be required
- Account address form layout so fields are not out of line
- State field required toggle, doesn't just toggle, it only toggles if it's supposed to depending on the country

#### Changed
- Added title to customized checkbox field to display consistently like other checkbox fields on the product page
- Move contact form errors to outside of contact form avoiding form layout breaking when an error occurs on forms with flexbox layouts
- The way we hide out-of-stock product options so they work on the Safari

#### Added
- Optimized for pixelpop in the features list


### [1.13.0] - 2017-11-22

#### Added
- package-lock.json file
- option to choose the aspect ratio of product images in grids

#### Fixed
 - no longer validate gift certificates on the frontend, allows for custom codes


### [1.12.6] - 2017-11-09

#### Added
- option to choose the aspect ratio of the carousel, as well as to have it
  respect image dimensions
- None is now a supported feature for non-required product options, no more
  refreshing the page if you change your mind

#### Fixed
- Updated a dependency(stencil-utils) so it doesn't potentially break product options


### [1.12.5] - 2017-10-05
#### Changed
- Cha cha cha cha changes from product options now only affect the product that
  is being viewed, it doesn't affect the related products (fixes THEME-1370)

#### Fixed
- Category results are confusing no more! The get the full list of all the
-  possible category results with the correct titles
- IE won't break your stuff any more, probably, at least we added code in to
  discourage that from happening


### [1.12.4] - 2017-09-13
#### Changed
- How many banners do you see? Well now it's one and it's random like the
  platform says it should be


### [1.12.3] - 2017-08-03
#### Changed
- Updated 'from' pricing text to match Cornerstone


### [1.12.2] - 2017-06-08

#### Changed
- Updated theme support link in config.json
- Cart line-items now switch to one per line if there are more than three, for
  better readability

#### Fixed
- Product form date field now displays year even if date range is within one
  year (fixes THEME-1331)


### [1.12.1] - 2017-06-01

#### Fixed
- Fixed show more facets button not working on facets with two words


### [1.12.0] - 2017-05-25

#### Added
- option to show all brands on one page
- Theme support for optimized checkout

### [1.11.4] - 2017-05-11

#### Fixed
- Fixed an issue where the "none" option was showing for product option lists
  when set to required (fixes THEME-1279)
- fixed an issue where the "sort by" dropdown wasn't showing the correct value
  in the search results
- product variation images now show up in a lightbox from within the quickshop

#### Changed
- Updated shared Stencil javascript libraries to their latest version
- Switched to an improved captcha (reCaptcha) in the product reviews form
#### Fixed
- Out of stock product options disable and hide properly in IE and Safari (fixes THEME-1229)


### [1.11.3] - 2017-05-04

#### Fixed
- Fixed an issue where the discounted price wasn't appearing in the mini cart'
- Fixed an issue where customers were getting an error after unsubscribing
  from a store newsletter (fixes THEME-1269)
- Fixed an issue where the discounted price wasn't appearing in the mini cart
- fixed an issue where customers were getting an error after unsubscribing from
  a store newsletter (fixes THEME-1269)


### [1.11.2] - 2017-04-26

#### Added
- Option to show all facets on search, brand, and category pages.


### [1.11.1] - 2017-04-20

#### Fixed
- fixed an issue where product lists weren't showing "none" by default on page
  load (fixes THEME-1267)


###[1.11.0] - 2017-03-09

#### Changed
 - updated header/nav settings

#### Added
 - option to hide copyright
 - option to hide pages in nav
 - option to show "home" link in nav


### [1.10.5] - 2017-03-02

#### Fixed
- Fixed an issue where the header links were positioning incorrectly when the
  logo was centered
- Fixed an issue where videos were sizing incorrectly on the product page


### [1.10.4] - 2017-02-23

#### Fixed
- Fixed an issue where cart-level discounts weren't showing up on the cart
  page (fixes THEME-1217)
- Fixed an issue where out-of-stock options were showing in the quickshop when
  set to be hidden (fixes THEME-1215)
- Name and email are no longer required in the review form
- Author name now shows as 'Unknown' if a review is submitted anonymously
  (fixes THEME-1214)
- Ensure scrolling the page with arrow keys functions as expected


### [1.10.3] - 2017-02-16

#### Fixed
- fixed an issue where quicksearch results weren't clickable in Firefox
- Shipping estimator now supports estimation by city

### [1.10.2] - 2017-02-09

#### Changed
- improvements to the captcha on the contact page

### [1.10.1] - 2017-01-26

#### Fixed
- fixed an issue where carousel images were showing up twice


### [1.10.0] - 2017-01-23

#### Fixed
- improvements to the webpack build system so local development works on
  Windows systems


### [1.5.0] - 2017-01-12

#### Changed
- Migrated the Javascript build system from JSPM/SystemJS to NPM/webpack

### [1.4.3] - 2016-12-15

#### Fixed
- fixed a possible vulnerability in how search terms are rendered on the search
  page (fixes THEME-1173)


### [1.4.2] - 2016-12-08

#### Fixed
- Fixed an issue where the mobile navigation wasn't positioning correctly
  when the meganav menu was enabled
- Fixed an issue where pagination was not working correctly in search results
- Fixed an issue where brand pagination was showing incorrect product counts

#### Changed
- Improvements to search results page when there are not results returned


### [1.4.1] - 2016-12-01

#### Added
- Added option to show Apple Pay in list of payment icons
- Added `lang` attribute to <html> tag


### [1.4.0] - 2016-11-10

#### Added
- Added support for Apple Pay

#### Fixed
- Fixed an issue where pagination wasn't working on the account orders page
- Fixed an issue where product customization checkboxes would cause an error
  when set to required
- Improved layout of account orders lists on narrow screens


### [1.3.2] - 2016-10-27

#### Fixed
- Fixed an issue where submitted reviews were showing the incorrect rating
  (fixes THEME_1150)

#### Changed
- minor improvements to the way currently-selected filters persist when using
  product filtering


### [1.3.1] - 2016-09-29

#### Fixed
- fixed an issue the gift certificate input would still show up in the cart when
  disabled (fixes THEME_1127)
- fixed an issue where product filtering was being reset when sorting was changed

### Changed
- removed many language strings that aren't being used in the templates


### [1.3.0] - 2016-09-15

#### Added
- Add pagination to Brands listings (fixes THEME_1047)

#### Fixed
- fixed an issue where the brands list in the footer wouldn't show up


### [1.2.3] - 2016-08-25

#### Fixed
- reviews throttle properly when throttler is enabled from the control panel
  (fixes THEME_1103)
- Fixed an issue where a product's star rating wasn't showing up when clicked
  while leaving a review (fixes THEME_1104)


### [1.2.2] - 2016-08-25

#### Changed
- Fixed an issue where the dropdown menus were aligning improperly when the
  logo was centered
- Improved layout of mega-nav menu: menu items configure into columns more
  intelligently
- Page now scrolls to top on pagination and faceted search change


### [1.2.1] - 2016-08-11

#### Added
- added "View All" links to lists in the sitemap if the list has more than 20
  items (fixes THEME_1092)


### [1.2.0] - 2016-08-04

#### Added
- Added expanded search results to search results page
- Added a live search functionality to the header search form


### [1.1.4] - 2016-08-04

#### Changed
- Fixed an issue where quickshop wasn't working in some versions of IE
- Added nofollow attributes to faceted search links for better performance


### [1.1.3] - 2016-07-28

#### Changed
- Fixed an issue where videos weren't showing on the product page


### [1.1.2] - 2016-07-21

#### Changed
- Added 'nofollow' attribute to external footer links


### [1.1.1] - 2016-07-07

#### Changed
- Ensure extended nav option is disabled by default
- fixed an issue where menu dropdowns weren't working with certain carousel
  slides

#### Added
- Added HTML classes to product details elements for better visibility control


### [1.1.0] - 2016-06-30

#### Added
- Option to display the logo in the center/right
- Option to use a mega-nav


### [1.0.14] - 2016-06-16

#### Changed
- improvements to google structured data on product page (fixes THEME-1049)


### [1.0.13] - 2016-06-09

#### Changed
- Changed language for star rating product filter to '& up' (fixes THEME-1032)
- fixed an issue where blog post rich text wasn't formatting correctly


### [1.0.12] - 2016-06-02

#### Changed
- Ensured entire carousel slide is clickable if URL is set but no button text
  is added (fixes THEME-1014)

#### Added
- Added a hover popup to product swatches where a pattern has been added
  (fixes THEME-1029)


### [1.0.11] - 2016-05-05

#### Changed
- fixed an issue with Braintree payments not handling user info correctly
  (fixes THEME-975)


### [1.0.10] - 2016-04-21

#### Added
- External RSS feeds show up properly when configured (fixes THEME-982)
- UPS rates surface properly in shipping estimator

#### Changed
- fixed an overlap conflict with the quick-cart dropdown and the account toolbar
  button
- the product page now scrolls itself to the error/success message on cart
  submit
- fix display of rating stars in individual ratings items
- fixed inaccurate pagination counts for shops with large catalogues
  (fixes THEME-978)
- fixed floated label issue with date input field


### [1.0.9] - 2016-04-07

#### Changed
- the 'Choose one...' option in product option select inputs is no longer
  selectable (fixes THEME-966)


### [1.0.8] - 2016-03-31

#### Changed
- updated shop credit to reflect new branding
- product quantity box hides correctly based on CP setting (fixes THEME-950)
- customer links hide properly if disabled from the cp (fixes THEME-951)


### [1.0.7] - 2016-03-22

#### Changed
- fixed an issue with the facebook like button not showing up (fixes THEME-932)


### [1.0.6] - 2016-03-14

#### Added
- functionality to disable/hide product options based on SKU inventory (fixes THEME-908)

### [1.0.5] - 2016-03-10

#### Added
- theme setting to toggle blog thumbnails in blog listings

#### Changed
- A customer's store credit displays in the account section
- better handling of gift certificates when only a single theme is enabled
- better handling of currency selector when only one currency is active


### [1.0.4] - 2016-03-03

#### Added
- bulk pricing block to product page (fixes THEME-926)
- `%%Syndicate%%` is properly replaced with rss feed lists

#### Changed
- layout improvements to header & menu in mobile
- pagination labelling only shows up if there is more than one page
- product compare functionality works after a filter has been run


### [1.0.3] - 2016-02-25

#### Changed
- checkout.css no longer 500s in production
- improved layout for login/signup/create-account pages on mobile
- improved layout for printable invoice
- 'print invoice' link now properly promps printer dialog in browser
- minor improvements to image sizing for better page weight in some instances


### [1.0.2] - 2016-02-19

#### Added
- Sitemap link in footer pages menu, sitemap template (fixes THEME-884, THEME-883)

#### Changed
- removed workaround for Crimson Text font-string bug: BC has fixed the bug on their end
- Improve currency selector and product sorter width layout to avoid cutoff text (fixes theme_872)
- Wishlist button visibility pulls properly from CP settings (fixes theme_881)
- product grid respects ratings visibility setting (fixes theme_873)
- product page better respects ratings visibility settings
- Wishlist button visibility pulls properly from CP settings


### [1.0.1] - 2016-01-24
- fix frontmatter bug on brand pages


### [1.0.0] - 2016-01-21

#### Added
- hover menu now works on touch-enabled desktop screens
- Theme setting for # of products per page
- Theme images for marketplace

#### Changed
- ensure primary-font string is quoted to avoid Crimson Text hex conversion bug
- more prominent buttons on cart-add success message
- update cart styles for different/new Paypal button
- alerts at top of product page get a little more space underneath


### [0.0.23] - 2016-01-20

#### Added
- nice transitions of captions between carousel slides

#### Changed
- improve way in which retina logos are handled
- missing images are showing up again
- copyright date is accurate (inserted with javascript)
- fixed border color on primary button hover
- minor improvements to product grid item layout
- "Shop" link shows up by default on dark & warm presets


### [0.0.22] - 2016-01-18

#### Added
- star ratings to product grids, optional with theme setting
- payment icons with theme editor setting

#### Changed
- product share links only show on full product page (no quickshop)
- positioning of release_date alert no longer borks out in quick shop
- improvements to cart button layout
- tabs don't jump anymore on click
- stopped linking blog index excerpts
- improvements to header cart link layout
- improvements to carousel: height, vertical centering, and properly pulling delay setting
- multiple small layout/type adjustments from design review
- Facet filters are now collapsible
- fix missing contact form submit button bug


### [0.0.21] - 2016-01-13

#### Added
- theme setting for retina logo (constrain image to max-height 50px)
- theme setting for carousel color
- theme setting for carousel heading font
- 'shop by price' shows up if faceted search is disabled
- shipping promo messages show up correctly on homepage and product page
- theme setting for adding hardcoded categories link to header menu
- social share icons on product page, new google+ icon
- product event date selection on product page
- product stock level disaply on product page

#### Changed
- carousel pagination only shows if there is more than one slide
- add file size & file type notes to file upload input
- label for selected rating facet now includes the word 'Stars' instead of just
  a number
- added missing lang error string to cart page context
- all theme settings are named consistently (snake case)
- higher-resolution blog post thumbnails
- multiple styling improvements from design review
- subcategory nav stays in category sidebar in all cases regardless of faceted
  search
- fixed doubled-up input text bug in create account page
- improvements to contact form (using bc-core version)
- improvements to preorder message box on product page
- proper min/max validation for product quantity
- ensure first product image is loaded before initializing slider


### [0.0.20] - 2016-01-04

#### Changed
- Fixed invalid quote symbol in config.json theme descriptions


### [0.0.19] - 2015-12-22

#### Added
- Different reviews system: theme setting only limits the first # visible, with a toggle to show all
- maintenance/hibernation pages from bc-core

#### Changed
- State/Country forms work on account pages
- improvements to product grid breakpoints (breaks to 1 col on mobile)
- empty cart icon sits in a more appealing place on mobile
- proper variant metadata & descriptions in config.json
- product sorting dropdown sits in a more appealing place on tablet


### [0.0.18] - 2015-12-21

#### Changed
- fixed layout big on compare page in Firefox (again)
- missing image placeholders show up on homepage
- homepage section headers are hidden if their sections are empty
- removed "disable" option from product reviews (should be disabled from CP)
- added captcha to product review modal
- improvements to pricing in account product grids
- account page JS now works as expected


### [0.0.17] - 2015-12-17

#### Added
- make icon font and icon font asset path production/cdn-friendly

### [0.0.16] - 2015-12-16

#### Added
- lots of extra yet important data to config.json
- ability to disable quickshop in theme editor
- "Sold Out" tags in product grids

#### Changed
- fixed broken gift certificate purchase page
- fixed broken compare page add-to-cart buttons
- fixed compare table not fitting its container in Firefox
- improvements to layout & spacing of currency selector & mobile menu


### [0.0.15] - 2015-12-16

#### Added
- Theme editor per-page settings work on home and product pages
- Account pages are back in action
- theme now supports bigcommerce app snippets
- 'Order Complete' page now exists

#### Changed
- fixed bug with carousel height on small screens
- footer credits are a tiny bit bigger


### [0.0.14] - 2015-12-10

#### Added
- link to preview option-set image appears if configured
- "call for price" feature works on frontend as expected

#### Changed
- improvements to product availability logic
- image fallback for missing product images
- fixed 500 errors on category and compare pages
- share buttons work again on single blog pages
- improvements to font/heaing sizing vis a vis the theme editor
- disable product options ajax if the product is unavailable


### [0.0.13] - 2015-12-07

#### Added
- Theme setting for footer credits

#### Changed
- all font sizes change proportionately based on setting
- Blog has a page title
- fixed issue with image heights on mobile product page
- category header image sticks around after ajax pagination
- phone number no longer required on contact form


### [0.0.12] - 2015-11-27

#### Added
- Theme editor! Variations! Settings!
- new validation library [Validetta](https://github.com/PixelUnion/validetta)
- category pages show an image if one is applied
- pagination on blog pages


#### Changed
- quickshop spinner stays behind modal
- improvements to menu cart link
- pagination works when product filtering is disabled
- product preorder text shows up if applicable
- product cart-adding alerts look as they should
- blog tag archive page has a title


### [0.0.11] - 2015-09-06

#### Added
- Schema.org tags for products, blog posts & breadcrumbs

#### Changed
- removed extraneous BC footer scripts
- fixed cart-empty message always showing


### [0.0.10] - 2015-09-30

#### Added
- Product image zoom
- 'Sale' tags in product grids
- 'no products' message if collection is empty

#### Changed
- loading spinners should work in Firefox
- removed spinner on cart footer when whole cart is being refreshed
- product option real-time updates work a bit nicer
- progress button spinner is svg-free
- facted-clicking works in Firefox
- product options checkboxes have a 'required' asterisk if required
- pagination only shows if there are products
- Recent Posts are now full-width if excerpt is short
- Improved styling of shipping container


### [0.0.9] - 2015-09-25

#### Added
- Newsletter submit functionality
- Gift card purchasing and applying
- "Pick Product" options surfacing properly
- additional checkout buttons (Paypal)

#### Changed
- cart-table quantity input now fits three digits
- compare tab popup full-width on mobile
- ellipses show conditionally on various truncated text blocks
- 'required' asterisks are showing again on product options
- improved handling of global discount rules in cart
- remove endless spinning on cart if giftcard fails
- proper validation of gift card terms acceptance
- spacing tweak for gift card purchase buttons
- better positioning of out of stock message
- footer social media links open in new window
- carousel button text properly rendering entities


### [0.0.8] - 2015-09-22

#### Added
- inline form validation for review modal
- Promo codes to cart
- social media links in footer
- non-dummy share links on blog posts

#### Changed
- fix edge case of rte area with lots of non-breaking spaces
- improvements to currency selector on mobile
- review scores show what they're out of
- collection sorting hover fixed in FF
- search results sidebar text reflects existence of filters
- better handling of carousel captions across screen sized



### [0.0.7] - 2015-09-18

#### Added
- products now have tabs with responsive videos
- Gift wrapping options available from cart page


#### Changed
- product option inputs get cleared on successful cart add
- mobile menu slideys are scrollable on mobile
- quickshop button stays hidden on touch devices
- content won't overlap of if no carousel slides
- ellipsis on post excerpts, blog posts fixed on homepage
- improvements to product-page rating block
- pagination looks better for single-page cases
- less verbose username text
- account / auth pages updated with changes from repo (still not beautiful)
- fix redeclared variables that were somehow not throwing errors before
- small fixes to alerts, swipe-fade, babel versioning



### [0.0.6] - 2015-09-11

#### Added
- Brand label on product pages
- Product Configurable Fields
- Shipping Calculator

#### Changed
- better handling of longer menus
- product page images shows properly pre-javascript
- breadcrumbs are handled much nicer across all pages (no dupes on product page)
- cart items are clickable
- quickshop button only shows up when javascript is enabled
- fixed broken dismiss button on add-to-cart feedback alert box
- fixed wonky layout of quickshop columns
- individual cart item prices update on quantity update, better handling of
  in-progress cart page updates
- shipping cost displays properly if no shipping is entered



### [0.0.5] - 2015-08-21

#### Added
- Auth pages! Log in and out!
- Account Pages!
- Promo banners
- Breadcrumbs on product page

#### Changed
- minor css improvements to quickshop
- proper truncating for quickshop descriptions
- blog posts now show proper excerpts



### [0.0.4] - 2015-08-19

#### Added
- default styles for WYSIWYG areas
- selected product options now list in quick cart and on cart page
- Navigation menu supports four tiers of links
- Products will show retail discounts if applicable
- Products will show both tax and non-tax prices if setting is applied
- footer is now responsive

#### Changed
- Add-to-cart errors surface properly now
- subsequent dismissed messages aren't broken (i.e. error and then success)
- number input isn't extremely wide and allows decimals
- classname improvements to product options
- fixed bug with mobile quickcart not closing after item removal
- fixed text being cut off in collection sort & currencty select inputs
- fixed an issue with search icon overflowing in Safari
- empty blog images don't take up space in single-column blog layout
- Contact Us page shouldn't submit without validating anymore
- carousel will have height even if javascript hasn't loaded



### [0.0.3] - 2015-08-13

#### Added
- Compare Page grid
- utils method to allow for addition of single (optionless) product to cart
- Brand Index page and single brand pages

#### Changed
- better handling of relative dropdown widths
- fixed improper rendering of html entities in compare item summary
- improvements to two dropdowns (collection sorting and currency selector)
- product grid images are clickable, better handling of grid item hovering
- updated pagination to work with different stencil data, added case for
  single-page results
- better handling of dynamic emptying of cart



### [0.0.2] - 2015-08-11

#### Added
- Contact Page with validation
- Product image thumbnails are now along the bottom
- Added UI for adding & removing items from compare (compare page still WIP)

#### Changed
- fixed broken quantity update on cart page
- 'checkout' / 'check out' consistency
- currently active search is now placeholder rather than value
- current sort method persists when faceted search is off
- carousel button won't show up if no text is set
- carousel button is actually clickable
- styled contact form success message
- styled contact form captcha
- blog feed & single blog-post thumbnails display properly



### [0.0.1] - 2015-08-06

#### Added
Everything: Inital release for QA.
