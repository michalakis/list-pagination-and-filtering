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
  const listItems = list.querySelectorAll("li");
  // Calculates the first index and last index of students to be shown.
  const firstItemIndex =  page * itemsPerPage - itemsPerPage;
  const lastItemIndex = page * itemsPerPage - 1;

  // Loops over all students and only displays relevant ones.
  for ( let i = 0; i < listItems.length; i++ ) {
    if ( i >= firstItemIndex && i <= lastItemIndex ){
      listItems[i].style.display = "inherit";
    } else {
      listItems[i].style.display = "none"
    }
  }
};


/***
   The `appendPageLinks function` generates, appends, and adds
   functionality to the pagination buttons.
***/

const appendPageLinks = ( list, itemsPerPage ) => {
  // Get items from list.
  const listItems =  list.querySelectorAll("li");
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
  list.insertAdjacentElement('afterend', div);

  // Get the first pagination link  and  make it active.
  const firstLink = div.querySelector('a');
  firstLink.className = "active";

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
            paginationLinks[i].classList.remove("active");
        } else if ( paginationLinks[i] === event.target ) {
          paginationLinks[i].className = "active";
        }
      }
    }
  });
};

//  In the above functions in order to initialize the page.
appendPageLinks( studentList, itemsPerPage );
showPage( studentList, itemsPerPage, 1 );
