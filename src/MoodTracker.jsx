/* Nicole Rodriguez
* CS81 Summer 2025
* Final Project: Latina Mom Mood Tracker
* 8/3/2025
 */

import React, { useState, useEffect } from "react";

function MoodTracker() {
    // useState to hold all the logged entries. Load from localStorage if available
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem("moodEntries");
        return saved ? JSON.parse(saved) : [];
    });

    // useState to hold current form data
    const [formData, setFormData] = useState({
        day: "",
        mood: "",
        cleanliness: "",
        cafecitos: "",
        margaritas: "",
        chanclas: ""
    });

    // For showing an error message if required fields are missing
    const [error, setError] = useState("");

    // useEffect runs every time entries change and saving to localStorage
    useEffect(() => {
        if (entries.length > 0) {
            console.log("📝 New mood entry added:", entries[entries.length - 1]);
            localStorage.setItem("moodEntries", JSON.stringify(entries));
        }
    }, [entries]);

    // This function handles input changes in the form
    function handleChange(event) {
        const { name, value } = event.target;

        // For number fields, make sure they stay at 0 or above
        if (["cafecitos", "margaritas", "chanclas"].includes(name)) {
            const numericValue = value === "" ? "" : Math.max(0, Number(value));
            setFormData((prev) => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    }

    // This function handles form submission
    function handleSubmit(event) {
        event.preventDefault();
        // Check if required fields are filled
        if (formData.day && formData.mood) {
            const newEntry = {
                ...formData,
                cafecitos: Number(formData.cafecitos) || 0,
                margaritas: Number(formData.margaritas) || 0,
                chanclas: Number(formData.chanclas) || 0
            };
            setEntries((prevEntries) => [...prevEntries, newEntry]);
            // Reset form after submission
            setFormData({ day: "", mood: "", cleanliness: "", cafecitos: "", margaritas: "", chanclas: "" });
            setError("");
        } else {
            setError("Please select a day and mood to log your entry.");
        }
    }

    // Clears all entries and wipes localStorage
    function handleClearEntries() {
        setEntries([]);
        localStorage.removeItem("moodEntries");
    }

    // Map moods to Latina mom song suggestions
    const moodToSong = {
        "happy": "🎶 Bidi Bidi Bom Bom – Selena",
        "sad": "😭 La Gata Bajo la Lluvia – Rocío Dúrcal",
        "in denial": "🤷‍♀️ Ciega, Sordomuda – Shakira",
        "radical acceptance": "🎉 La Vida es un Carnaval – Celia Cruz",
        "longing": "💔 La Media Vuelta – Luis Miguel",
        "festive": "💃 Suavemente – Elvis Crespo",
        "tired": "😴 A Puro Dolor – Son by Four",
        "spicy": "🔥 Dile – Don Omar",
        "dramatic": "🎭 Todos Me Miran – Gloria Trevi",
        "chismosa": "👀 Secreto de Amor – Joan Sebastian",
        "furiosa": "💢 Te He Querido, Te He Llorado – Ivy Queen"
    };

    // Helper to get song suggestion based on mood
    function getSongSuggestion(mood) {
        const key = mood.toLowerCase().trim();
        return moodToSong[key];
    }

    // Drop-down options
    const moodOptions = Object.keys(moodToSong);
    const cleanlinessOptions = [
        "spotless", "fabuloso!", "okay", "chaos", "just mopped", "laundry mountain", "Clorox vibes"
    ];
    const dayOptions = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];

    // Shared style for input and dropdown
    const inputStyle = {
        padding: "8px",
        height: "36px",
        fontSize: "16px"
    };

    const selectStyle = {
        padding: "8px",
        height: "36px",
        fontSize: "16px"
    };

    // Main return JSX. This is what gets rendered
    return (
        <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Page Title */}
            <h1>💃 Latina Mom Mood Tracker 🩴</h1>
            <p>Track your 🌈 mood, 🧼 house vibes, ☕ cafecitos, 🍹 margaritas, and 🩴 chanclas thrown!</p>

            {/* Error message if any */}
            {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

            {/* Form for logging mood entries */}
            <form
                onSubmit={handleSubmit}
                style={{
                    marginBottom: "20px",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px"
                }}
            >
                {/* Day dropdown */}
                <select name="day" value={formData.day} onChange={handleChange} required style={selectStyle}>
                    <option value="">📅 Select Day</option>
                    {dayOptions.map((day, i) => (
                        <option key={i} value={day}>{day}</option>
                    ))}
                </select>

                {/* Mood dropdown */}
                <select name="mood" value={formData.mood} onChange={handleChange} required style={selectStyle}>
                    <option value="">🌈 Select Mood</option>
                    {moodOptions.map((mood, i) => (
                        <option key={i} value={mood}>{mood}</option>
                    ))}
                </select>

                {/* Cleanliness dropdown */}
                <select name="cleanliness" value={formData.cleanliness} onChange={handleChange} style={selectStyle}>
                    <option value="">🧼 Select Cleanliness</option>
                    {cleanlinessOptions.map((desc, i) => (
                        <option key={i} value={desc}>{desc}</option>
                    ))}
                </select>

                {/* Numeric fields with placeholders */}
                <input
                    name="cafecitos"
                    type="number"
                    min="0"
                    value={formData.cafecitos}
                    onChange={handleChange}
                    placeholder="☕ # of Cafecitos"
                    style={inputStyle}
                />
                <input
                    name="margaritas"
                    type="number"
                    min="0"
                    value={formData.margaritas}
                    onChange={handleChange}
                    placeholder="🍹 # of Margaritas"
                    style={inputStyle}
                />
                <input
                    name="chanclas"
                    type="number"
                    min="0"
                    value={formData.chanclas}
                    onChange={handleChange}
                    placeholder="🩴 # of Chanclas Thrown"
                    style={inputStyle}
                />

                {/* Submit and Clear buttons */}
                <button type="submit" style={{ gridColumn: "span 1" }}>✨ Add Entry</button>
                <button
                    type="button"
                    onClick={handleClearEntries}
                    style={{ backgroundColor: "#e74c3c", color: "white", gridColumn: "span 1" }}
                >
                    🧹 Clear All Entries
                </button>
            </form>

            {/* Display mood logs below the form */}
            <h2>📖 All Entries</h2>
            {entries.length === 0 ? (
                <p>No entries yet. Add your first mood log above!</p>
            ) : (
                <ul>
                    {entries.map((entry, index) => (
                        <li key={index} style={{ marginBottom: "12px" }}>
                            <strong>📅 {entry.day}</strong>: 🌈 Mood – {entry.mood}, 🧼 Cleanliness – {entry.cleanliness || "n/a"}<br />
                            ☕ Cafecitos: {entry.cafecitos || 0} | 🍹 Margaritas: {entry.margaritas || 0} | 🩴 Chanclas: {entry.chanclas || 0}<br />
                            <em>{getSongSuggestion(entry.mood)}</em>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MoodTracker;







