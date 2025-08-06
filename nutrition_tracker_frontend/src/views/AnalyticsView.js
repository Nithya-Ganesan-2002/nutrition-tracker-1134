import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export default function AnalyticsView() {
  const { token } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const resp = await apiRequest("/analytics", "GET", null, token);
        setData(resp);
      } catch (err) {
        setData({ error: err.message });
      }
    }
    fetchAnalytics();
  }, [token]);

  if (!data)
    return <main className="panel-main"><h2>Analytics</h2><div>Loading...</div></main>;
  if (data.error)
    return <main className="panel-main"><h2>Analytics</h2><div className="error">{data.error}</div></main>;

  // Show 7-day chart: fallback to table if no charting dep
  return (
    <main className="panel-main">
      <h2>Last 7 Days</h2>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Date</th><th>Calories</th><th>Protein</th><th>Carbs</th><th>Fat</th>
          </tr>
        </thead>
        <tbody>
          {data.days?.map((d, idx) => (
            <tr key={idx}>
              <td>{d.date}</td>
              <td>{d.calories}</td>
              <td>{d.protein}</td>
              <td>{d.carbs}</td>
              <td>{d.fat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
