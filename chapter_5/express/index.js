import express from 'express';
import compression from 'compression'

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

import { helloRouter } from './routes/hello.js';
import { currentURL } from './routes/currentURL.js';

const
  __dirname = dirname(fileURLToPath( import.meta.url )) + sep,
  cfg = {
    port: process.env.PORT || 3000,
    dir: {
      root: __dirname,
      static: __dirname + "static" + sep,
      notFound: __dirname + "static" + sep + 'notFound.html',
      views: __dirname + "views" + sep,
      secondHome: __dirname + "secondStatic" + sep,
    }
  };

console.dir(cfg, {depth: null, color: true});

const app = express();

// do not identify Express
app.disable('x-powered-by');

// // use EJS templates
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views );

// HTTP compression
app.use( compression() );

// serve static assets
app.use(express.static( cfg.dir.static ));

app.use('/secondhome', express.static( cfg.dir.secondHome ))

// serve params from hello path
app.use('/hello', helloRouter)

// serve url path
app.use('/url', currentURL)


// 404 page
app.use( (req, res) => {
  console.dir(req.originalUrl);
  res.status(404).render('message', { title: 'Oups! Page not Found (((...'})
})

app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});

export { app, cfg}