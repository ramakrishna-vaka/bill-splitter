package com.smartbill.models;

public class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    // equals & hashCode are needed for Map keys
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Person)) return false;
        return name.equals(((Person) obj).name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
