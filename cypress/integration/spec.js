/// <reference types="Cypress" />

context('chart', () => {
  beforeEach(() => {
    cy.visit('/')

    // let the chart load by observing the rendered bars
    cy.get('.frappe-chart g.dataset-0 rect').should('have.length', 4)
  })

  // let us grab the chart so we have access to all its data
  beforeEach(function () {
    cy.window()
      .its('chart.data.labels')
      .should('exist')
      .as('labels')
  })

  it('shows bar chart', () => {
    cy.get('.frappe-chart')
      .should('be.visible')
      .and(chart => {
        // we can assert anything about the chart really
        expect(chart.height()).to.be.greaterThan(200)
      })
  })

  it('shows tooltips', function () {
    // note: the tooltip is outside the SVG chart
    // to trigger tooltip, need to trigger "mousemove" event
    // according to the https://github.com/frappe/charts search for "bindTooltip"

    // to remove tooltip can just trigger "mouseleave"

    ;[0, 1, 2, 3].forEach(k => {
      cy.get('.frappe-chart g.dataset-0 rect')
        .eq(k)
        .trigger('mousemove')
        .wait(1000)

      cy.contains('.graph-svg-tip', this.labels[k])
    })
  })
})
