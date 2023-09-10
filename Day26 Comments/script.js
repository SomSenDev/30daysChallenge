//thanks for (david mraz) https://twitter.com/davidm_ml?s=20 for the help.


document.addEventListener('DOMContentLoaded', function() {
    // Function to create a new comment element
    function createComment(author, timestamp, text) {
      var comment = document.createElement('div');
      comment.className = 'comment';
        comment.innerHTML = `
        <div class="avatar">
            <img
                class="avatar"
                src="user.png"
                alt="user"
            >
        </div>
        <div class="comment__body">
            <div class="comment__author">
                ${author}
                <span>${timestamp}</span>
            </div>
            <div class="comment__text">
                <p>
                    ${text}
                </p>
            </div>
        </div>
        `
  
      return comment;
    }
  
    // Function to add a comment to the comment section
    function addComment(comment) {
      var commentSection = document.querySelector('.discussion__comment');
      commentSection.appendChild(comment);
    }
  
    // [Reset](https://www.google.com/search?q=Reset) the form
    function resetForm() {
      var form = document.querySelector('.newcomment_form');
      form.reset();
    }
  
    // Comment button click event handler
    function handleCommentButtonClick() {
      var textarea = document.querySelector('.newcomment_form textarea');
      var commentText = textarea.value.trim();
  
      if (commentText !== '') {
        var author = 'MEEEE';
        var timestamp = getCurrentTimestamp();
        var comment = createComment(author, timestamp, commentText);
        addComment(comment);
        resetForm();
      }
    }
  
    // Get the current timestamp
    function getCurrentTimestamp() {
      var now = new Date();
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var day = days[now.getDay()];
      var timestamp = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      return timestamp;
    }
  
    // Add event listeners to buttons
    var resetButton = document.querySelector('.resetBtn');
    var commentButton = document.querySelector('.commentBtn');
  
    resetButton.addEventListener('click', resetForm);
    commentButton.addEventListener('click', handleCommentButtonClick);
  
    // Add three comments when the page is loaded
    var comments = [
      {
        author: 'John',
        timestamp: '2 days ago',
        text: 'Woohoo! This is awesome! Thanks for sharing!'
      },
      {
        author: 'Jane',
        timestamp: '1 day ago',
        text: 'This is really cool! but I wish there were more colors.'
      },
      {
        author: 'Mike',
        timestamp: '3 hours ago',
        text: 'Thanks for sharing! This is what I was looking for.'
      }
    ];
  
    for (var i = 0; i < comments.length; i++) {
      var comment = createComment(comments[i].author, comments[i].timestamp, comments[i].text);
      addComment(comment);
    }
  });