/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit('/')
  // let the chart load by observing the rendered bars
  cy.get('.frappe-chart g.dataset-0 rect').should('have.length', 4)
})

it('shows tooltip for each season', () => {
  const rectangles = '.frappe-chart g.dataset-0 rect'

  const labels = ['winter', 'spring', 'summer', 'fall']

  ;[0, 1, 2, 3].forEach(k => {
    cy.get(rectangles)
      .eq(k)
      .trigger('mousemove')
      .wait(500)

    cy.get('.graph-svg-tip', { log: false }).should('contain', labels[k])
  })
})

it.only('shows tooltip for each defined label', () => {
  const rectangles = '.frappe-chart g.dataset-0 rect'

  cy.window()
    .its('chart.data.labels')
    // make sure we have a valid list with labels
    .should('have.length.gt', 0)
    .then(labels => {
      labels.forEach((label, k) => {
        cy.get(rectangles)
          .eq(k)
          .trigger('mousemove')
          .wait(500)

        cy.get('.graph-svg-tip', { log: false }).should('contain', label)
      })
    })
})
