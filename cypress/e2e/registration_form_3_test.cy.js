beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */
describe('Section 1: Visual tests for registration form 3', () => {

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })
    
    it('The city dropdown is inactive without selecting a country or select empty country value', () => {
        cy.get('label[for="country"]').click()
        cy.get('select[id="country"]').select('')
        cy.screenshot('Full page screenshot city dropdown is inactive')
        cy.get('#city').should('be.disabled')
    })

    it('Country dropdown is correct', () => {
        cy.get('#country').select(1).screenshot('Country dropdown')
        cy.screenshot('Full page screenshot')
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'object:3', 'object:4', 'object:5'])
        })
    })

    it('City dropdown is correct for Spain / Country Object:3', () => {
        cy.log('Will select a country to activate the city dropdown')
        cy.get('select[id="country"]').select('Spain').should('have.value','object:3')
        cy.get('#city').select(1).screenshot('Spain cities dropdown')
        cy.screenshot('Full page screenshot Spain')
        cy.log('Will check the city dropdown')
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Malaga', 'string:Madrid', 'string:Valencia', 'string:Corralejo'])
        })
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        })
    })

    it('City dropdown is correct for Estonia / Country Object:4', () => {
        cy.log('Will select a country to activate the city dropdown')
        cy.get('select[id="country"]').select('Estonia').should('have.value','object:4')
        cy.get('#city').select(1).screenshot('Estonia cities dropdown')
        cy.screenshot('Full page screenshot Estonia')
        cy.log('Will check the city dropdown')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Tallinn', 'string:Haapsalu', 'string:Tartu'])
        })
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Tallinn', 'Haapsalu', 'Tartu'])
        })
    })

    it('City dropdown is correct for Austria / Country Object:5', () => {
        cy.log('Will select a country to activate the city dropdown')
        cy.get('select[id="country"]').select('Austria').should('have.value','object:5')
        cy.get('#city').select(1).screenshot('Austria cities dropdown')
        cy.screenshot('Full page screenshot Austria')
        cy.log('Will check the city dropdown')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Vienna', 'string:Salzburg', 'string:Innsbruck'])
        })
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Vienna', 'Salzburg', 'Innsbruck'])
        })
    })

    it('List of cities changes depending on the choice of country', () => {
        cy.log('Will select a Spain country to activate and check the city dropdown')
        cy.get('select[id="country"]').select('Spain').should('have.value','object:3')
        cy.get('#city').select(1).screenshot('Country dropdown')
        cy.screenshot('Full page screenshot Spain')
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Malaga', 'string:Madrid', 'string:Valencia', 'string:Corralejo'])
        })
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        })
        cy.log('Will change the country to Estonia to check the changes in the city dropdown')
        cy.get('select[id="country"]').select('Estonia').should('have.value','object:4')
        cy.get('#city').select(1).screenshot('Country dropdown')
        cy.screenshot('Full page screenshot Spain to Estonia')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Tallinn', 'string:Haapsalu', 'string:Tartu'])
        })
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Tallinn', 'Haapsalu', 'Tartu'])
        })
        cy.log('Will change the country to Austria to check the changes in the city dropdown')
        cy.get('select[id="country"]').select('Austria').should('have.value','object:5')
        cy.get('#city').select(1).screenshot('Country dropdown')
        cy.screenshot('Full page screenshot Estonia to Austria')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Vienna', 'string:Salzburg', 'string:Innsbruck'])
        })
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Vienna', 'Salzburg', 'Innsbruck'])
        })
        cy.log('Will change the country to Spain to check the changes in the city dropdown')
        cy.get('select[id="country"]').select('Spain').should('have.value','object:3')
        cy.get('#city').select(1).screenshot('Country dropdown')
        cy.screenshot('Full page screenshot')
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Malaga', 'string:Madrid', 'string:Valencia', 'string:Corralejo'])
        })
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        })
    })

    it('List of cities changes depending on the choice of country by another way & empty first value for city is editable', () => {
        const checkCityDropdown = (country, countryValue, expectedCities) => {
            cy.log(`Checking country: ${country}`)
            cy.get('select[id="country"]').select(country).should('have.value', countryValue)
            cy.log('Will take screenshots')
            cy.get('#city').select(1).screenshot(`${country} dropdown`)
            cy.screenshot(`Full page screenshot of cities changes for ${country}`)
            cy.log('Will check the dropdown of cities')
            cy.get('#city').children().should('have.length', expectedCities.length + 1)
            cy.get('#city').find('option').then(options => {
                const actualValues = [...options].map(option => option.value)
                expect(actualValues).to.deep.eq(['', ...expectedCities.map(city => `string:${city}`)])
            })
            cy.get('#city').find('option').then(options => {
                const actualLabels = [...options].map(option => option.label)
                expect(actualLabels).to.deep.eq(['', ...expectedCities])
            })
        }
        checkCityDropdown('Spain', 'object:3', ['Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        checkCityDropdown('Estonia', 'object:4', ['Tallinn', 'Haapsalu', 'Tartu'])
        checkCityDropdown('Austria', 'object:5', ['Vienna', 'Salzburg', 'Innsbruck'])
    })

    it('City choice should be removed when country is updated', () => {
        cy.get('select[id="country"]').select('Spain').should('have.value','object:3')
        cy.get('select[id="city"]').select('Malaga').invoke('val').should('deep.equal', ['string:Malaga'])
        cy.screenshot('Full page screenshot country update step 1')
        cy.get('#country').select('Estonia').should('have.value', 'object:4')
        cy.get('#city').invoke('val').should('deep.equal', [])
        cy.screenshot('Full page screenshot country update step 2')        
    })
    
    it('Check that privacy and cookie policy checkboxes are correct', () => {
        cy.contains('Accept our privacy policy').should('exist')
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('exist')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('button a').should('have.text', 'Accept our cookie policy')
            .should('have.attr', 'href', 'cookiePolicy.html')
            .click()
        cy.url().should('contain', '/cookiePolicy.html')
        cy.go('back')
        cy.log('Back again in registration form 3')
    })
    
    it('Email input should support correct pattern', () => {
        cy.get('input[name="email"]').type('example@example.com').should('have.value', 'example@example.com');
        cy.get('#emailAlert span').should('not.be.visible')
        cy.get('input[name="email"]').clear().type('invalid-email')
        cy.screenshot('Full page screenshot invalid email')
        cy.get('#emailAlert span').should('have.css', 'color', 'rgb(255, 0, 0)')
            .and('contain', 'Invalid email address.')
        cy.get('input[type="submit"]').should('not.be.enabled')   
    })

})



