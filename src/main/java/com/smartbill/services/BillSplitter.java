package com.smartbill.services;

import com.smartbill.models.Expense;
import com.smartbill.models.Person;

import java.util.*;

public class BillSplitter {
    private List<Person> people;
    private List<Expense> expenses;

    public BillSplitter(List<Person> people) {
        this.people = people;
        this.expenses = new ArrayList<>();
    }

    public void addExpense(Expense expense) {
        expenses.add(expense);
    }

    public Map<Person, Map<Person, Double>> calculateDebts() {
        Map<Person, Double> netBalances = new HashMap<>();

        for (Expense expense : expenses) {
            double amountPerPerson = expense.getAmount() / expense.getSharedBy().size();

            for (Person person : expense.getSharedBy()) {
                netBalances.put(person, netBalances.getOrDefault(person, 0.0) - amountPerPerson);
            }

            netBalances.put(expense.getPaidBy(),
                    netBalances.getOrDefault(expense.getPaidBy(), 0.0) + expense.getAmount());
        }

        // Convert net balances into "who owes whom"
        return simplifyDebts(netBalances);
    }

    private Map<Person, Map<Person, Double>> simplifyDebts(Map<Person, Double> net) {
        Map<Person, Map<Person, Double>> result = new HashMap<>();

        List<Map.Entry<Person, Double>> creditors = new ArrayList<>();
        List<Map.Entry<Person, Double>> debtors = new ArrayList<>();

        for (Map.Entry<Person, Double> entry : net.entrySet()) {
            if (entry.getValue() > 0) creditors.add(entry);
            else if (entry.getValue() < 0) debtors.add(entry);
        }

        int i = 0, j = 0;
        while (i < debtors.size() && j < creditors.size()) {
            Person debtor = debtors.get(i).getKey();
            double debt = -debtors.get(i).getValue();

            Person creditor = creditors.get(j).getKey();
            double credit = creditors.get(j).getValue();

            double min = Math.min(debt, credit);

            result.computeIfAbsent(debtor, k -> new HashMap<>()).put(creditor, min);

            debtors.get(i).setValue(-1 * (debt - min));
            creditors.get(j).setValue(credit - min);

            if (debt - min == 0) i++;
            if (credit - min == 0) j++;
        }

        return result;
    }
}
