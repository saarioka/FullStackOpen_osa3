require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')

app.use(bodyParser.json())
morgan.token('data', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('build'))



app.post('/api/persons', (request, response) => {
  const body = request.body

  /*if (!body.name || !body.number) {
    console.log('content missing')
    return response.status(400).json({
      error: 'content missing'
    })
  }else if(Person.findById({name: body.name}).count != 0){
    console.log('content missing')
    return response.status(400).json({
        error: 'name must be unique'
      })
  }
*/
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  console.log("123");
  person.save().then(response => {
  console.log(`Added ${body.name} number ${body.number} to phonebook`);
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  });
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people
                   </br></br> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
  .then(person => {
    response.json(person.toJSON())
  })
  .catch(error => {
    console.log(error);
    response.status(404).end()
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})