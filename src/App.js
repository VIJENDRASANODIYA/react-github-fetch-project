import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Recipe from './Recipe';
import boostrap from "bootstrap"

const App = () => {

  const [fetchData, setFetchData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("billGates");
  const [repo, setRepo] = useState([])


  useEffect(() => {
    get_git_data();


  }, [query])
  const get_git_data = async () => {
    const response = await fetch
      (`https://api.github.com/users/${query}`);
    // console.log(response);
    const data = await response.json();
    setFetchData(data);
    getRepo(query)


  };
  const getRepo = async () => {
    const getRepoData = await fetch(`https://api.github.com/users/${query}/repos`)
    const resData = await getRepoData.json()
    setRepo(resData)
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  function getSearch(e) {
    e.preventDefault();
    setQuery(search);

    setSearch("");

  }

  return (
    <div className="App">
      <form className="search-form bg-dark" onSubmit={getSearch} >
        <input className="input-field" type="search" placeholder="Search Name..." aria-label="Search" value={search}
          onChange={updateSearch} />
        <button className="search-button" type="submit" >
          Search
        </button>
      </form>

      <div className='container-md my-5 '>
        <div className='row border border-secondary bg-warning'>
          <div className='col-12  '>
            <div className='d-flex justify-content-around  p-2 '>
              <img src={fetchData.avatar_url} width="150px" alt="image" />
              <div className='first-under'>
                <h2>{fetchData.login}</h2>
                <a href={fetchData.html_url}>{fetchData.html_url}</a>
                <p>{fetchData.id} </p>

              </div>
            </div>
            <div className='d-flex justify-content-around '>
              <div className='p-5'>
                <h1>follow</h1>
                <h3>{fetchData.following}</h3>
              </div>
              <div className='p-5'>
                <h1>follower</h1>
                <h3>{fetchData.followers}</h3>
              </div>
              <div className='p-5'>
                <h1>repo</h1>
                <h3>{fetchData.public_repos}</h3>
              </div>
            </div>
          </div>
          <div className='container'>
            <h1>Repository Get here</h1>
            {
               
               repo.map((e)=>{
                return(
                  <div key={e.name}>
                 
                    <a href={e.html_url} target="_blank">{e.name}</a>
                 
                  </div>
                )
               })
             
            }
          
         

          </div>


        </div>

      </div>


    </div>


  )




}

export default App;
