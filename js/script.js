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
  // Calculates the first index and last index of students to be shown.
  const firstItemIndex =  page * itemsPerPage - itemsPerPage;
  const lastItemIndex = page * itemsPerPage - 1;

  // Loops over all students and only displays relevant ones.
  for ( let i = 0; i < listItems.length; i++ ) {
    if ( i >= firstItemIndex && i <= lastItemIndex ){
      listItems[i].style.display = 'inherit';
    } else {
      listItems[i].style.display = 'none'
    }
  }
};


/***
   The `appendPageLinks function` generates, appends, and adds
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

  // Add functionality to search button
  const listItems = list.querySelectorAll('li');
  const searchDiv = document.querySelector('.student-search');
  searchDiv.addEventListener( 'click', event => {
    console.log('hello');
    if ( event.target.tagName.toLowerCase() == 'button' ) {
      console.log('jesus');
      const userInput = searchDiv.querySelector('input').value;
      console.log(userInput);
      // const searchResults = [];
      // for ( let i = 0; i < listItems.length; i++ ) {
      //   const textContent = listItems[i].textContent;
      //   if ( textContent.includes(userInput) ) {
      //     searchResults.push(listItems[i]);
      //   }
      // }
      // const listParent = list.parentNode;
      // listParent.removeChild(list);
      // showPage( searchResults, itemsPerPage, 1 );
      // appendPageLinks( searchResults, itemsPerPage );
    }
  });
}


//  Invoke the above functions in order to initialize the page.
showPage( studentList, itemsPerPage, 1 );
appendPageLinks( studentList, itemsPerPage );
search( studentList, itemsPerPage );
