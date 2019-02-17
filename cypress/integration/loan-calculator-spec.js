describe('Loan calculator', function() {
    it('Successfully get user input', function() {
        cy.visit('http://localhost:3000')
        cy.get('#initial-deposit').clear()
        cy.get('#initial-deposit').type(20000)
        cy.get('#initial-deposit').should('have.value','20000')

        cy.get('#monthly-income').clear()
        cy.get('#monthly-income').type(500000)
        cy.get('#monthly-income').should('have.value','500000')

        cy.get('#monthly-expenses').clear()
        cy.get('#monthly-expenses').type(10000)
        cy.get('#monthly-expenses').should('have.value','10000')

        cy.get('#interest-input').clear()
        cy.get('#interest-input').type(2)
        cy.get('#interest-input').should('have.value','2')

        cy.get('#term-input').clear()
        cy.get('#term-input').type(20)
        cy.get('#term-input').should('have.value','20')
    })

    it('Should change interest and duration input value when sliders change', function() {
        cy.get('#interest-slider').as('range').invoke('val', 5).trigger('change')
        cy.get('#duration-slider').as('range').invoke('val', 1).trigger('change')
        cy.get('#interest-input').should('have.value','5')
        cy.get('#duration-slider').should('have.value','1')
    })
})