import sys
import time
import requests
from youtube_transcript_api import YouTubeTranscriptApi

def fetch_transcript(video_id):
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([t['text'] for t in transcript_list])
        return transcript
    except Exception as e:
        print(f"Error fetching transcript: {e}")
        return None

def summarize_text_batch(text_batch):
    url = "http://127.0.0.1:8010/summarize"
    summaries = []
    for text in text_batch:
        try:
            response = requests.post(url, json={"text": text})
            if response.status_code == 200:
                summaries.append(response.json()['summary'])
            else:
                print(f"Error summarizing text batch: {response.status_code}")
        except Exception as e:
            print(f"Exception during summarization: {str(e)}")
    return summaries

def split_text(text, max_chunk_size=1000):
    words = text.split()
    return [" ".join(words[i:i + max_chunk_size]) for i in range(0, len(words), max_chunk_size)]

def main(youtube_video_url):
    video_id = youtube_video_url.split("=")[1].split("&")[0]
    print(f"Processing video URL: {youtube_video_url}")
    print(f"Extracted video ID: {video_id}")

    print("Fetching transcript...")
    start_time = time.time()
    transcript = fetch_transcript(video_id)
    fetch_time = time.time() - start_time
    print(f"Fetched transcript in {fetch_time:.2f} seconds")

    if not transcript:
        print("Could not fetch transcript.")
        return

    print("Splitting text into batches...")
    text_batches = split_text(transcript)

    print("Summarizing text batches...")
    start_time = time.time()
    summarized_text = summarize_text_batch(text_batches)
    summarize_time = time.time() - start_time
    print(f"Summarized text in {summarize_time:.2f} seconds")

    print("Summary of the video:")
    print("\n".join(summarized_text))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python summarize_video.py <YouTube Video URL>")
        sys.exit(1)

    youtube_video_url = sys.argv[1]
    main(youtube_video_url)

