const Search = ({newSearch, handleNewSearch}) => {
  return (
    <>
      <div>
        filter shown with:
        <input value={newSearch} onChange={handleNewSearch} />
      </div>
    </>
  );
};

export default Search;
