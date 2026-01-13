"""
Script to download Sinhala pronunciation audio from Google Translate TTS.
Run with: python scripts/download-audio.py

No external dependencies required - uses built-in urllib.
"""

import os
import base64
import time
import urllib.parse
import urllib.request

# Create directories
os.makedirs("public/audio/letters", exist_ok=True)
os.makedirs("public/audio/words", exist_ok=True)

def get_google_tts_url(text, lang="si"):
    """Generate Google Translate TTS URL"""
    encoded_text = urllib.parse.quote(text)
    return f"https://translate.google.com/translate_tts?ie=UTF-8&tl={lang}&client=tw-ob&q={encoded_text}"

def download_audio(text, filepath, lang="si"):
    """Download audio from Google Translate TTS"""
    url = get_google_tts_url(text, lang)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Referer": "https://translate.google.com/"
    }

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(filepath, "wb") as f:
                f.write(response.read())
        print(f"Downloaded: {filepath}")
        return True
    except Exception as e:
        print(f"Failed: {filepath} - {str(e)[:50]}")
        return False

# Vowels
vowels = [
    ("අ", "a"), ("ආ", "aa"), ("ඇ", "ae"), ("ඈ", "aae"),
    ("ඉ", "i"), ("ඊ", "ii"), ("උ", "u"), ("ඌ", "uu"),
    ("ඍ", "ri"), ("ඎ", "rii"), ("ඏ", "li"), ("ඐ", "lii"),
    ("එ", "e"), ("ඒ", "ee"), ("ඓ", "ai"),
    ("ඔ", "o"), ("ඕ", "oo"), ("ඖ", "au"),
]

# Consonants
consonants = [
    ("ක", "ka"), ("ඛ", "kha"), ("ග", "ga"), ("ඝ", "gha"), ("ඞ", "nga"),
    ("ච", "ca"), ("ඡ", "cha"), ("ජ", "ja"), ("ඣ", "jha"), ("ඤ", "nya"),
    ("ට", "ta"), ("ඨ", "tha"), ("ඩ", "da"), ("ඪ", "dha"), ("ණ", "na"),
    ("ත", "tha2"), ("ථ", "thha"), ("ද", "da2"), ("ධ", "dhha"), ("න", "na2"),
    ("ප", "pa"), ("ඵ", "pha"), ("බ", "ba"), ("භ", "bha"), ("ම", "ma"),
    ("ය", "ya"), ("ර", "ra"), ("ල", "la"), ("ව", "va"),
    ("ශ", "sha"), ("ෂ", "shha"), ("ස", "sa"), ("හ", "ha"),
    ("ළ", "lla"), ("ෆ", "fa"),
]

# Words
words = [
    ("අම්මා", "Mother"), ("තාත්තා", "Father"), ("පැටිය", "Baby"), ("ගෙදර", "Home"),
    ("බල්ලා", "Dog"), ("පූසා", "Cat"), ("හාතිය", "Elephant"),
    ("කුරුල්ලා", "Bird"), ("මාළුවා", "Fish"), ("වඳුරා", "Monkey"),
    ("ඇස", "Eye"), ("නාසය", "Nose"), ("කන", "Ear"),
    ("මුව", "Mouth"), ("අත", "Hand"), ("පාදය", "Foot"),
    ("ආයුබෝවන්", "Hello"), ("ස්තූතියි", "Thank you"),
    ("ඔව්", "Yes"), ("නෑ", "No"),
    ("අක්කා", "Elder Sister"), ("අයියා", "Elder Brother"),
    ("නංගි", "Younger Sister"), ("මල්ලි", "Younger Brother"),
    ("රතු", "Red"), ("නිල්", "Blue"), ("කොළ", "Green"), ("කහ", "Yellow"),
    ("පාසල", "School"), ("රෝහල", "Hospital"), ("වෙළෙඳසැල", "Shop"),
    ("උයන", "Garden"), ("පුස්තකාලය", "Library"), ("පල්ලිය", "Temple"),
]

print("=== Downloading Sinhala Audio Files ===\n")

# Download letters
print("--- Downloading Letters ---")
all_letters = vowels + consonants
for sinhala, roman in all_letters:
    codepoint = format(ord(sinhala), 'x')
    filepath = f"public/audio/letters/{codepoint}.mp3"
    download_audio(sinhala, filepath)
    time.sleep(0.5)  # Rate limiting

print("\n--- Downloading Words ---")
for sinhala, english in words:
    encoded = base64.b64encode(sinhala.encode('utf-8')).decode('utf-8')
    filepath = f"public/audio/words/{encoded}.mp3"
    download_audio(sinhala, filepath)
    time.sleep(0.5)  # Rate limiting

print("\n=== Download Complete ===")
print("Audio files saved to public/audio/")
