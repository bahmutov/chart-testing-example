/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit('/')
  // let the chart load by observing the rendered bars
  cy.get('.frappe-chart g.dataset-0 rect').should('have.length', 4)
})

const tooltipHidden = () =>
  // initially the tooltip is not visible
  // because element is set to be hidden using attribute style="opacity:0"
  // we should check its visibility using "have.css" assertion
  cy.get('.graph-svg-tip').should('have.css', 'opacity', '0')

const tooltipVisible = () =>
  cy.get('.graph-svg-tip').should('have.css', 'opacity', '1')

it('shows tooltip for each season', () => {
  const rectangles = '.frappe-chart g.dataset-0 rect'

  ;[0, 1, 2, 3].forEach(k => {
    cy.get(rectangles)
      .eq(k)
      .trigger('mousemove')
      .wait(1000)
  })
})
