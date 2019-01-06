/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/

const studentList = document.querySelector('.student-list');
const studentItems = document.querySelectorAll('.student-item');
const itemsPerPage = 10;


/***
   The `showPage` function hides all of the items in the
   list except for the ten you want to show.
***/

const showPage =  ( items, itemsPerPage, page ) => {
  // Calculates the first index and last index of students to be shown.
  const firstItemIndex =  page * itemsPerPage - itemsPerPage;
  const lastItemIndex = page * itemsPerPage - 1;

  // Loops over all students and only displays relevant ones.
  for ( let i = 0; i < items.length; i++ ) {
    if ( i >= firstItemIndex && i <= lastItemIndex ){
      items[i].style.display = "inherit";
    } else {
      items[i].style.display = "none"
    }
  }
};


/***
   The `appendPageLinks function` generates, appends, and adds
   functionality to the pagination buttons.
***/

const appendPageLinks = ( items, itemsPerPage ) => {
  // Calculate number of pages needed.
  const pageNumber = Math.ceil( studentItems.length / itemsPerPage );
  // Create the elements to be appended to the page, then append them.
  const div = document.createElement('div');
  const ul = document.createElement('ul');

  ul.className = 'pagination';

  for ( let i = 1; i <= pageNumber; i++ ) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    li.appendChild(a);
    ul.appendChild(li);
    a.textContent = i;
  }

  div.appendChild(ul);
  studentList.insertAdjacentElement('afterend', div);

  // Get the first pagination link  and  make it active.
  const firstLink = div.querySelector('a');
  firstLink.className = "active";

  // Add event handler to pagination elements.
  div.addEventListener ('click', event => {
    if ( event.target.tagName.toLowerCase() === 'a' ) {
      const page = event.target.textContent;
      // Invoke showPage method
      showPage( studentItems, itemsPerPage, page );
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
appendPageLinks( studentItems, itemsPerPage );
showPage( studentItems, itemsPerPage, 1 );
