const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit',e => {
  // Get search Term
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get Limit
  const searchLimit = document.getElementById('limit').value;

  // Check Input
  if(searchTerm === '') {
    //Show message
    showMessage('Please add a search term', 'alert-danger');
  }

  // Clear input
  searchInput.value = '';
  // Search Reddit

  

      // document.querySelector('.jokes').innerHTML = output;
  getReddit(searchTerm, searchLimit, sortBy);
   
  e.preventDefault();
});

//Show message
const showMessage = (message, className) => {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get search
  const search = document.getElementById('search');

  // Insert message
  searchContainer.insertBefore(div, search);
  // Timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Truncate text
const truncateText = (text, limit) => {
  const shortended = text.indexOf(' ', limit);
  if(shortended == -1) return text;
  return text.substring(0, shortended);
}

function getReddit(searchTerm, searchLimit, sortBy) {
  fetch(`https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      let posts = data.data.children;
      let output = '<div class="card-columns">';
      console.log(posts);
      posts.forEach(function(postData) {
        let post = postData.data;
        const image = post.preview ? post.preview.images[0].source.url :
        'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
        
        
        output += `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read more!</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
          <span class="badge badge-dark">Score: ${post.score}</span>
        </div>
        </div>
        `;
        
      });
      output += '</div>';
      document.getElementById('results').innerHTML = output;
    })
    .catch(function(err) {
      console.log(err);
    })
}