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
      <h3>Toughest Challenge Overcame:</h3>
      <p>Being able to re-use components and customize them with conditional rendering depending on which view we’re looking at, while keeping that data synchronous.</p>
      <h3>Coming Soon:</h3>
      <p>Ability to add friends and invite them to your events, more easily coordinate group activities.</p>
      <h3>Special Thanks To:</h3>
      <p>All of my classmates in the Genocchi cohort for helping me out over these last few weeks, and a huge thanks to our instructor Dane Smith, the Geppetto to us Genocchios, for giving us the tools to get where we are today.</p>


    </div>
  );
}

export default InfoPage;
