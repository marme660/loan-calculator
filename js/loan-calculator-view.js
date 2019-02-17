var LoanCalculatorView = Backbone.View.extend({
    el: '#loan-calculator',

    events: {
        'keypress .loan-input': 'clickInput',
        'change .slider': 'clickSlider'
    },

    render: function() {
        this.$el.html(LoanCalculatorView.templates.form());
        this.getElements();
        this.getUserInput();
        this.calculateLoan();
        this.displayPlan();
    },

    getElements: function() {
        this.$interestInput = $("#interest-input");
        this.$termInput = $("#term-input");
        this.$interestSlider = $("#interest-slider");
        this.$durationSlider = $("#duration-slider");
    },

    displayPlan: function() {
        $('#plan').html(LoanCalculatorView.templates.plan({
            max_monthly_payment: this.getMaxMonthlyPayment(),
            total_interest: this.getTotalInterest()
        }));
    },

    getMaxMonthlyPayment: function() {
        return mortgageCalculator.formatMoney(this.mortgageObject.maxMonthlyPayment);
    },

    getTotalInterest: function() {
        return this.mortgageObject.totalInterest;
    },

    clickSlider: function() {
        this.updateInterestAndTermInputs();
        this.getUserInput();
        this.calculateLoan();
        this.displayPlan();
    },

    updateInterestAndTermInputs: function() {
        this.$interestInput.val(parseInt(this.$interestSlider.val()));
        this.$termInput.val(parseInt(this.$durationSlider.val()));
    },

    clickInput: function(e) {
        if (e.keyCode === 13) {
            this.getUserInput();
            this.adjustInterestSlider();
            this.adjustDurationSlider();
            this.calculateLoan();
            this.displayPlan();
        }
    },

    getUserInput: function() {
        this.initialDeposit = this.getFieldValue("initial-deposit");
        this.monthlyIncome = this.getFieldValue("monthly-income");
        this.monthlyExpenses = this.getFieldValue("monthly-expenses");
        this.interest = this.getFieldValue("interest-input");
        this.duration = this.getFieldValue("term-input");

        this.validateUserInput();
    },

    getFieldValue: function(id) {
        return parseInt($('#' + id).val().trim());
    },

    validateUserInput: function() {
        if (this.interest > 5) {
            this.interest = 5;
            this.$interestInput.val(this.interest);
            this.adjustInterestSlider();
        } else if (this.duration > 30) {
            this.duration = 30;
            this.$termInput.val(this.duration);
            this.adjustDurationSlider();
        }
    },

    adjustInterestSlider: function() {
        this.$interestSlider.val(this.interest);
    },

    adjustDurationSlider: function() {
        this.$durationSlider.val(this.duration);
    },

    calculateLoan: function() {
        this.mortgageObject = mortgageCalculator.calculateMortgage({
            "initialDeposit": this.initialDeposit,
            "monthlyIncome": this.monthlyIncome,
            "interest": this.interest,
            "term": this.duration,
            "monthlyExpenses": this.monthlyExpenses
        });
    }
});