import React, { useCallback, useEffect, useState } from 'react';
import { GoMarkGithub as GithubIcon } from "react-icons/go";
import { ImSpinner10, ImWarning } from "react-icons/im";

import SearchBar from './SearchBar/SearchBar';
import RepositoryItem from './RepositoryItem/RepositoryItem';
import Pagination from './Pagination/Pagination';

import "./repositories.css";

const ITEM_PER_PAGE = 10;

const Repositories = () => {
  const [repoFound, setRepoFound] = useState<any>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<String>('');

  const onTextSearch = (searchText: String) => {
    setSearch(searchText);
  }
  
  const searchRepo = useCallback(
    () => {
      fetch(`https://api.github.com/search/repositories?per_page=${ITEM_PER_PAGE}&page=${page}&q=${search}`)
      .then((response) => response.json())
      .then(data => {
        setRepoFound(data.items);
        setTotalCount(data.total_count);
        setLoading(false);
      }).catch(error => {
        alert("error, try again in a minute");
      })
    },
    [search, page],
  )

  useEffect(() => {
    if(search.length > 0) {
      setLoading(true);
      searchRepo();
    }
  }, [search, page]);

  const renderSearchResult = () => {
    if(loading) {
      return (
        <div className="loading-state">
          <ImSpinner10 />
        </div>
      )
    }
    return (
      setRepoFound.length > 0 ? (
        <>
          <p className="repositories-total-repo">Total searched repositories: {totalCount}</p>
          {
            repoFound.map((repo: any) => {
              return (
                <RepositoryItem key={repo.id} repository={repo} />
              )
            })
          }
          <Pagination 
            handleSetPage= {setPage}
            currentPage= {page}
            totalItems={totalCount}
            itemsPerPage={ITEM_PER_PAGE}
          />
        </>
      ) : (
        <>0 result found</>
      )
    )
  }

  return (
    <div className="repositories-wrapper">
      <header>
        <h2><GithubIcon/></h2>
        <h2>Github Repository Search</h2>
      </header>
      <SearchBar handleTextSearch={onTextSearch} handleSetPage= {setPage}/>
      {
        search.length > 0 ? (
          <div className="repositories-list">
            {renderSearchResult()}
          </div>
        ) :
        (
          <div>
            <h3 className="repositories-empty-info">
              <ImWarning />
              Please search the repository using the search-box to see the result
          </h3>
          </div>
        )
      }
    </div>
  )
};

export default Repositories;