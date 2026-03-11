import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Groq is OpenAI-compatible
api_key = os.getenv("GROQ_API_KEY")

def transform_tone(text: str, tone_type: str, format_type: str):
    """
    Transforms informal/aggressive text into a professional tone using Groq (OpenAI-compatible).
    """
    if not api_key:
        return "Error: GROQ_API_KEY not found in .env file."

    client = OpenAI(
        api_key=api_key.strip(),
        base_url="https://api.groq.com/openai/v1"
    )
    
    prompt = f"""
    Act as a professional communication expert. 
    Transform the following informal or aggressive text into a highly {tone_type.lower()} and professional tone suitable for an {format_type.lower()}.
    
    The output should be ONLY the transformed text, without any introductory or concluding remarks.
    
    Original Text: "{text}"
    
    Target Tone: {tone_type}
    Target Format: {format_type}
    
    Professional Transformation:
    """
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a professional communication expert."},
                {"role": "user", "content": prompt}
            ],
            stream=False
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error in transformation: {str(e)}"

def generate_letter(topic: str):
    """
    Generates a full professional letter based on the provided context/topic.
    """
    if not api_key:
        return "Error: GROQ_API_KEY not found in .env file."

    client = OpenAI(
        api_key=api_key.strip(),
        base_url="https://api.groq.com/openai/v1"
    )
    
    prompt = f"""
    Act as a professional communication expert. 
    Write a complete, formal, and professional letter based on the following context:
    "{topic}"
    
    The letter should include:
    - Formal Salutation
    - Structured Body (Introduction, Purpose, Conclusion)
    - Formal Closing
    
    The output should ONLY be the letter text. Do not include any meta-commentary.
    """
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a professional letter writer."},
                {"role": "user", "content": prompt}
            ],
            stream=False
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error in generating letter: {str(e)}"
