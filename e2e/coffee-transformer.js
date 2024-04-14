module.exports = {
  process(src, path) {
    const coffee = require('coffeescript');
    const js = coffee.compile(src, {
      bare: true,
      inline: true,
    });

    return {
      code: js,
    };
  },
};
