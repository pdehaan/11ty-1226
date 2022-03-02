const inspect = require("node:util").inspect;

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("inspect", function (value) {
    return inspect(value, { sorted: true });
  });

  eleventyConfig.addFilter("date_format", function (value) {
    return new Date(value).toLocaleDateString(["en-US"]);
  });

  eleventyConfig.addCollection("page", function (collectionApi) {
    // Get all pages with the tag "page".
    const p = collectionApi.getFilteredByTag("page");
    return p.sort((a, b) => {
      // `_.data.p.date` if it's via pagination, otherwise `_.date`.
      a.date = a.data.p?.date ? new Date(a.data.p.date) : a.date;
      b.date = b.data.p?.date ? new Date(b.data.p.date) : b.date;
      // Return pages sorted by date, in descending order.
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: "src",
      output: "www",
    },
  };
};
