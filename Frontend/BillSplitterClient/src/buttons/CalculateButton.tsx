import { Zap } from "lucide-react";
import { useState } from "react";
import { Bill,Person,Results } from "../models/types";

function CalculateButton() {
    const personColors = [
  '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', 
  '#ef4444', '#ec4899', '#84cc16', '#6366f1'
];
     const [isCalculating, setIsCalculating] = useState(false);
     const [totalAmount, setTotalAmount] = useState('');
     const [bills, setBills] = useState<Bill[]>([]);
     const [persons, setPersons] = useState<Person[]>([
         { id: 1, name: 'Person 1', color: personColors[0], isActive: true },
         { id: 2, name: 'Person 2', color: personColors[1], isActive: true }
       ]);
       const [showResults, setShowResults] = useState(false);
       const [results, setResults] = useState<Results | null>(null);
      const calculateSplit = async () => {
    if (!totalAmount || bills.length === 0) return;

    setIsCalculating(true);
    
    // Simulate calculation delay for animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const totalBillAmount = bills.reduce((sum, bill) => sum + (parseFloat(bill.amount) || 0), 0);
    const enteredTotal = parseFloat(totalAmount);
    
    const personBalances: { [key: number]: { name: string; paid: number; owes: number; balance: number } } = {};
    persons.forEach(person => {
      personBalances[person.id] = {
        name: person.name,
        paid: 0,
        owes: 0,
        balance: 0
      };
    });

    bills.forEach(bill => {
      const amount = parseFloat(bill.amount) || 0;
      const paidBy = bill.paidBy;
      const splitCount = bill.splitAmong.length;
      
      if (splitCount > 0) {
        const perPersonAmount = amount / splitCount;
        
        personBalances[paidBy].paid += amount;
        
        bill.splitAmong.forEach(personId => {
          personBalances[personId].owes += perPersonAmount;
        });
      }
    });

    Object.keys(personBalances).forEach(personId => {
      const person = personBalances[Number(personId)];
      person.balance = person.paid - person.owes;
    });

    setResults({
      totalCalculated: totalBillAmount,
      totalEntered: enteredTotal,
      personBalances,
      isValid: Math.abs(totalBillAmount - enteredTotal) < 0.01
    });
    
    setIsCalculating(false);
    setShowResults(true);
  };
  return (
   <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000
        }}>
          <button
            onClick={calculateSplit}
            disabled={!totalAmount || bills.length === 0 || isCalculating}
            style={{
              background: (!totalAmount || bills.length === 0) 
                ? 'linear-gradient(45deg, #64748b, #6b7280)' 
                : 'linear-gradient(45deg, #8b5cf6, #a855f7)',
              border: 'none',
              borderRadius: '50px',
              padding: '1rem 2rem',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: (!totalAmount || bills.length === 0) 
                ? 'none' 
                : '0 8px 32px rgba(139, 92, 246, 0.4)',
              transform: isCalculating ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.2s ease-in-out',
              cursor: (!totalAmount || bills.length === 0) ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!(!totalAmount || bills.length === 0)) {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(-2px) scale(1.05)';
                target.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isCalculating) {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1)';
                target.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.4)';
              }
            }}
          >
            {isCalculating ? (
              <>
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Calculating...
              </>
            ) : (
              <>
                <Zap style={{ width: '24px', height: '24px' }} />
                🚀 Calculate Smart Split
              </>
            )}
          </button>
        </div>
  );
}
export default CalculateButton;