/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */
describe('Section 1: Functional tests for registration form 3', () => {

    it('User can submit form with all fields added', () => {
        cy.get('#name').type('John')
        cy.get('input[name="email"]').type('example@example.com')
        cy.get('select[id="country"]').select('Spain').should('have.value','object:3')
        cy.get('select[id="city"]').select('Malaga').invoke('val').should('deep.equal', ['string:Malaga'])
        cy.get('input[type="date"]').eq(0).type('2024-01-01').should('have.value', '2024-01-01')
        cy.get('input[type="radio"]').eq(0).check().should('have.value','Daily')
        cy.get('input[type="date"]').eq(1).type('1982-10-28').should('have.value', '1982-10-28')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('h2').contains('Birthday').click()
        cy.get('input[type="submit"]').should('be.enabled').click()
        cy.url().should('contain', '/upload_file.html')
        cy.get('h1').contains('Submission received')
        cy.go('back')
        cy.log('Back again in registration form 3')
    })
        
    it('User can submit form with valid mandatory data', () => {
        cy.get('input[name="email"]').type('example@example.com')
        cy.get('select[id="country"]').select('Spain').should('have.value','object:3')
        cy.get('select[id="city"]').select('Malaga').invoke('val').should('deep.equal', ['string:Malaga'])
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('h2').contains('Birthday').click()
        cy.get('input[type="submit"]').should('be.enabled').click()
        cy.url().should('contain', '/upload_file.html')
        cy.get('h1').contains('Submission received')
        cy.go('back')
        cy.log('Back again in registration form 3')
    })

    it('User can not submit form with mandatory email missing', () => {
        inputValidData(email)
        cy.get('input[name="email"]').clear()
        cy.get('#emailAlert span').should('have.css', 'color', 'rgb(255, 0, 0)')
            .and('contain', 'Email is required.')
        cy.get('span[id="successFrame"]').should('not.be.enabled')
        cy.get('input[type="submit"]').should('not.be.enabled')
    })
    
    it('User can not submit form with mandatory city missing', () => {
        inputValidData(email)
        cy.get('#city').select(0)
        cy.get('span[id="successFrame"]').should('not.be.enabled')
        cy.get('input[type="submit"]').should('not.be.enabled')
    })

    it('User can not submit form with mandatory accept privacy policy missing', () => {
        inputValidData(email)
        cy.get('input[type="checkbox"]').eq(0).uncheck()
        cy.get('span[id="successFrame"]').should('not.be.enabled')
        cy.get('input[type="submit"]').should('not.be.enabled')
    })

    it('User can add file', () => {   
        const fileName = 'example_file_for_tests.txt'
        cy.get('input[type="file"]').should('have.value', '')
        cy.get('input[type="file"]').attachFile(fileName)
        cy.get('input[type="file"]').should('have.value', 'C:\\fakepath\\example_file_for_tests.txt')
        cy.get('button[type="submit"]').click()
        cy.url().should('contain', '/upload_file.html')
        cy.get('h1').contains('Submission received')
        cy.go('back')
        cy.log('Back again in registration page')
        cy.url().should('contain', '/registration_form_3.html')
    })
})

function inputValidData(email) {
    cy.log('Email will be filled')
    cy.get('input[name="email"]').type(email)
    cy.get('select[id="country"]').select('Spain').should('have.value','object:3')
    cy.get('select[id="city"]').select('Malaga').invoke('val').should('deep.equal', ['string:Malaga'])
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    cy.get('h2').contains('Birthday').click()
}

let email = 'example@example.com'