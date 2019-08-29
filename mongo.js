const mongoose = require('mongoose')

if ( process.argv.length != 3 && process.argv.length != 5 ) {
  console.log('Invalid arguments')
  process.exit(1)
}
else {
    const password = process.argv[2]

    const url =
    `mongodb+srv://user:${password}@laniakea-jeaaf.mongodb.net/test?retryWrites=true&w=majority`

    mongoose.connect(url, { useNewUrlParser: true })

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
        })

    const Person = mongoose.model('Person', personSchema)

    if(process.argv.length === 3) {

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    }
    else if(process.argv.length === 5) {

        const new_name = process.argv[3]
        const new_number = process.argv[4]

        const person = new Person({
        name: new_name,
        number: new_number,
        })

        person.save().then(response => {
        console.log(`Added ${new_name} number ${new_number} to phonebook`);
        mongoose.connection.close();
        })
    }
    else {
        console.log("never should go here")
    }
}
