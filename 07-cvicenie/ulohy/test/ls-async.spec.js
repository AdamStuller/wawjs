const assert = require("assert");

// tested library
const lsr = require("../src/ls-async.js");

describe("test ls-async.js", function() {

<<<<<<< HEAD
  const expected = ['ls-async.js', 'ls-promises.js', 'ls-async.spec.js', 'ls-pomises.spec.js', 'same-output.spec.js'];
  
=======
  const expected = ['ls-async.js', 'ls-promises.js', 'ls-async.spec.js', 'ls-pomises.spec.js'];

>>>>>>> a470c3efde5ae31cb529335cac2c29fbc4c87a89
  it("", async function() {

    let files = await lsr(".");
    assert.deepStrictEqual(files, expected);

  });
  it("eh", function() {
    return lsr(666)
      .then(() => {
        throw Error("shell fail")
      })
      .catch((ex) => assert(ex instanceof TypeError))

  });

});