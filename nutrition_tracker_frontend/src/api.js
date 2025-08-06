//
// API: Nutrition Tracker frontend to backend REST API integration
//
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // Set to backend URL in production

// PUBLIC_INTERFACE
export async function apiRequest(path, method = "GET", data = null, token = null) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
    }
  };
  if (data) opts.body = JSON.stringify(data);
  if (token) opts.headers["Authorization"] = `Bearer ${token}`;

  const resp = await fetch(`${API_URL}${path}`, opts);
  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(`API error: ${resp.status} ${errorText}`);
  }
  return resp.json();
}
