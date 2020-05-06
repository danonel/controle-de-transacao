const ulTransactions = document.querySelector('#transactions')
const income = document.querySelector('#money-plus')
const expense = document.querySelector('#money-minus')
const balance = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const myLocalStorage = JSON.parse(localStorage
  .getItem('transactions'))

let transactions = localStorage
  .getItem('transactions') !== null ? myLocalStorage : [] 


const remove = ID => {
  transactions = transactions
  .filter(transaction => transaction.id !== ID)
  updateLocalStorage()
  load(
    Toast.show('Removido com sucesso', 'removed')

  )
}

const addTranscations = ({amount , name , id}) =>{
  const operator = amount < 0 ? '-' : '+'
  const CSSClass = amount <0 ? 'minus' : 'plus'
  const mathAbs = Math.abs(amount)
  const li = document.createElement('li')

  li.classList.add(CSSClass)
  li.innerHTML = `
    ${name}
    <span> ${operator} R$ ${mathAbs}</span>
    <button class="delete-btn" onClick="remove(${id})">x</button>
  `
  ulTransactions.prepend(li)

}
const getTotal = montante => montante
  .reduce((acumulador , transação) => acumulador + transação, 0)
  .toFixed(2)

const getReceita = montante => montante
  .filter(valor => valor > 0)
  .reduce((acumulador, valor) => acumulador + valor, 0)
  .toFixed(2)

const getDespesas = montante => Math.abs(montante
  .filter(valor => valor < 0)
  .reduce((acumulador, valor) => acumulador + valor, 0)
  .toFixed(2))


const update = () => {
  const montante = transactions.map(({ amount }) => amount)
  const total = getTotal(montante)
  const receita = getReceita(montante)
  const despesa = getDespesas(montante)

  balance.textContent = `R$ ${total}`
  income.textContent = `R$ ${receita}`
  expense.textContent = `R$ ${despesa}`
}

const load = () => {
  ulTransactions.innerHTML = ''
  transactions.map(addTranscations)
  update()
}

load()

const updateLocalStorage = () =>{
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const idGenerator = () => Math.round(Math.random()* 1000)

const addToTransactions = (transactionName, transactionAmount) => {
  transactions.push( {
    id: idGenerator() ,
    name: transactionName ,
    amount: Number(transactionAmount)
  })

}

const cleanInputs = () => {
  inputTransactionName.value = ''
  inputTransactionAmount.value = ''
}

const handleFormSubmit = event =>{
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()
  const isEmpty = transactionName === '' || transactionAmount === ''

  if(isEmpty){
    Toast.show('Preencha os campos vazios', 'removed')
    return
  }

  addToTransactions(transactionName, transactionAmount)
  load(
    Toast.show('Adicionado com sucesso', 'created')
  )
  updateLocalStorage()
  cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)
