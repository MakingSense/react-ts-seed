// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.LocalStorage.clear = () => {/** */ };

// Cypress.Commands.add('login', (() => {
//   let token;
//   return () => {
//     if (token) {
//       window.localStorage.setItem('token', token);
//     } else {
//       cy.request({
//         method: 'POST',
//         url: '',
//         body: { }
//       }).then(res => {
//         token = res.body.token;
//         window.localStorage.setItem('token', res.body.token);
//       });
//     }
//   }
// })()
// );
