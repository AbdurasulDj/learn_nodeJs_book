import express from 'express';
import compression from 'compression'

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

const
  __dirname = dirname(fileURLToPath( import.meta.url )) + sep,
  cfg = {
    port: process.env.PORT || 3000,
    dir: {
      root: __dirname,
      static: __dirname + "static" + sep,
      notFound: __dirname + "static" + sep + 'notFound.html',
      views: __dirname + "views" + sep
    }
  };

console.dir(cfg, {depth: null, color: true});

const app = express();

// do not identify Express
app.disable('x-powered-by');

// // use EJS templates
// app.set('view engine', 'ejs');
// app.set('views', cfg.dir.views );

// log to console every req
app.use( (req, res, next) => {
  console.log(req.url);
  next();
})

// HTTP compression
app.use( compression() );

// serve static pages
app.use(express.static( cfg.dir.static ));

// serve /abdurasul response
app.get("/abdurasul", (req, res) => {
  res.send("Hello, Abdurasul!");
});

// 404 not found
app.use( (req, res) => {
  res.status(404).render(cfg.dir.notFound ,{title: 'Oups! Page not found'} )
})

app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});

export { app, cfg}