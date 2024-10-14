# Wojibooru

Szurubooru is an image board engine inspired by services such as Danbooru,
Gelbooru and Moebooru dedicated for small and medium communities. 

Wojibooru is a forked Szurubooru with some hacks thrown in to make it ideal for hosting a 
*just images* imagebooru like [WojakDB](https://wojakdb.com). 

The main features added/removed are marked [! Added] or [! Removed] below:

## Features

- Post content: images (JPG, PNG, GIF, animated GIF), [! Removed: videos (MP4, WEBM), Flash animations] 
- Ability to retrieve web video content using [yt-dlp](https://github.com/yt-dlp/yt-dlp) [! Removed]
- Post comments
- Post notes / annotations, including arbitrary polygons
- Rich JSON REST API ([see documentation](doc/API.md))
- Token based authentication for clients
- Rich search system
- Rich privilege system
- Autocomplete in search and while editing tags
- Tag categories
- Tag suggestions
- Tag implications (adding a tag automatically adds another)
- Tag aliases
- Pools and pool categories [! Removed, well actually hidden from the front end]
- Duplicate detection
- Post rating and favoriting; comment rating
- Polished UI
- Browser configurable endless paging
- Browser configurable backdrop grid for transparent images
- Post descriptions [! Added]
- Updated Font Awesome icons to 6.6.0 [! Added]
- Added "copy image" button on desktop, hidden on mobiles [! Added]
- Added more prominant Download button [! Added]
- Added easier access to favorites [! Added]
- Redesigned the Tags page to show descriptions [! Added]

## Installation

It is recommended that you use Docker for deployment.
[See installation instructions.](doc/INSTALL.md)

More installation resources, as well as related projects can be found on the
[GitHub project Wiki](https://github.com/rr-/szurubooru/wiki)

## Screenshots

Post list:

![20160908_180032_fsk](https://wojakdb.com/data/img/wojakdb_screenshot_posts.jpg)

Post view:

![20160908_180429_lmp](https://wojakdb.com/data/img/wojakdb_screenshot_post.jpg)

## License

[GPLv3](LICENSE.md).
