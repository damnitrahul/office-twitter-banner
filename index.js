// @ts-check
const fs = require("fs");
const path = require("path");
const jokesData = require("./quotes.json");
const Handlebars = require("handlebars");
const {
  random,
  generateImage,
  readBase64File,
  updateProfileBanner,
} = require("./utils");

const TEMPLATE_FILE = "./template/index.html";
const TEMPLATE_OUT_FILE = `file:${path.join(__dirname, "./template/out.html")}`;
const OUT_FILE = "./out.png";

(async function () {
  const randomJoke = jokesData.data[random(0, jokesData.data.length - 1)];

  const template = Handlebars.compile(
    fs.readFileSync(TEMPLATE_FILE, { encoding: "utf-8" })
  );
  fs.writeFileSync(
    "./template/out.html",
    template({
      quote: randomJoke.quote,
      by: randomJoke.by,
      img: randomJoke.by.toLowerCase().split(" ")[0],
    })
  );
  await generateImage(TEMPLATE_OUT_FILE);
  const data = readBase64File(OUT_FILE);
  await updateProfileBanner(data);
})();
