import React, {useState} from 'react';
import '../App.css';

const Pagination = (props) => {

  //set state as null for number of results returned
  const [resultCount, updateResultCount] = useState([]);

  //set state default to page 1 of results
  const [currentPage, updateCurrentPAge] = setState("1");

  //set to three to test that it works...
  const [resultsPerPage, updateResultsPerPage] = setState("3");


  return(
    <>

    </>
  ); // return}


}//pagination function

export default Pagination;
