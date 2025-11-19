const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url, {family: 4});

const noteSchema = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
});

const Person = mongoose.model("Person", noteSchema);

const person = new Person({
  name: name,
  phoneNumber: phoneNumber,
});

const printAll = () => {
  Person.find().then((result) => {
    console.log("phonebook: ");
    result.forEach((person) => {
      console.log(`${person.name} ${person.phoneNumber}`);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length === 3) {
  printAll();
  return;
}

person.save().then((result) => {
  console.log(`added ${person.name} number ${person.phoneNumber} to phonebook`);
  mongoose.connection.close();
});
