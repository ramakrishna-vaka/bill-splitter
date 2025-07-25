import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Users, Calculator, DollarSign, Receipt, Check, X, Edit3, UserPlus, Zap, AlertCircle, Info } from 'lucide-react';
import { Bill,  Person, Results} from '../models/types';
import '../styles/CreateBill.css';
import PeopleComponent from '../components/PeopleComponent';
import AmountComponent from '../components/AmountComponent';
import BillsComponent from '../components/BillsComponent';
import ResultsComponent from '../components/ResultsComponent';
import CalculateButton from '../buttons/CalculateButton';
import BillModalComponent from '../components/BillModalComponent';

// Color palette for persons
const personColors = [
  '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', 
  '#ef4444', '#ec4899', '#84cc16', '#6366f1'
];

// Categories for bills
const billCategories = ['🍽️ Food', '🚗 Transport', '🏠 Utilities', '🎉 Entertainment', '🛒 Shopping', '💊 Health', '📚 Other'];

function CreateBill() {
  
  const [bills, setBills] = useState<Bill[]>([]);
  const [persons, setPersons] = useState<Person[]>([
    { id: 1, name: 'Person 1', color: personColors[0], isActive: true },
    { id: 2, name: 'Person 2', color: personColors[1], isActive: true }
  ]);
  const [showBillModal, setShowBillModal] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [newBill, setNewBill] = useState<Bill>({
    id: 0,
    description: '',
    amount: '',
    paidBy: 1,
    splitAmong: [],
    category: billCategories[0]
  });

  // Animation state
 

  const openBillModal = (bill?: Bill) => {
    if (bill) {
      setEditingBill(bill);
      setNewBill(bill);
    } else {
      setEditingBill(null);
      setNewBill({
        id: 0,
        description: '',
        amount: '',
        paidBy: persons[0]?.id || 1,
        splitAmong: persons.map(p => p.id),
        category: billCategories[0]
      });
    }
    setShowBillModal(true);
  };

  
  const removeBill = (id: number) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  


  return (
    <div className='main-container'>
      {/* Animated Background Elements */}
      <div className='background-elements'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${personColors[i % personColors.length]}22, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container-fluid" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Enhanced Header */}
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
            <div style={{
              padding: '0.75rem',
              background: 'linear-gradient(45deg, #8b5cf6, #a855f7)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <Receipt style={{ width: '48px', height: '48px', color: 'white' }} />
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #a78bfa, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              SplitWise Pro
            </h1>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '1.125rem', margin: '0 0 0.5rem 0' }}>
            Professional Bill Splitting Made Simple
          </p>
          <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0, fontStyle: 'italic' }}>
            ✨ Track. Split. Settle. Bill splitting, reimagined.
          </p>
        </div>

        {/* Main Content */}
        <div className="row g-4">
          {/* Left Panel - Setup */}
          <div className="col-lg-8">
            <div className="row g-4">
              {/* Dynamic Person Manager */}
<PeopleComponent></PeopleComponent>
              {/* Total Amount */}
              <AmountComponent></AmountComponent>

              {/* Bills Section */}
              <BillsComponent></BillsComponent>
              {bills.length === 0 ? (
                    <div className="text-center py-5">
                      <Receipt style={{ width: '64px', height: '64px', color: '#475569', marginBottom: '1rem' }} />
                      <p style={{ color: '#94a3b8', margin: 0 }}>
                        🧾 Ready to split smart! Click "Add Bill" to log your first shared expense.
                      </p>
                    </div>
                  ) : (
                    <div className="row g-3">
                      {bills.map(bill => {
                        const payer = persons.find(p => p.id === bill.paidBy);
                        return (
                          <div key={bill.id} className="col-md-6">
                            <div style={{
                              background: 'rgba(51, 65, 85, 0.5)',
                              border: '1px solid #64748b',
                              borderRadius: '12px',
                              padding: '1rem',
                              position: 'relative'
                            }}>
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <span style={{ fontSize: '1.25rem' }}>{bill.category.split(' ')[0]}</span>
                                <div className="d-flex gap-1">
                                  <button
                                    onClick={() => openBillModal(bill)}
                                    className="btn btn-sm btn-outline-secondary"
                                    style={{ padding: '0.25rem 0.5rem' }}
                                  >
                                    <Edit3 style={{ width: '12px', height: '12px' }} />
                                  </button>
                                  <button
                                    onClick={() => removeBill(bill.id)}
                                    className="btn btn-sm btn-outline-danger"
                                    style={{ padding: '0.25rem 0.5rem' }}
                                  >
                                    <Trash2 style={{ width: '12px', height: '12px' }} />
                                  </button>
                                </div>
                              </div>
                              <h6 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>{bill.description}</h6>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Amount:</span>
                                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>${parseFloat(bill.amount || '0').toFixed(2)}</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Paid by:</span>
                                <div className="d-flex align-items-center gap-1">
                                  <div style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    background: payer?.color || '#64748b'
                                  }} />
                                  <span style={{ color: 'white', fontSize: '0.875rem' }}>{payer?.name}</span>
                                </div>
                              </div>
                              <div style={{ marginTop: '0.5rem' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Split among:</span>
                                <div className="d-flex flex-wrap gap-1 mt-1">
                                  {bill.splitAmong.map(personId => {
                                    const person = persons.find(p => p.id === personId);
                                    return (
                                      <div
                                        key={personId}
                                        style={{
                                          background: person?.color || '#64748b',
                                          color: 'white',
                                          padding: '0.125rem 0.5rem',
                                          borderRadius: '12px',
                                          fontSize: '0.75rem',
                                          fontWeight: '500'
                                        }}
                                      >
                                        {person?.name}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

          {/* Right Panel - Results */}    
        </div>
<ResultsComponent></ResultsComponent>
        {/* Floating Calculate Button */}
        <CalculateButton></CalculateButton>

        {/* Bill Modal */}
        <BillModalComponent></BillModalComponent>
      </div>
    </div>
  );
}

export default CreateBill;