import  summarizeVideo  from '../services/youtubeService.js';
import dbClient from '../../dbConfig.js';

// const getVideoSummary = async (req, res,next) => {
//   try {
//     const { weburl} = req.query;
//     const videoUrl=weburl;
//     console.log(videoUrl);
//     // Summarize video
//     const summary = await summarizeVideo(videoUrl);
//     console.log(summary);
//     // Save video summary to database
//     const videoId = videoUrl.split('v=')[1].split('&')[0];
//     const query = {
//       text: 'INSERT INTO videos(videoId, url, summary) VALUES($1, $2, $3) ON CONFLICT (videoId) DO UPDATE SET summary = EXCLUDED.summary RETURNING *',
//       values: [videoId, videoUrl, summary],
//     };
//     const result = await dbClient.query(query);
//     if (result.rows.length > 0) {
//       let ans = result.rows[0].summary;
//       let startIndex = ans.indexOf('Summary of the video:');
//       ans = ans.substring(startIndex);
//       req.videoSummary = {
//         summary: ans,
//       };
//       next(); 
//     } else {
//       res.status(404).json({ error: 'No data found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getVideoSummary = async (req, res, next) => {
  try {
    const { weburl } = req.query;
    const videoUrl = weburl;
    console.log(videoUrl);

    const videoId = videoUrl.split('v=')[1].split('&')[0];

    // Check if summary already exists in the database
    const checkQuery = {
      text: 'SELECT summary FROM videos WHERE videoId = $1',
      values: [videoId],
    };

    const checkResult = await dbClient.query(checkQuery);

    if (checkResult.rows.length > 0) {
      // If summary exists, return it
      let ans = checkResult.rows[0].summary;
      let startIndex = ans.indexOf('Summary of the video:');
      ans = ans.substring(startIndex);
      req.videoSummary = {
        summary: ans,
      };
      return next();
    }

    // If summary does not exist, summarize the video
    const summary = await summarizeVideo(videoUrl);
    console.log(summary);

    // Save video summary to database
    const query = {
      text: 'INSERT INTO videos(videoId, url, summary) VALUES($1, $2, $3) ON CONFLICT (videoId) DO UPDATE SET summary = EXCLUDED.summary RETURNING *',
      values: [videoId, videoUrl, summary],
    };
    const result = await dbClient.query(query);

    if (result.rows.length > 0) {
      let ans = result.rows[0].summary;
      let startIndex = ans.indexOf('Summary of the video:');
      ans = ans.substring(startIndex);
      req.videoSummary = {
        summary: ans,
      };
      next();
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default getVideoSummary;

