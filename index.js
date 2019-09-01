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
  person.save().then(response => {
  console.log(`Added ${body.name} number ${body.number} to phonebook`);
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(204).end() 
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {

  Person.countDocuments({}, function(error, count) {
    
    response
      .send(
        count
        ? `Phonebook has info for ${count} people</br></br> ${new Date()}`
        : error
      )
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

  next(error)
}

// virheellisten pyyntöjen käsittely
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})