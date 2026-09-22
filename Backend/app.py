from flask import Flask, jsonify, request
from flask_cors import CORS

from real_estate_news import collect_news
from supabase_client import supabase

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "AK Developer News API"
    })


@app.route("/api/news", methods=["GET"])
def get_news():
    try:
        limit = int(request.args.get("limit", 10))
        limit = max(1, min(limit, 50))

        response = (
            supabase
            .table("news")
            .select("*")
            .eq("classifier", "hyderabad_real_estate")
            .order("id", desc=True)
            .limit(limit)
            .execute()
        )

        return jsonify({
            "success": True,
            "data": response.data or []
        })

    except ValueError:
        return jsonify({
            "success": False,
            "error": "limit must be a number"
        }), 400

    except Exception as exc:
        return jsonify({
            "success": False,
            "error": str(exc)
        }), 500


@app.route("/api/news/generate", methods=["POST"])
def generate_news():
    try:
        result = collect_news()

        return jsonify({
            "success": True,
            **result
        })

    except Exception as exc:
        return jsonify({
            "success": False,
            "error": str(exc)
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)