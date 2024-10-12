beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('johnDoe')
        cy.get('#email').type('test@domen.com')
        cy.get('[data-cy="name"]').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('input[name="password"]').type('Secret123')
        cy.get('input[name="confirm"]').type('Password123')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')
        cy.get('input[name="confirm"]').clear()
        cy.get('input[name="confirm"]').type('Secret123')
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('johnDoe')
        cy.get('#email').type(myEmail)
        cy.get('[data-cy="name"]').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('#cssFavLanguage').check()
        cy.get('#vehicle2').check()
        cy.get('select[name="cars"]').select('Saab').should('have.value','saab')
        cy.get('select[name="animal"]').select('Snake').should('have.value','snake')
        cy.get('input[name="password"]').type(password)
        cy.get('input[name="confirm"]').type(password)
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('johnDoe')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can not submit form with mandatory username missing', ()=>{
        inputValidData('johnDoe')
        cy.get('input[data-testid="user"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    })

    it('User can not submit form with mandatory email missing', ()=>{
        inputValidData('johnDoe')
        cy.get('#email').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    })

    it('User can not submit form with mandatory first name missing', ()=>{
        inputValidData('johnDoe')
        cy.get('[data-cy="name"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    })

    it('User can not submit form with mandatory last name missing', ()=>{
        inputValidData('johnDoe')
        cy.get('#lastName').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    }) 
    
    it('User can not submit form with mandatory phone number missing', ()=>{
        inputValidData('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {

    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').eq(0).should('have.attr', 'src').and('include', 'cerebrum_hub_logo')
        cy.get('img').eq(0).invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').and('include', 'cypress_logo')
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 120)
            .and('be.greaterThan', 80)
    })

    it('Check navigation part and the first link', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check the second link in the navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkboxes list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

    it('Check that the list of checkboxes is correct by another way', () => {
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)
            .each(($checkbox) => {
                cy.wrap($checkbox).should('not.be.checked')
            })
        cy.get('input[class="checkbox vehicles"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[class="checkbox vehicles"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[class="checkbox vehicles"]').next().eq(2).should('have.text', 'I have a boat')
    
        cy.get('input[class="checkbox vehicles"]').eq(0).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(0).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').eq(1).should('have.text', 'Saab')
        cy.get('#cars').find('option').eq(2).should('have.text', 'Opel')
        cy.get('#cars').find('option').eq(3).should('have.text', 'Audi')
    })

    it('Animal dropdown is correct', () => {
        cy.get('#animal').select(2).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })

})


function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type(myEmail)
    cy.get('[data-cy="name"]').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type(password)
    cy.get('#confirm').type(password)
    cy.get('h2').contains('Password').click()
}

let myEmail = 'validemail@yeap.com'
let password = 'Secret123'
let firstName = 'John'
let lastName = 'Doe'
