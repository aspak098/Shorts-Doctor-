# Shorts Doctor — Final Frontend

## Exact product behavior
There is NO video-upload field.

The creator supplies:
- YouTube Short URL
- The exact text of what they said in the video
- Up to 10 screenshots/photos from YouTube Studio or useful video evidence
- Topic/audience
- Channel information and history
- The problem they are experiencing
- Any extra observations

## Production analysis
The secure backend should:
1. OCR/vision-read each uploaded screenshot.
2. Identify which screenshot contains which YouTube Studio metric.
3. Extract metrics without guessing.
4. Compare current Short with comparable previous Shorts supplied in evidence.
5. Analyze the creator's supplied spoken text.
6. Retrieve/check current official YouTube guidance on the server.
7. Produce an evidence-first report with:
   - Observed
   - Likely
   - Possible
   - Evidence
   - Confidence
   - Policy/guideline check
   - Recommended tests

## Critical rule
Never claim “YouTube made a mistake” merely because a Short has low views. The internal recommendation system is not fully observable. The product must distinguish facts from hypotheses.

## Backend endpoint idea
POST /api/diagnose
multipart/form-data:
- short_url
- spoken_text
- images[]
- channel_context JSON

Return JSON:
{
  "summary": "",
  "findings": [
    {
      "status": "observed|likely|possible",
      "claim": "",
      "evidence": ["image-2"],
      "confidence": "high|medium|low"
    }
  ],
  "policy_checks": [],
  "next_tests": []
}

Keep API secrets on the server, not in frontend JavaScript.

## Publishing
Add Privacy Policy, Terms, Disclaimer and Contact pages. Add upload size/type limits, rate limiting, secure file handling and a clear retention/deletion policy.
