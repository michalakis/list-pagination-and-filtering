/******************************************
List Filter and Pagination
******************************************/

/***
   Global variables are declared here
***/

const studentList = document.querySelector('.student-list');
const itemsPerPage = 10;


/***
   The `showPage` function hides all of the items in the
   list except for the ten you want to show.
***/

const showPage =  ( list, itemsPerPage, page ) => {
  // Get items from list.
  const listItems = list.querySelectorAll('li');
  // Calculate the first index and last index of students to be shown.
  const firstItemIndex =  page * itemsPerPage - itemsPerPage;
  const lastItemIndex = page * itemsPerPage - 1;

  // Loops over all students and only displays relevant ones.
  for ( let i = 0; i < listItems.length; i++ ) {
    if ( i >= firstItemIndex && i <= lastItemIndex ) {
      listItems[i].style.display = 'inherit';
    } else {
      listItems[i].style.display = 'none'
    }
  }
};


/***
   The `appendPageLinks` function generates, appends, and adds
   functionality to the pagination buttons.
***/

const appendPageLinks = ( list, itemsPerPage ) => {
  // Get items from list.
  const listItems =  list.querySelectorAll('li');
  // Calculate number of pages needed.
  const pageNumber = Math.ceil( listItems.length / itemsPerPage );
  // Create the elements to be appended to the page, then append them.
  const div = document.createElement('div');
  const ul = document.createElement('ul');

  div.className = 'pagination';

  for ( let i = 1; i <= pageNumber; i++ ) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = "#"
    a.textContent = i;

    li.appendChild(a);
    ul.appendChild(li);
  }

  div.appendChild(ul);
  const listParent = list.parentNode;
  listParent.appendChild(div);

  // Get the first pagination link  and  make it active.
  const firstLink = div.querySelector('a');
  firstLink.className = 'active';

  // Add event handler to pagination elements.
  div.addEventListener ('click', event => {
    if ( event.target.tagName.toLowerCase() === 'a' ) {
      const page = event.target.textContent;
      // Invoke showPage method
      showPage( list, itemsPerPage, page );
      // Apply relevant class to each element.
      const paginationLinks = div.querySelectorAll('a');
      for ( let i = 0; i < paginationLinks.length; i++ ) {
        if ( paginationLinks[i] !== event.target && paginationLinks[i].className === "active" ) {
            paginationLinks[i].classList.remove('active');
        } else if ( paginationLinks[i] === event.target ) {
          paginationLinks[i].className = 'active';
        }
      }
    }
  });
};

/***
   The search function allows the user to search through the list,
   and returnn any items that match the provided string.
***/

const search = ( list, itemsPerPage ) => {
  // Create html elements and append to page.
  const div = document.createElement('div');
  div.className = 'student-search';
  const input = document.createElement('input');
  input.placeholder = 'Search for students..';
  div.appendChild(input);
  const button = document.createElement('button');
  button.textContent = 'Search';
  div.appendChild(button);
  const listPreviousSibling = list.previousElementSibling;
  listPreviousSibling.appendChild(div);

  // Add functionality to search button.
  const listItems = list.querySelectorAll('li');
  const searchDiv = document.querySelector('.student-search');
  searchDiv.addEventListener( 'click', event => {
    //1
    if ( event.target.tagName.toLowerCase() == 'button' ) {
      const userInput = searchDiv.querySelector('input').value;
      // If search input is empty, give a warning.
      //2
      if ( userInput.length < 1 ) {
        const warningExists = document.querySelector('.noInput');
        if ( warningExists === null ) {
          const noInput = document.createElement('p');
          noInput.className = 'noInput'
          noInput.textContent = `The search field is empty,
                          please provide a search term!`;
          div.parentNode.appendChild(noInput);
        }
      } else {
        // Remove warning, if it exists.
        const warningExists = document.querySelector('.noInput');
        if ( warningExists !== null ) {
          const parentNode = warningExists.parentNode;
          parentNode.removeChild(warningExists);
        }
        // Create a new element and fill it with list items that contain the search query.
        const searchResults = document.createElement('ul');
        searchResults.className = "student-list";
        let matchedItemsCounter = 0;
        for ( let i = 0; i < listItems.length; i++ ) {
          const textContent = listItems[i].textContent;
          if ( textContent.includes(userInput) ) {
            searchResults.appendChild( listItems[i] );
            matchedItemsCounter++;
          }
          // If there are search results
          //3
          if ( matchedItemsCounter > 0 ) {
            // Remove current list, pagination and search funtion, and rebuild them using search results.
            const listParent = list.parentNode;
            listParent.removeChild(list);
            const pagination = document.querySelector('.pagination');
            const paginationParent = pagination.parentNode;
            paginationParent.removeChild(pagination);
            const searchElements = document.querySelector('.student-search');
            const searchParent = searchElements.parentNode;
            searchParent.removeChild(searchElements);
            listParent.appendChild(searchResults);
            const newStudentList = document.querySelector('.student-list');
            showPage( newStudentList, itemsPerPage, 1 );
            appendPageLinks( newStudentList, itemsPerPage );
            search( newStudentList, itemsPerPage );
          } else {
            // Let the user know there are no results matching the query.
            const noMatch = document.querySelector('.noMatch');
            if ( noMatch === null ) {
              const noMatch = document.createElement('p');
              noMatch.className = 'noMatch';
              noMatch.textContent = `There are no matches,
                                    please try again!`;
              div.parentNode.appendChild(noMatch);
            }
          }//3
        }
      }//2
    }//1
  }); // End event listener
}; // End search function


//  Invoke the above functions in order to initialize the page.
showPage( studentList, itemsPerPage, 1 );
appendPageLinks( studentList, itemsPerPage );
search( studentList, itemsPerPage );
