import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h2>Thanks for using and learning more about Pack Me Up!</h2>
      <h3>Technologies Used:</h3>
      <p>
        Material UI
        -	Axios
        -	Express
        -	Passport
        -	React
        -	Redux
        -	Redux Saga
        -	React Router
        -	Sweet Alert
        -	PostgreSQL
        -	Node
      </p>


    </div>
  );
}

export default InfoPage;
