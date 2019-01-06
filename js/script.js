/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


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
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

const showPage =  ( items, page ) => {
  const firstItemIndex =  page * itemsPerPage - itemsPerPage;
  const lastItemIndex = page * itemsPerPage - 1;

  for ( let i = 0; i < items.length; i++ ) {
    if ( i >= firstItemIndex && i <= lastItemIndex ){
      items[i].style.display = "inherit";
    } else {
      items[i].style.display = "none"
    }
  }
}


/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = () => {
  const pageNumber = Math.ceil( studentItems.length / itemsPerPage );
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

  div.addEventListener ('click', e => {
    if ( event.target.tagName.toLowerCase() === 'a' ) {
      const page = event.target.textContent;
      showPage( studentItems, page );
    }
  });
}

appendPageLinks();
showPage( studentItems, 1 );


// Remember to delete the comments that came with this file, and replace them with your own code comments.
