import { Receipt, Plus } from "lucide-react";
import { useState } from "react";
import { Bill } from "../models/types";
import { Person } from "../models/types";
function BillsComponent() {
    const personColors = [
  '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', 
  '#ef4444', '#ec4899', '#84cc16', '#6366f1'
];
    const billCategories = ['🍽️ Food', '🚗 Transport', '🏠 Utilities', '🎉 Entertainment', '🛒 Shopping', '💊 Health', '📚 Other'];
    const [bills, setBills] = useState<Bill[]>([]);
    const [editingBill, setEditingBill] = useState<Bill | null>(null);
    const [showBillModal, setShowBillModal] = useState(false);
    const [persons, setPersons] = useState<Person[]>([
        { id: 1, name: 'Person 1', color: personColors[0], isActive: true },
        { id: 2, name: 'Person 2', color: personColors[1], isActive: true }
      ]);
    const [newBill, setNewBill] = useState<Bill>({
        id: 0,
        description: '',
        amount: '',
        paidBy: 1,
        splitAmong: [],
        category: billCategories[0]
      });

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
  return (
    <div className="col-12">
                <div style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #475569',
                  borderRadius: '16px',
                  padding: '1.5rem'
                }}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="d-flex align-items-center gap-2 mb-0" style={{ color: 'white', fontWeight: '600' }}>
                      <Receipt style={{ width: '20px', height: '20px', color: '#a78bfa' }} />
                      Bills & Expenses ({bills.length})
                    </h5>
                    <button
                      onClick={() => openBillModal()}
                      className="btn btn-primary"
                      style={{
                        background: 'linear-gradient(45deg, #8b5cf6, #a855f7)',
                        border: 'none',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Plus style={{ width: '16px', height: '16px' }} />
                      Add Bill
                    </button>
                  </div>

                  </div>
                  </div>
  );
}
export default BillsComponent;