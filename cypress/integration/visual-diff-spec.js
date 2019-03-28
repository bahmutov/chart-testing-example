/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit('/')
  // let the chart load by observing the rendered bars
  cy.get('.frappe-chart g.dataset-0 rect').should('have.length', 4)
})

it('shows tooltip for each season', () => {
  // start new batch of images
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
      .wait(1000)

    cy.get('.graph-svg-tip', { log: false }).should('contain', label)

    // we limit the visual diff to the chart
    cy.eyesCheckWindow({
      sizeMode: 'selector',
      selector: '.frappe-chart'
    })
  })

  cy.eyesClose() // tell Applitools we are done
})
