const baseURL = "http://makeup-api.herokuapp.com/api/v1/products.json"
var brandURL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=";
var typeURL = "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=";


let lis
const main = document.getElementsByTagName('main')[0]
const proxy = 'https://cors-anywhere.herokuapp.com/'
const button = document.getElementsByTagName('button')[0]
let currentPage = 1
const limit = 30

addPagination()
button.addEventListener('click', getMakeup)


function addPagination() {
  lis = document.querySelectorAll('li')
  for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', handlePagination)
  }
}

function removeCurrentLi() {
  for (var i = 0; i < lis.length; i++) {
    lis[i].classList.remove('current')
  }
}

function handlePagination() {
  removeCurrentLi()
  const page = this.children[0].innerText
  currentPage = page
  getMakeup()
  this.classList.add('current')
  if (Number(currentPage) === lis.length) {
    addNewLi(Number(currentPage) + 1)
  }
}

function addNewLi(page) {
  let li = document.createElement('li')
  li.innerHTML = `<a href="#" aria-label="Page ${page}">${page}</a>`
  const pagination = document.querySelector('.pagination')
  pagination.appendChild(li)
  addPagination()
}

function getMakeup(event) {
  // document.querySelector('.pagination').style.display = 'block'
  console.log('Clicked');
  if (event) {
    event.preventDefault()
  }
  let type = document.getElementsByTagName('input')[0].value
  let brand =$("#brandDropdown option:selected").val()
  let lessThan = $("#priceDropdown option:selected").val()
  console.log(brand)
  let offset = (currentPage * limit) - limit
  fetch(proxy + baseURL + `?product_type=${type}` + `&brand=${brand}`
    + `&price_less_than=${lessThan}`
    + `&limit=30` + `&page=${currentPage}` + `&offset=${offset}`
  )
    .then(data => data.json()) //turns it into json
    .then(handleMakeup)

    function handleMakeup(response) {
      let mainContent = document.querySelector('.main-content')
      mainContent.innerHTML = ''
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        createCard(response[i])
      }
    }
//
}
//
//
function createCard(makeup) {
    if (makeup.rating === null) {
      var rating = 'Not Available';
    } else {
      var rating = makeup.rating + '/5';
    }
    if (makeup.price === null) {
      var price = 'Not Available';
    } else {
      var price = makeup.price;
    }
    if (makeup.brand === null) {
      var brand = 'Not Available';
    } else {
      var brand = makeup.brand;
    }
  let div = document.createElement('div')
  div.classList.add('col', 's12', 'm4')
  let content = document.querySelector('.main-content')
  div.innerHTML =

    '<div class="card large">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
        '<img class="activator" src="' + makeup.image_link + '">' +
      '</div>' +
      '<div class="card-content">' +
        '<span class="card-title activator grey-text text-darken-4">' + makeup.name + '<i class="material-icons hide">more_vert</i></span>' +
        '<p><a href="' + makeup.product_link + '">Product Link</a></p>' +
      '</div>' +
    '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4"> ' + 'Price: $' + price + '<br>' + 'Review: ' + rating + '<br>' + 'Brand: ' + brand + '<i class="material-icons right">close</i></span>' +
      '<p>' + '<br>'+ 'Description: ' + makeup.description + '<br>' +  '</p>' + '<p><a href="' + makeup.product_link + '">Product Link</a></p>'
      '</div></div>'


  content.appendChild(div)

}

$(document).ready(function(){
      $('.carousel').carousel();
    });
