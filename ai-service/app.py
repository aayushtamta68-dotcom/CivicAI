
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

DEPARTMENT_KEYWORDS = {
    "Roads": {
        "pothole": 3,
        "road damage": 3,
        "damaged road": 3,
        "broken road": 3,
        "road repair": 2,
        "road crack": 2,
        "road construction": 2,
        "footpath": 2,
        "bridge damage": 3,
        "traffic problem": 2,
        "road blockage": 2
    },
    "Electricity": {
        "street light": 4,
        "street lamp": 4,
        "electricity": 3,
        "power cut": 3,
        "power outage": 3,
        "no electricity": 3,
        "electric wire": 3,
        "broken wire": 3,
        "fallen wire": 4,
        "electric pole": 3,
        "transformer": 3,
        "short circuit": 4,
        "voltage problem": 2,
        "light": 1
    },
    "Water Supply": {
        "water leakage": 4,
        "water leak": 4,
        "pipeline leakage": 4,
        "broken pipe": 3,
        "water pipe": 3,
        "water supply": 3,
        "no water": 3,
        "low water pressure": 2,
        "dirty water": 3,
        "tap": 2
    },
    "Sanitation": {
        "garbage": 3,
        "garbage collection": 4,
        "waste": 3,
        "dustbin": 3,
        "sewer": 3,
        "sewage": 3,
        "drain blockage": 4,
        "dirty area": 2,
        "bad smell": 2,
        "cleaning": 2,
        "overflowing garbage": 4
    }
}


@app.route("/")
def home():
    return jsonify({
        "service": "CivicAI AI Service",
        "status": "Running"
    })


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True) or {}

    title = data.get("title", "").lower()
    description = data.get("description", "").lower()

    text = title + " " + description

    department_scores = {
        "Roads": 0,
        "Electricity": 0,
        "Water Supply": 0,
        "Sanitation": 0
    }

    for department, keywords in DEPARTMENT_KEYWORDS.items():
        for keyword, score in keywords.items():
            if keyword in text:
                department_scores[department] += score

    department = max(
        department_scores,
        key=department_scores.get
    )

    highest_score = department_scores[department]

    if highest_score == 0:
        department = "General"
        confidence = 0.30
    else:
        total_score = sum(department_scores.values())
        confidence = round(
            highest_score / total_score,
            2
        )

    high_priority_words = [
        "accident",
        "danger",
        "fire",
        "emergency",
        "hospital",
        "injury",
        "life risk",
        "shock",
        "explosion",
        "fallen wire"
    ]

    medium_priority_words = [
        "broken",
        "damaged",
        "leak",
        "overflow",
        "not working",
        "blocked"
    ]

    priority = "Low"

    for word in high_priority_words:
        if word in text:
            priority = "High"
            break

    if priority == "Low":
        for word in medium_priority_words:
            if word in text:
                priority = "Medium"
                break

    return jsonify({
        "department": department,
        "priority": priority,
        "confidence": confidence
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5001)),
        debug=False
    )
