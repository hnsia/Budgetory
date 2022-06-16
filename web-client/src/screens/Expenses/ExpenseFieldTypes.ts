export const ExpenseTypesArray = ["Breakfast", "Lunch", "Dinner", "Snack", "Beverage", "Investments", "Electronics"] as const;
export type ExpenseTypes = typeof ExpenseTypesArray[number];

export const CurrenciesArray = ["MYR", "USD"] as const;
export type Currencies = typeof CurrenciesArray[number];