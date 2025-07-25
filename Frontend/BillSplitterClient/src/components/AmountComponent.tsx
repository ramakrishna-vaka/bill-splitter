import { DollarSign,Info } from "lucide-react";
import { useState } from "react";
import { Bill } from "../models/types";

function AmountComponent() {
    const [totalAmount, setTotalAmount] = useState('');
    const [bills, setBills] = useState<Bill[]>([]);
    const totalBillAmount = bills.reduce((sum, bill) => sum + (parseFloat(bill.amount) || 0), 0);
  return (
    <div className="col-12">
                <div style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #475569',
                  borderRadius: '16px',
                  padding: '1.5rem'
                }}>
                  <h5 className="d-flex align-items-center gap-2 mb-3" style={{ color: 'white', fontWeight: '600' }}>
                    <DollarSign style={{ width: '20px', height: '20px', color: '#a78bfa' }} />
                    Expected Total
                    <div className="position-relative">
                      <Info style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0, 0, 0, 0.9)',
                        color: 'white',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        opacity: 0,
                        pointerEvents: 'none',
                        transition: 'opacity 0.2s'
                      }}
                      className="tooltip-text">
                        Total amount you expect all bills to add up to
                      </div>
                    </div>
                  </h5>
                  <div className="row align-items-end">
                    <div className="col-md-6">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        placeholder="Enter expected total amount..."
                        className="form-control"
                        style={{
                          background: '#475569',
                          border: '1px solid #64748b',
                          borderRadius: '12px',
                          color: 'white',
                          padding: '0.75rem 1rem',
                          fontSize: '1.1rem'
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: '#94a3b8' }}>Bills Total:</span>
                        <span style={{
                          color: totalBillAmount > 0 ? '#22c55e' : '#94a3b8',
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          ${totalBillAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  );
}
export default AmountComponent;