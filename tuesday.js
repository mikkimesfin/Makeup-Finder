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
  console.log(brand)
  let offset = (currentPage * limit) - limit
  fetch(proxy + baseURL + `?product_type=${type}` + `&brand=${brand}`
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

//     $(".main-content").append(
      // '<div class="col s6 m4">' +
      // '<div class="card large">' +
      //   '<div class="card-image waves-effect waves-block waves-light">' +
      //     '<img class="activator" src="' + data[i].image_link + '">' +
      //   '</div>' +
      //   '<div class="card-content">' +
      //     '<span class="card-title activator grey-text text-darken-4">' + makeup[i].name + '<i class="material-icons right">more_vert</i></span>' +
      //     '<p><a href="#">' +data[i].website_link +'</a></p>' +
      //   '</div>' +
      // '<div class="card-reveal">' +
      //   '<span class="card-title grey-text text-darken-4"> ' + '$' + makeup[i].price + '<br>' + 'review: ' + rating + '/5' + '<br>' + data[i].brand + '<i class="material-icons right">close</i></span>' +
      //   '<p>' + '<br>'+ 'Description: ' + makeup[i].description + '<br>' +  '</p>' +
      //   '</div></div>' +
      // '</div>')
// }
//   }
  let div = document.createElement('div')
  div.classList.add('col', 's12', 'm4')
  let content = document.querySelector('.main-content')
  div.innerHTML =
    // `<div class = "card">
    //   <img src="${makeup.image_link}">
    //   <div class ="card-section">
    //     <p>${makeup.name}</p>
    //   </div>
    // </div>`

    // '<div class="col s6 m4">' +
    '<div class="card large">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
        '<img class="activator" src="' + makeup.image_link + '">' +
      '</div>' +
      '<div class="card-content">' +
        '<span class="card-title activator grey-text text-darken-4">' + makeup.name + '<i class="material-icons right">more_vert</i></span>' +
        '<p><a href="' + makeup.product_link + '">Product Link</a></p>' +
      '</div>' +
    '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4"> ' + 'Price: $' + makeup.price + '<br>' + 'Review: ' + rating + '<br>' + 'Brand: ' + makeup.brand + '<i class="material-icons right">close</i></span>' +
      '<p>' + '<br>'+ 'Description: ' + makeup.description + '<br>' +  '</p>' +
      '</div></div>'
    // '</div>'

  content.appendChild(div)

}

// $('#submit').click(function(event) {
//   event.preventDefault();
//   // var brand = $('#brand').val()
//   var type = $('#product-type').val()
//   url: typeURL + type
// }).then(function(data) {
//
//   for (i = 0; i < data.length; i++) {
//   console.log(data[i])
//     if (data[i].rating === null) {
//       var rating = 'Not Available';
//     } else {
//       var rating = data[i].rating;
//     }
//
//     $(".main-content").append(
//       '<div class="col s6 m4">' +
//       '<div class="card large">' +
//         '<div class="card-image waves-effect waves-block waves-light">' +
//           '<img class="activator" src="' + data[i].image_link + '">' +
//         '</div>' +
//         '<div class="card-content">' +
//           '<span class="card-title activator grey-text text-darken-4">' + data[i].name + '<i class="material-icons right">more_vert</i></span>' +
//           '<p><a href="#">' + data[i].website_link +'</a></p>' +
//         '</div>' +
//       '<div class="card-reveal">' +
//         '<span class="card-title grey-text text-darken-4"> ' + '$' + data[i].price + '<br>' + 'review: ' + rating + '/5' + '<br>' + data[i].brand + '<i class="material-icons right">close</i></span>' +
//         '<p>' + '<br>'+ 'Description: ' + data[i].description + '<br>' +  '</p>' +
//         '</div></div>' +
//       '</div>')
//   }
// }
// })
// $('.save').click(function(event) {
//   event.preventDefault()
//   types: $(".types option:selected").val()
//
// $.get(typeURL, types)
// .then(function(data) {
//   $('save-status').text(data.message)
//   $('.save-status').show().fadeIn(500).delay(2000).fadeOut(500)
// })
// .catch(function(e) {
//   $('.save-status').text('Please Try Again').show().fadeIn(500).delay(2000).fadeOut(500)
// })
// })
//
// $('#submit').click(function(event) {
//   event.preventDefault();
//   // var brand = $('#brand').val()
//   var type = $('#product-type').val()
//   url: typeURL + type
// //   url: baseURL + "brand=" + brand + "product_type=" + type
// })
// function getMakeup() {


// $.ajax({
//   method: "GET",
//   // url: "https://cors-anywhere.herokuapp.com/http://makeup-api.herokuapp.com/api/v1/products.json"
//   url: "http://makeup-api.herokuapp.com/api/v1/products.json"
// }).then(function(data) {
//
// for (i = 0; i < data.length-1; i++) {
//   if (data[i].rating === null) {
//     var rating = 'Not Available';
//   } else {
//     var rating = data[i].rating;
//   }
//
//   $(".main-content").append(
//     '<div class="col s6 m4">' +
//     '<div class="card large">' +
//       '<div class="card-image waves-effect waves-block waves-light">' +
//         '<img class="activator" src="' + data[i].image_link + '">' +
//       '</div>' +
//       '<div class="card-content">' +
//         '<span class="card-title activator grey-text text-darken-4">' + data[i].name + '<i class="material-icons right">more_vert</i></span>' +
//         '<p><a href="#">' + data[i].website_link +'</a></p>' +
//       '</div>' +
//     '<div class="card-reveal">' +
//       '<span class="card-title grey-text text-darken-4"> ' + '$' + data[i].price + '<br>' + 'review: ' + rating + '/5' + '<br>' + data[i].brand + '<i class="material-icons right">close</i></span>' +
//       '<p>' + '<br>'+ 'Description: ' + data[i].description + '<br>' +  '</p>' +
//       '</div></div>' +
//     '</div>')
//
// }
// })


// })

// $(document).ready(function() {
// $('#card-reveal').append(("<p> </p>").text(data[i].name)

// $('div.card-reveal').append('<p>' + data[i].brand + '</p>')
// $('div.card-reveal').append('<p>' + data[i].price + '</p>')
// $('div.card-reveal').append('<p>' + data[i].product_type + '</p>')
// $('div.card-reveal').append('<p>' + data[i].product_link +  '</p>')
// }




//
//
// // initialize
// $('select').material_select();
//
//
// $("#myButton").click(function() {
//
//   // clear contents
//   var $selectDropdown =
//     $("#dropdownid")
//       .empty()
//       .html(' ');
//
//   // add new value
//   var value = "some value";
//   $selectDropdown.append(
//     $("<option></option>")
//       .attr("value",value)
//       .text(value)
//   );
//
//   // trigger event
//   $selectDropdown.trigger('contentChanged');
// });
//
//
// $('select').on('contentChanged', function() {
//   // re-initialize (update)
//   $(this).material_select();
// });

// });
$(document).ready(function(){
      $('.carousel').carousel();
    });
