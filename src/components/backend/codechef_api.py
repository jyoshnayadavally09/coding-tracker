# backend/codechef_api.py
import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/codechef/{username}")
def get_codechef_profile(username: str):
    url = f"https://www.codechef.com/users/{username}"
    r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    if r.status_code != 200:
        return {"error": "Profile not found"}

    soup = BeautifulSoup(r.text, "html.parser")

    rating = soup.find("div", class_="rating-number")
    stars = soup.find("span", class_="rating")
    global_rank = soup.find("a", href=f"/ratings/all?filterBy=Institution%3D&order=asc&sortBy=rank")
    country_rank = soup.find("a", href=f"/ratings/all?filterBy=Country%3D&order=asc&sortBy=rank")

    return {
        "username": username,
        "rating": rating.text.strip() if rating else "N/A",
        "stars": stars.text.strip() if stars else "N/A",
        "globalRank": global_rank.text.strip() if global_rank else "N/A",
        "countryRank": country_rank.text.strip() if country_rank else "N/A",
    }
