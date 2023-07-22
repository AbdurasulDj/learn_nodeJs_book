import { Router } from "express";

export const currentURL = Router();

currentURL.get('/:url', (req, res, next) => {
  // const url = req.originalUrl;
  res.render('currentURL', { url:  `${req.params.url}` });
})