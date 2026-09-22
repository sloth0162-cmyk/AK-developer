import os
from dotenv import load_dotenv

load_dotenv()  # load .env file

class Config:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

