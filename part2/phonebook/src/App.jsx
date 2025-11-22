import {useState, useEffect} from "react";
import personsService from "./services/persons";

import Search from "./components/Search";
import AddNew from "./components/AddNew";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };

    const dublicate = checkDublicates(newName);

    if (dublicate) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        handleUpdate(dublicate, personObj);
      }
    } else {
      handleCreate(personObj);
    }
  };

  const checkDublicates = (name) => {
    return persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
  };

  const resetFields = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleUpdate = (dublicate, personObj) => {
    personsService
      .update(dublicate.id, personObj)
      .then((response) => {
        setPersons(
          persons.map((person) =>
            person.id !== dublicate.id ? person : response
          )
        );
        resetFields();
      })
      .catch((error) => {
        if (error) {
          handleNotification(error.response.data.error, "error");
        } else {
          handleNotification(
            `Information of ${dublicate.name} has already been removed from the server`,
            "error"
          );
        }
      });
  };

  const handleCreate = (personObj) => {
    personsService
      .create(personObj)
      .then((response) => {
        setPersons(response);
        handleNotification(`Added ${personObj.name}`, "success");
        resetFields();
      })
      .catch((error) => {
        handleNotification(error.response.data.error, "error");
      });
  };

  const handleNotification = (msg, type) => {
    setNotification({
      text: msg,
      type: type,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNewSearch = (e) => {
    setNewSearch(e.target.value);
  };

  const handleRemove = (e) => {
    if (confirm(`Delete ${e.target.name} ?`)) {
      personsService.remove(e.target.id).then(() => {
        setPersons(persons.filter((person) => person.id !== e.target.id));
      });
    }
  };

  const filteredPeople = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase())
  );

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification?.text} type={notification?.type} />
      <Search newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <AddNew
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <Numbers filteredPeople={filteredPeople} handleRemove={handleRemove} />
    </>
  );
};

export default App;
