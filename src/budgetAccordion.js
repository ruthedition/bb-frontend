class BudgetAccordion {
  constructor(budget) {
    this.budget = budget
    this.income = budget.income
    this.renderBudgetAccordion()
  }

  renderBudgetAccordion() {
    let budgetAccordion = document.createElement('li')
    accordionContainer.appendChild(budgetAccordion)
    const accordionContent = Accordion.createAccordionContent()
    const title = Accordion.createAccordionTitle(this.budget.id, `Paycheck : $${this.income}`)
    budgetAccordion.appendChild(title)
    let incomeform = document.createElement('form')
    incomeform.setAttribute('id', 'income-form')
    const input = Accordion.createAccordionInput(this.income)
    input.addEventListener('change', (e) => { 
      e.target.nextElementSibling.disabled = false
      this.income = e.target.value 
    })
    incomeform.appendChild(input)
    const unallocated = document.createElement('h4')
    unallocated.setAttribute('id', `unallocated-${this.budget.id}`)
    unallocated.innerText = `Unallocated Funds : $${this.income - this.budget.expenseTotal()}`
    accordionContent.appendChild(unallocated)
    const saveButton = this.createAccordionSaveButton()
    incomeform.appendChild(saveButton)
    accordionContent.appendChild(incomeform)
    budgetAccordion.appendChild(accordionContent)
    this.renderExpenseFormContainer(saveButton)    
  }

  createAccordionSaveButton() {
    let eventFn = (e) => {
      e.preventDefault()
      this.budget.setIncome(this.income)
    }
    let button = createButton('save-amount', 'Save', eventFn)
    return button
  }

  setPaycheckAmount() {
    document.getElementById(this.budget.id).innerText = `Paycheck : $${this.income}`
    document.getElementById(`unallocated-${this.budget.id}`).innerText = `Unallocated Funds : $${this.income - this.budget.expenseTotal()}`
  
  }

  static renderIncomeTotal() {
    document.getElementById('total').innerText = `Total Income : $${Budget.incomeTotal()}`
    document.getElementById('unallocated').innerText = `Unallocated Funds: $${Budget.incomeTotal() - Expense.total()}`
  }

  renderExpenseFormContainer(saveButton) {
    let accordion = document.getElementById(this.budget.id).nextElementSibling
    let expenseHeader = document.createElement('h1')
    expenseHeader.innerText = 'Expense'
    accordion.appendChild(expenseHeader)
    let eventFn = (e) => this.budget.addExpense()
    let button = createButton('new-expense', 'Add Expense', eventFn)
    saveButton.addEventListener('click', () => { button.disabled = false })
    this.income ? button.disabled = false : button.disabled = true 
    accordion.appendChild(button)
    let form = document.createElement('form')
    form.setAttribute('id', 'expenses-form')
    accordion.appendChild(form)
  }
}