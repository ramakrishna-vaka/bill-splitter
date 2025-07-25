import React, { useState } from 'react';
import { X,Check } from 'lucide-react';
import { Bill, Person } from '../models/types';
function BillModalComponent() {
    const [showBillModal, setShowBillModal] = useState(false);
     const [bills, setBills] = useState<Bill[]>([]);
    const personColors = [
        '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
        '#ef4444', '#ec4899', '#84cc16', '#6366f1'
    ];
    const billCategories = ['🍽️ Food', '🚗 Transport', '🏠 Utilities', '🎉 Entertainment', '🛒 Shopping', '💊 Health', '📚 Other'];
     const [editingBill, setEditingBill] = useState<Bill | null>(null);
      const [newBill, setNewBill] = useState<Bill>({
        id: 0,
        description: '',
        amount: '',
        paidBy: 1,
        splitAmong: [],
        category: billCategories[0]
      });
      const [persons, setPersons] = useState<Person[]>([
          { id: 1, name: 'Person 1', color: personColors[0], isActive: true },
          { id: 2, name: 'Person 2', color: personColors[1], isActive: true }
        ]);
        const saveBill = () => {
    if (!newBill.description.trim() || !newBill.amount || newBill.splitAmong.length === 0) return;

    if (editingBill) {
      setBills(bills.map(bill => bill.id === editingBill.id ? newBill : bill));
    } else {
      setBills([...bills, { ...newBill, id: Date.now() }]);
    }
    setShowBillModal(false);
    setEditingBill(null);
  };
const togglePersonForBill = (personId: number) => {
    const splitAmong = newBill.splitAmong.includes(personId)
      ? newBill.splitAmong.filter(id => id !== personId)
      : [...newBill.splitAmong, personId];
    setNewBill({ ...newBill, splitAmong });
  };

  return (
    <>
    {showBillModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }} onClick={() => setShowBillModal(false)}>
            <div 
              style={{
                background: 'rgba(30, 41, 59, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #475569',
                borderRadius: '20px',
                padding: '2rem',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 style={{ color: 'white', fontWeight: '600', margin: 0 }}>
                  {editingBill ? '✏️ Edit Bill' : '➕ Add New Bill'}
                </h5>
                <button
                  onClick={() => setShowBillModal(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #64748b',
                    borderRadius: '8px',
                    color: '#94a3b8',
                    padding: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Category Selection */}
                <div>
                  <label style={{ color: '#cbd5e1', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                    Category
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {billCategories.map(category => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setNewBill({ ...newBill, category })}
                        style={{
                          background: newBill.category === category 
                            ? 'linear-gradient(45deg, #8b5cf6, #a855f7)' 
                            : 'rgba(51, 65, 85, 0.5)',
                          border: newBill.category === category ? 'none' : '1px solid #64748b',
                          color: 'white',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={{ color: '#cbd5e1', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                    Description *
                  </label>
                  <input
                    type="text"
                    value={newBill.description}
                    onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
                    placeholder="e.g., Dinner at Italian restaurant"
                    style={{
                      width: '100%',
                      background: '#475569',
                      border: '1px solid #64748b',
                      borderRadius: '12px',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                {/* Amount */}
                <div>
                  <label style={{ color: '#cbd5e1', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                    Amount *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      background: '#475569',
                      border: '1px solid #64748b',
                      borderRadius: '12px',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                {/* Paid By */}
                <div>
                  <label style={{ color: '#cbd5e1', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                    Paid By
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {persons.map(person => (
                      <button
                        key={person.id}
                        type="button"
                        onClick={() => setNewBill({ ...newBill, paidBy: person.id })}
                        style={{
                          background: newBill.paidBy === person.id ? person.color : 'rgba(51, 65, 85, 0.5)',
                          border: newBill.paidBy === person.id ? 'none' : '1px solid #64748b',
                          color: 'white',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: person.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.625rem',
                          fontWeight: 'bold'
                        }}>
                          {person.name.charAt(0).toUpperCase()}
                        </div>
                        {person.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Split Among */}
                <div>
                  <label style={{ color: '#cbd5e1', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                    Split Among * ({newBill.splitAmong.length} selected)
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {persons.map(person => (
                      <button
                        key={person.id}
                        type="button"
                        onClick={() => togglePersonForBill(person.id)}
                        style={{
                          background: newBill.splitAmong.includes(person.id) ? person.color : 'rgba(51, 65, 85, 0.5)',
                          border: newBill.splitAmong.includes(person.id) ? 'none' : '1px solid #64748b',
                          color: 'white',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: person.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.625rem',
                          fontWeight: 'bold'
                        }}>
                          {person.name.charAt(0).toUpperCase()}
                        </div>
                        {person.name}
                        {newBill.splitAmong.includes(person.id) && (
                          <Check style={{ width: '12px', height: '12px' }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Per Person Amount Preview */}
                {newBill.amount && newBill.splitAmong.length > 0 && (
                  <div style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ color: '#a78bfa', fontWeight: '500', marginBottom: '0.25rem' }}>
                      Per Person Amount
                    </div>
                    <div style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
                      ${(parseFloat(newBill.amount) / newBill.splitAmong.length).toFixed(2)}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="d-flex gap-2 justify-content-end mt-3">
                  <button
                    onClick={() => setShowBillModal(false)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #64748b',
                      color: '#94a3b8',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveBill}
                    disabled={!newBill.description.trim() || !newBill.amount || newBill.splitAmong.length === 0}
                    style={{
                      background: (!newBill.description.trim() || !newBill.amount || newBill.splitAmong.length === 0)
                        ? '#64748b' 
                        : 'linear-gradient(45deg, #8b5cf6, #a855f7)',
                      border: 'none',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: (!newBill.description.trim() || !newBill.amount || newBill.splitAmong.length === 0) 
                        ? 'not-allowed' 
                        : 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    {editingBill ? 'Update Bill' : 'Save Bill'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </>
  );
}
export default BillModalComponent;