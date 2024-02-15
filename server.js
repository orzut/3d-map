const path = require('path');
const express = require('express');

const app = express();

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.json())

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

const init = async () => {
    try {
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`listening on port ${port}`));
    } catch (ex) {
      console.log(ex);
    }
  };
  
  init();