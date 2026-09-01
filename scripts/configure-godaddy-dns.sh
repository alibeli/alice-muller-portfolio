#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-alice-muller.com}"
API_BASE="https://api.godaddy.com/v1"

if [[ -z "${GODADDY_API_KEY:-}" || -z "${GODADDY_API_SECRET:-}" ]]; then
  echo "Missing GoDaddy API credentials."
  echo ""
  echo "1. Create a key at https://developer.godaddy.com/keys"
  echo "2. Run:"
  echo "   export GODADDY_API_KEY='your_key'"
  echo "   export GODADDY_API_SECRET='your_secret'"
  echo "   ./scripts/configure-godaddy-dns.sh"
  exit 1
fi

auth_header="Authorization: sso-key ${GODADDY_API_KEY}:${GODADDY_API_SECRET}"

api() {
  local method="$1"
  local path="$2"
  shift 2
  curl -fsS -X "$method" "${API_BASE}${path}" \
    -H "$auth_header" \
    -H "Content-Type: application/json" \
    "$@"
}

echo "Fetching current DNS records for ${DOMAIN}..."
api GET "/domains/${DOMAIN}/records" | python3 -m json.tool

echo ""
echo "Updating apex A records for GitHub Pages..."
api PUT "/domains/${DOMAIN}/records/A/@" --data @- <<'EOF'
[
  { "data": "185.199.108.153", "ttl": 600 },
  { "data": "185.199.109.153", "ttl": 600 },
  { "data": "185.199.110.153", "ttl": 600 },
  { "data": "185.199.111.153", "ttl": 600 }
]
EOF

echo "Updating www CNAME..."
api PUT "/domains/${DOMAIN}/records/CNAME/www" --data @- <<'EOF'
[
  { "data": "alibeli.github.io", "ttl": 600 }
]
EOF

echo ""
echo "Done. Updated records:"
api GET "/domains/${DOMAIN}/records/A/@" | python3 -m json.tool
api GET "/domains/${DOMAIN}/records/CNAME/www" | python3 -m json.tool

echo ""
echo "DNS can take 15-60 minutes to propagate."
echo "Then check: https://github.com/alibeli/alice-muller-portfolio/settings/pages"
echo "Enable 'Enforce HTTPS' once the domain verifies."
