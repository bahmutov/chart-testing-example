/// <reference types="Cypress" />
import { labels } from '../../labels'
beforeEach(() => {
  cy.visit('/')
  // let the chart load by observing the rendered bars
  cy.get('.frappe-chart g.dataset-0 rect').should('have.length', 4)
})

it('shows tooltip for each imported label', () => {
  const rectangles = '.frappe-chart g.dataset-0 rect'

  labels.forEach((label, k) => {
    cy.get(rectangles)
      .eq(k)
      .trigger('mousemove')
      .wait(500)

    cy.get('.graph-svg-tip', { log: false }).should('contain', label)
  })
})
