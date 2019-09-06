require('cypress-plugin-retries');
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

Cypress.on('uncaught:exception', hackToNotFailOnCancelledXHR);
Cypress.on('fail', hackToNotFailOnCancelledXHR);

function hackToNotFailOnCancelledXHR(err) {
  const realError = err.message.indexOf("Cannot set property 'aborted' of undefined") === -1;
  if (realError) throw err;
  else console.error(err); // eslint-disable-line no-console
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
