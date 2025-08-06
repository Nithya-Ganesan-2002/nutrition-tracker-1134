import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export default function DashboardView() {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const resp = await apiRequest("/dashboard", "GET", null, token);
        setSummary(resp);
      } catch (error) {
        setSummary({ error: error.message });
      }
    }
    fetchDashboard();
  }, [token]);

  if (!summary)
    return (
      <main className="panel-main">
        <h2>Today's Nutrition Summary</h2>
        <div>Loading...</div>
      </main>
    );
  if (summary.error)
    return (
      <main className="panel-main">
        <h2>Today's Nutrition Summary</h2>
        <div className="error">{summary.error}</div>
      </main>
    );

  const { calories, protein, carbs, fat, food_entries } = summary;
  return (
    <main className="panel-main">
      <h2>Today's Nutrition Summary</h2>
      <div className="nutrient-cards">
        <div className="nutrient-card calories">Calories: <strong>{calories}</strong></div>
        <div className="nutrient-card">Protein: <strong>{protein}g</strong></div>
        <div className="nutrient-card">Carbs: <strong>{carbs}g</strong></div>
        <div className="nutrient-card">Fat: <strong>{fat}g</strong></div>
      </div>
      <h3>Food Entries</h3>
      <ul className="food-entries">
        {food_entries && food_entries.length ? (
          food_entries.map((f, idx) => (
            <li key={idx}>
              {f.name} &mdash; <span className="muted">{f.calories} cal, {f.protein}g P, {f.carbs}g C, {f.fat}g F</span>
            </li>
          ))
        ) : (
          <li>No entries yet.</li>
        )}
      </ul>
    </main>
  );
}
