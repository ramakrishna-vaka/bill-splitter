package com.smartbill.models;

import java.util.List;

public class Expense {
    private String description;
    private double amount;
    private Person paidBy;
    private List<Person> sharedBy;

    public Expense(String description, double amount, Person paidBy, List<Person> sharedBy) {
        this.description = description;
        this.amount = amount;
        this.paidBy = paidBy;
        this.sharedBy = sharedBy;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    public Person getPaidBy() {
        return paidBy;
    }

    public List<Person> getSharedBy() {
        return sharedBy;
    }
}
