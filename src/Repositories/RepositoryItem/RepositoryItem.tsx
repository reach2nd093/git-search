import React from 'react';
import { GoStar as StarIcon, GoRepoForked as ForkIcon } from "react-icons/go";

import './repositoryItem.css';

interface RepoUnit {
  name: string;
  description: string;
  language: string;
  stargazers_count: string;
  forks_count: string;
  html_url: string;
  updated_at: string;
}

const RepositoryItem = (props: { repository: RepoUnit }) => {
  const {repository} = props;
  const {
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    html_url,
    updated_at
  } = repository;

  let updatedAt = new Date(updated_at).toDateString();
  return (
    <div className="repositoryItem">
      <a href={html_url} target="_blank" className="repositoryItem-title">
        {name}
      </a>
      <p className="repositoryItem-info">
        {description?.length > 0 ? description : "No information available about this repository"}
      </p>
      <div className="repositoryItem-statistics">
        <p>
          <StarIcon />
          {stargazers_count || 0}
        </p>
        <p>
          <ForkIcon />
          {forks_count || 0}
        </p>
        {language && <p>{language || ""}</p>}
        <p>
          {updatedAt ? `Updated ${updatedAt}` : ""}
        </p>
      </div>
    </div>
  )
}

export default RepositoryItem;