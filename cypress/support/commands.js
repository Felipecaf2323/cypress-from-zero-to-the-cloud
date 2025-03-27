Cypress.Commands.add('fillMandatoryFieldsAndSubmit' , (data = {
    firstName: "Felipe",
    lastName: "Seugling",
    email: "email@teste.com",
    text: "testando",
  })=>{
    cy.get('#firstName').type(data.firstName);
    cy.get('#lastName').type(data.lastName);
    cy.get('#email').type(data.email);
    cy.get('#open-text-area').type(data.text);
    cy.contains('button' , "Send").click();
})