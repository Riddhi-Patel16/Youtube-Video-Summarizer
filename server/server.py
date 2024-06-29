# # server.py

# from fastapi import FastAPI, Request
# from pydantic import BaseModel
# from transformers import pipeline
# import torch

# app = FastAPI()

# class TextToSummarize(BaseModel):
#     text: str

# # Load the summarization model once when the server starts
# device = 0 if torch.cuda.is_available() else -1
# summarizer = pipeline('summarization', model="sshleifer/distilbart-cnn-12-6", device=device)

# @app.post("/summarize")
# async def summarize_text(request: Request, body: TextToSummarize):
#     text = body.text
#     max_length = min(150, len(text.split()) // 2)
#     summary = summarizer(text, max_length=max_length, min_length=max(25, max_length // 2), do_sample=False)[0]['summary_text']
#     return {"summary": summary}

# To run the server, use the following command in the terminal:
# uvicorn server:app --host 127.0.0.1 --port 8000 --reload


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import torch

app = FastAPI()

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")

summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)

class SummarizationRequest(BaseModel):
    text: str

def split_text_into_chunks(text, max_length=1024):
    tokens = tokenizer.encode(text, truncation=True, max_length=max_length)
    chunks = [tokens[i:i + max_length] for i in range(0, len(tokens), max_length)]
    return chunks

@app.post("/summarize")
async def summarize(request: SummarizationRequest):
    try:
        text = request.text
        chunks = split_text_into_chunks(text)
        summaries = []
        
        for chunk in chunks:
            chunk_text = tokenizer.decode(chunk, skip_special_tokens=True)
            summary = summarizer(chunk_text, max_length=150, min_length=25, do_sample=False)
            summaries.append(summary[0]['summary_text'])
        
        return {"summary": " ".join(summaries)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8010)
