import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load contacts
  const loadContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Failed to load contacts", err);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD contact
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Add failed");
      }

      setForm({ name: "", email: "", phone: "" });
      loadContacts();
    } catch (err) {
      alert("Failed to add contact");
      console.error(err);
    }
  };

  // DELETE contact
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadContacts();
    } catch (err) {
      alert("Failed to delete contact");
      console.error(err);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h2>Contact Manager</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Contact</button>
        </form>

        {contacts.length === 0 ? (
          <p className="empty">No contacts found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button onClick={() => deleteContact(c.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
