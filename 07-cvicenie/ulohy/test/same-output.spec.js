const assert = require("assert");

// tested library
const lsr = require("../src/ls-promises.js");
const asr = require("../src/ls-async.js")

describe("ls-promises.js  and ls-async returns same output",  function() {
  it("Should give same results", function() {
    asr(".").then((expected) => {
      return lsr(".")
        .then((files) => {
          assert.deepStrictEqual(files, expected);
        })

    });
  });

  
});
