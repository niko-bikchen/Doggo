const sitemap = require("nextjs-sitemap-generator");
const fs = require("fs");


sitemap({
    baseUrl: "https://doggo.co.ua",
    pagesDirectory: __dirname + "/out",
    targetDirectory: __dirname+"/out",
    ignoredExtensions: ["js", "map"],
    ignoredPaths: ["[fallback]"],
});
