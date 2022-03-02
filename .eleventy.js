const inspect = require("node:util").inspect;

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("inspect", function (value) {
    return inspect(value, { sorted: true });
  });

  eleventyConfig.addFilter("date_format", function (value) {
    return new Date(value).toLocaleDateString(["en-US"]);
  });

  eleventyConfig.addCollection("page", function (collectionApi) {
    const p = collectionApi.getFilteredByTag("page");
    return p.sort((a, b) => {
      console.log(a.data.date, a.data.p.date);
      a.date = new Date(a.data.p.date);
      b.date = new Date(b.data.p.date);
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
