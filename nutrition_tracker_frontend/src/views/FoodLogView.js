import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../contexts/AuthContext";
import FoodEntryModal from "../components/FoodEntryModal";

// PUBLIC_INTERFACE
export default function FoodLogView() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);

  async function refresh() {
    const resp = await apiRequest("/food", "GET", null, token);
    setEntries(resp.entries || []);
  }
  useEffect(() => { refresh(); }, [token]);

  function handleAdd() {
    setEditIdx(null);
    setModalOpen(true);
  }
  function handleEdit(idx) {
    setEditIdx(idx);
    setModalOpen(true);
  }
  async function handleDelete(idx) {
    const id = entries[idx].id;
    await apiRequest(`/food/${id}`, "DELETE", null, token);
    refresh();
  }
  async function handleSave(food) {
    if (editIdx === null) {
      await apiRequest("/food", "POST", food, token);
    } else {
      const id = entries[editIdx].id;
      await apiRequest(`/food/${id}`, "PUT", food, token);
    }
    setModalOpen(false);
    refresh();
  }

  return (
    <main className="panel-main">
      <h2>Food Log</h2>
      <button className="btn btn-accent" onClick={handleAdd}>+ Add Food</button>
      <table className="food-log-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Fat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.length ? entries.map((e, idx) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.calories}</td>
              <td>{e.protein}</td>
              <td>{e.carbs}</td>
              <td>{e.fat}</td>
              <td>
                <button className="btn btn-small" onClick={() => handleEdit(idx)}>Edit</button>
                <button className="btn btn-small btn-danger" onClick={() => handleDelete(idx)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="6">No food entries yet.</td></tr>}
        </tbody>
      </table>
      <FoodEntryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editIdx !== null ? entries[editIdx] : undefined}
      />
    </main>
  );
}
