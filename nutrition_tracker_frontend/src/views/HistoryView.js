import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export default function HistoryView() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const resp = await apiRequest("/history", "GET", null, token);
        setHistory(resp.days || []);
      } catch (e) {
        setHistory([{ date: "Error", entries: [], error: e.message }]);
      }
    }
    fetchHistory();
  }, [token]);

  return (
    <main className="panel-main">
      <h2>History</h2>
      {history.map((day, idx) => (
        <div className="history-day" key={idx}>
          <strong>{day.date}</strong>
          {day.error ? (
            <div className="error">{day.error}</div>
          ) : (
            <ul>
              {day.entries.length
                ? day.entries.map((e, j) => (
                    <li key={j}>{e.name}: {e.calories}cal, {e.protein}P, {e.carbs}C, {e.fat}F</li>
                  ))
                : <li>No entries.</li>}
            </ul>
          )}
        </div>
      ))}
    </main>
  );
}
