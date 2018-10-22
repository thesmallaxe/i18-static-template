/**
 * Define variables for gulpfile.
 *
 * Kudos to https://github.com/robwise for the code and the lovely use of
 * whitespace.
 */

var paths = {};

// Directory locations.
paths.gathercontentDir      = '_gathercontent';      // GatherContent files.
paths.gathercontentFinalDir = '_data/gathercontent'; // GatherContent final files.
paths.assetsDir             = '_assets/';            // The files Gulp will handle.
paths.jekyllDir             = '';                    // The files Jekyll will handle.
paths.jekyllAssetsDir       = 'assets/';             // The asset files Jekyll will handle.
paths.siteDir               = '_site/';              // The resulting static site.
paths.siteAssetsDir         = '_site/assets/';       // The resulting static site's assets.
paths.adminDir              = 'admin';               // Netlify admin directory.

// Folder naming conventions.
paths.postsFolderName  = '_posts';
paths.imageFolderName  = 'img';
paths.iconsFolderName  = 'icons';
paths.scriptFolderName = 'js';
paths.stylesFolderName = 'styles';
paths.fontFolderName   = 'fonts';

// Asset files locations.
paths.sassFiles   = paths.assetsDir + paths.stylesFolderName;
paths.jsFiles     = paths.assetsDir + paths.scriptFolderName;
paths.imageFiles  = paths.assetsDir + paths.imageFolderName;
paths.iconFiles   = paths.assetsDir + paths.iconsFolderName;
paths.fontFiles   = paths.assetsDir + paths.fontFolderName;

// Jekyll files locations.
paths.jekyllPostFiles  = paths.jekyllDir       + paths.postsFolderName;
paths.jekyllCssFiles   = paths.jekyllAssetsDir + paths.stylesFolderName;
paths.jekyllJsFiles    = paths.jekyllAssetsDir + paths.scriptFolderName;
paths.jekyllImageFiles = paths.jekyllAssetsDir + paths.imageFolderName;
paths.jekyllFontFiles  = paths.jekyllAssetsDir + paths.fontFolderName;

// Site files locations.
paths.siteCssFiles   = paths.siteAssetsDir + paths.stylesFolderName;
paths.siteJsFiles    = paths.siteAssetsDir + paths.scriptFolderName;
paths.siteImageFiles = paths.siteAssetsDir + paths.imageFolderName;
paths.siteFontFiles  = paths.siteAssetsDir + paths.fontFolderName;

module.exports = paths;
