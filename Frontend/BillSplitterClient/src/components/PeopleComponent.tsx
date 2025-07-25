import { Users } from "lucide-react";
import { Person, Bill } from "../models/types";
import { useState } from "react";
import { UserPlus, X } from "lucide-react";
function PeopleComponent() {
  const personColors = [
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#84cc16",
    "#6366f1",
  ];
  const [persons, setPersons] = useState<Person[]>([
    { id: 1, name: "Person 1", color: personColors[0], isActive: true },
    { id: 2, name: "Person 2", color: personColors[1], isActive: true },
  ]);
  const [bills, setBills] = useState<Bill[]>([]);
  const addPerson = () => {
    if (persons.length >= 8) return;
    const newPerson = {
      id: Math.max(...persons.map((p) => p.id)) + 1,
      name: `Person ${persons.length + 1}`,
      color: personColors[persons.length % personColors.length],
      isActive: true,
    };
    setPersons([...persons, newPerson]);
  };

  const removePerson = (id: number) => {
    if (persons.length <= 2) return;
    setPersons(persons.filter((p) => p.id !== id));
    // Clean up bills
    setBills(
      bills.map((bill) => ({
        ...bill,
        splitAmong: bill.splitAmong.filter((pId) => pId !== id),
        paidBy: bill.paidBy === id ? persons[0].id : bill.paidBy,
      }))
    );
  };

  const updatePersonName = (id: number, name: string) => {
    setPersons(
      persons.map((person) => (person.id === id ? { ...person, name } : person))
    );
  };
  return (
    <div className="col-12">
      <div
        style={{
          background: "rgba(30, 41, 59, 0.5)",
          backdropFilter: "blur(8px)",
          border: "1px solid #475569",
          borderRadius: "16px",
          padding: "1.5rem",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5
            className="d-flex align-items-center gap-2 mb-0"
            style={{ color: "white", fontWeight: "600" }}
          >
            <Users
              style={{ width: "20px", height: "20px", color: "#a78bfa" }}
            />
            People ({persons.length})
          </h5>
          <button
            onClick={addPerson}
            disabled={persons.length >= 10}
            className="btn btn-sm"
            style={{
              background:
                persons.length >= 10
                  ? "#64748b"
                  : "linear-gradient(45deg, #8b5cf6, #a855f7)",
              border: "none",
              color: "white",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <UserPlus style={{ width: "16px", height: "16px" }} />
            Add Person
          </button>
        </div>

        <div className="row g-3">
          {persons.map((person, index) => (
            <div key={person.id} className="col-md-6">
              <div className="person-card">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: person.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                    }}
                  >
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) =>
                      updatePersonName(person.id, e.target.value)
                    }
                    className="form-control"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  />
                  {persons.length > 2 && (
                    <button
                      onClick={() => removePerson(person.id)}
                      className="btn btn-sm btn-outline-danger"
                      style={{ padding: "0.25rem 0.5rem" }}
                    >
                      <X style={{ width: "14px", height: "14px" }} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PeopleComponent;
