const Delete = ({handleRemove, name, id}) => {
  return (
    <button onClick={handleRemove} id={id} name={name}>
      Delete
    </button>
  );
};

const Numbers = ({filteredPeople, handleRemove}) => {
  return (
    <>
      <h2>Numbers</h2>
      {filteredPeople.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <Delete
            name={person.name}
            id={person.id}
            handleRemove={handleRemove}
          />
        </div>
      ))}
    </>
  );
};

export default Numbers;
