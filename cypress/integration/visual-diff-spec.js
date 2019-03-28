/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit('/')
  // let the chart load by observing the rendered bars
  cy.get('.frappe-chart g.dataset-0 rect').should('have.length', 4)
})

it('shows tooltip for each season', () => {
  cy.eyesOpen({
    appName: 'chart-testing-example',
    batchName: 'tooltips'
  })

  const rectangles = '.frappe-chart g.dataset-0 rect'

  const labels = ['winter', 'spring', 'summer', 'fall']

  labels.forEach((label, k) => {
    cy.get(rectangles)
      .eq(k)
      .trigger('mousemove')
      .wait(500)

    cy.get('.graph-svg-tip', { log: false }).should('contain', label)

    cy.eyesCheckWindow({
      sizeMode: 'selector',
      selector: '.frappe-chart'
    })
  })
})
