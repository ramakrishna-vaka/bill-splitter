import { DollarSign, Check, X, Calculator } from "lucide-react";
import { useState } from "react";
import { Person, Bill, Results } from "../models/types";

function ResultsComponent() {
    const personColors = [
  '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', 
  '#ef4444', '#ec4899', '#84cc16', '#6366f1'
];
const [results, setResults] = useState<Results | null>(null);
    const [persons, setPersons] = useState<Person[]>([
        { id: 1, name: 'Person 1', color: personColors[0], isActive: true },
        { id: 2, name: 'Person 2', color: personColors[1], isActive: true }
      ]);
        const [showResults, setShowResults] = useState(false);
    const personBalances: { [key: number]: { name: string; paid: number; owes: number; balance: number } } = {};
    persons.forEach(person => {
      personBalances[person.id] = {
        name: person.name,
        paid: 0,
        owes: 0,
        balance: 0
      };
    });
  return (
    <div className="col-lg-4">
    <div style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #475569',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  position: 'sticky',
                  top: '1.5rem'
                }}>
                  <h5 className="d-flex align-items-center gap-2 mb-4" style={{ color: 'white', fontWeight: '600' }}>
                    <DollarSign style={{ width: '20px', height: '20px', color: '#a78bfa' }} />
                    Results
                  </h5>
    {!showResults ? (
                <div className="text-center py-5">
                  <Calculator style={{ width: '64px', height: '64px', color: '#475569', marginBottom: '1rem' }} />
                  <p style={{ color: '#94a3b8', margin: 0 }}>
                    🧮 Let's split smart. Add bills and calculate to see the magic!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Validation */}
                  <div style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    background: results?.isValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${results?.isValid ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                    color: results?.isValid ? '#22c55e' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {results?.isValid ? (
                      <Check style={{ width: '20px', height: '20px' }} />
                    ) : (
                      <X style={{ width: '20px', height: '20px' }} />
                    )}
                    <div>
                      <div style={{ fontWeight: 'bold' }}>
                        {results?.isValid ? 'Perfect Match! ✅' : 'Amount Mismatch ⚠️'}
                      </div>
                      <small>
                        Bills: ${results?.totalCalculated.toFixed(2)} | Expected: ${results?.totalEntered.toFixed(2)}
                      </small>
                    </div>
                  </div>

                  {/* Person Balances */}
                  {results && Object.entries(results.personBalances).map(([personId, balance]) => {
                    const person = persons.find(p => p.id === parseInt(personId));
                    return (
                      <div key={personId} style={{
                        background: 'rgba(51, 65, 85, 0.5)',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: `2px solid ${person?.color || '#64748b'}`
                      }}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: person?.color || '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            {balance.name.charAt(0).toUpperCase()}
                          </div>
                          <h6 style={{ color: 'white', margin: 0 }}>{balance.name}</h6>
                        </div>
                        <div style={{ fontSize: '0.875rem' }}>
                          <div className="d-flex justify-content-between">
                            <span style={{ color: '#94a3b8' }}>Paid:</span>
                            <span style={{ color: '#22c55e' }}>${balance.paid.toFixed(2)}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span style={{ color: '#94a3b8' }}>Owes:</span>
                            <span style={{ color: '#ef4444' }}>${balance.owes.toFixed(2)}</span>
                          </div>
                          <hr style={{ borderColor: '#64748b', margin: '0.5rem 0' }} />
                          <div className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>
                            <span style={{ color: 'white' }}>Balance:</span>
                            <span style={{ color: balance.balance >= 0 ? '#22c55e' : '#ef4444' }}>
                              {balance.balance >= 0 ? '+' : ''}${balance.balance.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Settlement Summary */}
                  <div style={{
                    background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '12px',
                    padding: '1rem'
                  }}>
                    <h6 style={{ color: 'white', marginBottom: '1rem' }}>💰 Settlement Summary</h6>
                    <div style={{ fontSize: '0.875rem' }}>
                      {results && Object.entries(results.personBalances).map(([personId, balance]) => {
                        if (balance.balance < -0.01) {
                          return (
                            <p key={personId} style={{ margin: '0.5rem 0', color: '#94a3b8' }}>
                              {balance.name} owes <span style={{ color: '#ef4444', fontWeight: 'bold' }}>${Math.abs(balance.balance).toFixed(2)}</span>
                            </p>
                          );
                        } else if (balance.balance > 0.01) {
                          return (
                            <p key={personId} style={{ margin: '0.5rem 0', color: '#94a3b8' }}>
                              {balance.name} gets back <span style={{ color: '#22c55e', fontWeight: 'bold' }}>${balance.balance.toFixed(2)}</span>
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              )}
              </div>
              </div>
  );
}
export default ResultsComponent;