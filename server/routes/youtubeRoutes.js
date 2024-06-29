import express from 'express';
import  getVideoSummary from '../controller/youtubeController.js';

const router = express.Router();


router.get('/youtube', getVideoSummary,(req, res,next) => {
    if (req.videoSummary) {
        res.locals.summary = req.videoSummary.summary;
        next();
      } else {
        res.status(404).json({ error: 'No summary found' });
      }
  });

export default router;
