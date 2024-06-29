import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = path.dirname(__filename); 
const summarizeVideo = (videoUrl) => {
  return new Promise((resolve, reject) => {
    const scriptRelativePath = path.join(__dirname, '..', 'summarize_video.py');
    const scriptPath = path.resolve(scriptRelativePath); // Resolve to an absolute path

    const pythonProcess = spawn('python', [scriptPath, videoUrl]);
    console.log(scriptPath);
    let summary = '';

    pythonProcess.stdout.on('data', (data) => {
      summary += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(summary.trim());
      } else {
        reject(`Python process exited with code ${code}`);
      }
    });

    pythonProcess.on('error', (err) => {
      reject(err);
    });
  });
};

export default summarizeVideo;

