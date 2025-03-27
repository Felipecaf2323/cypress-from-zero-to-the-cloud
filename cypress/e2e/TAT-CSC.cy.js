beforeEach(() => {
  cy.visit('./src/index.html');
})

afterEach(()=>{
  cy.get('h1').should("be.visible")
})

describe('TAT Customer Service Center', () => {
  it('checks the application title', () => {
    cy.title().should('be.equal', 'TAT Customer Service Center');
  })

  //ex1
  it('fills in the required fields and submits the form', () => {
    const longText = Cypress._.repeat('abcdefgh' , 10);

    cy.get('#firstName').type('Felipe');
    cy.get('#lastName').type('Seugling');
    cy.get('#email').type('emailTeste@gmail.com');
    cy.get('#open-text-area').type(longText , {delay: 0});
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  //ex 2 
  it('displays an error message when submitting the form with an email with invalid formatting', () =>{
    cy.get('#firstName').type('Felipe');
    cy.get('#lastName').type('Seugling');
    cy.get('#email').type('emailTestegmail.com');
    cy.contains('button' , "Send").click();

    cy.get('.error').should('be.visible');
  })

  //ex 3:
  it('validating the phone field only accepts numbers' , () =>{
    cy.get('#phone').type('Felipe Padovani').should('have.value' , '')
  })

  //ex 4:
  it('displays an error message when the phone becomes required but is not filled in before the form submission' , () =>{
    cy.get('#phone-checkbox').click()
    cy.contains('button' , "Send").click();

    cy.get('.error').should('be.visible');
  })

  //ex 5:
  it('fills and clears the first name, last name, email, and phone fields' , () =>{
    cy.get('#firstName').type('Felipe').should('have.value' , 'Felipe')
    cy.get("#lastName").type("Seugling").should('have.value' , 'Seugling')
    cy.get("#email").type("emaildeTeste@teste.com").should("have.value" , "emaildeTeste@teste.com")
    cy.get("#phone").type("439968454635").should("have.value" , "439968454635")

    cy.get("#firstName").clear().should("have.value" , "")
    cy.get("#lastName").clear().should("have.value" , "")
    cy.get("#email").clear().should("have.value" , "")
    cy.get("#phone").clear().should("have.value" , "")
  })

  //ex 6:
  it("displays an error message when submitting the form without filling the required fields" , ()=>{
    cy.get(".button").click()

    cy.get(".error").should("be.visible")
  })

  //ex 7:
  it("successfully submits the form using a custom command" , () =>{
    const data = {
      firstName: "Felipe",
      lastName: "Seugling",
      email: "email@teste.com",
      text: "testando",
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should("be.visible")
  })

  it('selects a product (YouTube) by its content', ()=>{
   cy.get("#product").select("YouTube").should("have.value" , "youtube")
  })

  it('selects a product (Mentorship) by its value' , () =>{
    cy.get("#product").select('mentorship').should('have.value' , 'mentorship')
  })

  it('selects a product (Blog) bys its index', ()=>{
    cy.get("#product").select(1).should("have.value" , "blog")
  })

  it('checks the type of service "Feedback"', ()=>{
    cy.get('input[type=radio][value=feedback]').check().should('be.checked')
  })

  it('checks each type of service', ()=>{
   cy.get("#support-type") //pega a div
    .find('input[type=radio]') // pega todos do tipo input radio
      .each(typeOfService=>{ // para cada um deste tipo
        cy.wrap(typeOfService) //envelopa o tipo que quero
        .check()
        .should("be.checked")
   })
  })

  it('verifies that the privacy policy page opens in another tab without theneed for a click', ()=>{
    cy.contains('a' , 'Privacy Policy')
    .should('have.attr', 'target','_blank')
    .should('have.attr', 'href', 'privacy.html')
  })

  it('access the privacy policy page by removing the target, then clicking on the link', ()=>{
    cy.contains('a' , 'Privacy Policy')
    .invoke('removeAttr','target')
    .click()
    cy.contains('h1' , 'TAT CSC - Privacy Policy').should('be.visible')
  })

})