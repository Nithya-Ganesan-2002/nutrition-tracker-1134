import React, { useState } from "react";
import "../App.css";

// PUBLIC_INTERFACE
export default function FoodEntryModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || { name: "", calories: "", protein: "", carbs: "", fat: "" }
  );

  if (!open) return null;

  function handleChange(e) {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...form, calories: +form.calories, protein: +form.protein, carbs: +form.carbs, fat: +form.fat });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{initial ? "Edit Food" : "Add Food Entry"}</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" required placeholder="Food name" value={form.name} onChange={handleChange}/>
          <input name="calories" required type="number" placeholder="Calories" value={form.calories} onChange={handleChange}/>
          <input name="protein" required type="number" placeholder="Protein (g)" value={form.protein} onChange={handleChange}/>
          <input name="carbs" required type="number" placeholder="Carbs (g)" value={form.carbs} onChange={handleChange}/>
          <input name="fat" required type="number" placeholder="Fat (g)" value={form.fat} onChange={handleChange}/>
          <div className="modal-actions">
            <button className="btn" type="button" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
