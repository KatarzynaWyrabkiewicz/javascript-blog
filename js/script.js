/* moduł 5  */
'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active')
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('wybrano atrybut href: ', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('znaleziono artykuł z trybutem: ', articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
  }
  console.log(html);

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks(); 


/* moduł 6.2 */
function generateTags() {

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  
  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');  

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + '  ' + linkHTML;

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
    
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let tagLinkHref of tagLinksHref){
    
    /* add class active */
    tagLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* [START LOOP: for each link */

  for (let oneLink of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */

    oneLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){

    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const authorTags = article.getAttribute('data-author');

    /* generate HTML of the link */
    html += '<a href="#' + authorTags + '"><span>' + authorTags +  '</span></a>';

    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateAuthors();

function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "authorHref" and extract tag from the "href" constant */
  const authorHref = href.replace('#author-', '');
  console.log('hrefAuthor:' + authorHref);

  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */
    activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active author link */
  }
    
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let authorLinkHref of authorLinksHref){
    
    /* add class active */
    authorLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + authorTags + '"]');
}

function addClickListenersToAuthors() {
  
  /* find all links to tags */
  const allLinksToAuthors = document.querySelectorAll('.post-author a');

  /* [START LOOP: for each link */
  for (let oneLinkToAuthor of allLinksToAuthors) {

    /* add tagClickHandler as event listener for that link */
    oneLinkToAuthor.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();