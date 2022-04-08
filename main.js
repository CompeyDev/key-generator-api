const express = require('express');
const app = express();
const port = '8000';
const fs = require('fs');
const Path = require('path');

const makeid = (len) => {
  return [...Array(len)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join('');
};

app.get('/generate/:id', (req, res) => {
  const path = Path.join(__dirname, `${req.params.id}.json`);
  const result = fs.existsSync(path);

  if (result === true) {
    res.sendFile(`./users/${req.params.id}.json`, {
      root: Path.join(__dirname),
    });
  } else if (result === false) {
    const store = { id: `${req.params.id}`, key: `${makeid(100)}` };
    const saveJson = JSON.stringify(store, null, 4);

    fs.writeFile(`./users/${req.params.id}.json`, saveJson, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
      res.sendFile(`./users/${req.params.id}.json`, {
        root: Path.join(__dirname),
      });
    });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
