var App = Backbone.View.extend({
    initialize: function() {
        new LoanCalculatorView().render();
    }
});

$(function() {
    new App();
});
