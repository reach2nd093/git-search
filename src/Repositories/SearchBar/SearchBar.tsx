import React, { ChangeEvent} from 'react';
import './searchBar.css';

const SearchBar = (props: { 
  handleTextSearch: Function,
  handleSetPage: Function,
}) => {

  const { handleTextSearch, handleSetPage } = props;

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const timer = setTimeout(() => {
      handleSetPage(1);
      handleTextSearch(event.target.value);
    }, 1000);
    return () => {
      clearTimeout(timer)
    }
  }

  return (
    <div className="searchBar">
      <input 
        type="text"
        onChange={event => onSearch(event)}
        placeholder="Search repository here"
      />
    </div>
  )
}

export default SearchBar;