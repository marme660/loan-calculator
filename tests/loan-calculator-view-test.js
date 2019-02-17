describe("Loan calculator view", function() {
    it("should match the values in calculate loan", function() {
        expect(mortgageCalculator.calculateMortgage({
            "initialDeposit": 20000,
            "monthlyIncome": 2000,
            "interest": 3,
            "term": 20,
            "monthlyExpenses": 800
        })).toEqual({
            maxMonthlyPayment: 432,
            mortgageTotal: 77894.3150262,
            totalPriceHouse: 97894.3150262,
            totalInterest: 1509.0217746
        });
    });
});