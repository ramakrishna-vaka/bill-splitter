package com.smartbill.test;

import com.smartbill.models.Person;
import com.smartbill.models.Expense;
import com.smartbill.services.BillSplitter;

import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Person 1");
        Person p2 = new Person("Person 2");
        Person p3 = new Person("Person 3");
        Person p4 = new Person("Person 4");
        Person p5 = new Person("Person 5");

        List<Person> people = List.of(p1, p2, p3, p4, p5);
        BillSplitter splitter = new BillSplitter(people);

        splitter.addExpense(new Expense("Meal", 500, p1, List.of(p1, p2, p3)));
        splitter.addExpense(new Expense("Coffee", 200, p2, List.of(p4, p5)));
        splitter.addExpense(new Expense("Snacks", 300, p5, List.of(p1, p2)));

        Map<Person, Map<Person, Double>> result = splitter.calculateDebts();

        for (Person from : result.keySet()) {
            for (Map.Entry<Person, Double> entry : result.get(from).entrySet()) {
                System.out.println(from.getName() + " owes " + entry.getKey().getName() + ": ₹" + String.format("%.2f", entry.getValue()));
            }
        }
    }
}
