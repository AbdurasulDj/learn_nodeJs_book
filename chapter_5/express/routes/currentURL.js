import { Router } from "express";

export const currentURL = Router();

currentURL.get('/:url/*', (req, res, next) => {
  // console.log(req.params);
  res.render('currentURL', { url:  `${req.params.url}/${req.params[0]}` });
})