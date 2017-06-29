$(document).ready(function() {
  $('.dropdown-button').dropdown();

  $.get('guitars.json')
    .then(function(data) {
      for (var i = 0; i < 3; i++) {
        $('#f' + (i + 1)).text(data.favorites[i].name)
        $('.fimage' + (i + 1)).attr('src', data.favorites[i]['image'])
        $('.fname' + (i + 1)).text(data.favorites[i].name)
        $('.fprice' + (i + 1)).text(data.favorites[i].price)

      }

      // $(".bob").change(function() {
      //       $(".role-preview").attr("src", data.favorites[0].image);
      //     })

    })
  // }) this might make the guitar woork
  //
});

function appendStyles(styleData) {
  sortStyles(styleData);
  //Iterate through styleData object from GET request
  for (var i = 0; i < styleData.data.length; i++) {
    $('#beerType').append('<option value="' + styleData.data[i].id + ',' + i +
      '">' + styleData.data[i].name + '</option>');
    //Re-initialize Select
    $('select').material_select();
    //On select change, append card with style info
    $('#beerType').change(addStyleCard);

    function addStyleCard() {
      var parts = this.value.split(',');
      var index = parts[1];
      var name = styleData.data[index].name;
      var description = styleData.data[index].description;
      var abvMin = styleData.data[index].abvMin;
      var abvMax = styleData.data[index].abvMax;
      var abvRange = abvMin + ' - ' + abvMax;
      if (abvMin === undefined || abvMax === undefined) {
        abvRange = 'N/A';
      }
      var ibuMin = styleData.data[index].ibuMin;
      var ibuMax = styleData.data[index].ibuMax;
      var ibuRange = ibuMin + '-' + ibuMax;
      if (ibuMin === undefined || ibuMax === undefined) {
        ibuRange = 'N/A';
      }
      var styleId = parts[0];
      var beerUrl = 'http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers/?key=53f372495b64d9d4e9a86e2a8ca999b4&styleId=' + styleId + '&hasLabels=y&withBreweries=y';
      // Remove previous content from #styleCard
      $('#styleCard').empty();
      // this is how to -142,15 +144,15 @@ function appendBeers(beerImage, beerName, beerId, beerDescription, beerABV, beer
      $('#beerCards').append(
        '<div class ="beer-card container col s12 m6 l4">' +
        '<div class="card sticky-action beer-card hoverable">' +
        '<div class="card-image">' +
        '<img id="' + beerId + '" class="activator" src="' + beerImage + '">' +
        '</div>' +
        'div class ="card-reveal">' +
        '<span class ="card-title grey-text text-darken-4">' + brewery + '<i class="material-icons right"> close</i></span>' +
        '<p>' + beerDescription + < /p> +
        '<div class= "ibu-organic-container">' +
        '<soan class="grey-text text-darken-4">ABV: ' + beerABV + '%' +
        '</span>' +
        '<span class="grey-text text-darken-4">IBU: ' + beerIBU +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
      )
    }

    - // // Sort function
    - // function sortStyles (styles) {
    - //   styles.data.sort(function(a, b){
    - //     if (a.name < b.name) {
    - //       return -1;
    - //     }
    - //     if (a.name > b.name) {
    - //       return 1;
    - //     }
    - //     return 0;
    - //   });
    - // }
    + // Sort function
    + function sortStyles(styles) {
      +styles.data.sort(function(a, b) {
        +
        if (a.name < b.name) {
          +
          return -1; +
        } +
        if (a.name > b.name) {
          +
          return 1; +
        } +
        return 0; +
      }); +
    }
//
//  	 $(document).ready(function() {
//    Initialize Select
//    $('select').material_select();
//    //Store URL for styles GET request
//var styleURL = 'https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/styles/?key=53f372495b64d9d4e9a86e2a8ca999b4';
//     //GET request for beer styles
//     $.get(styleURL, appendStyles);
//  });
//  @@ -16,27 +16,27 @@
//    //Re-initialize Select		   //Re-initialize Select
//    $('select').material_select();		   $('select').material_select();
//    //On select change, append card with style info		   //On select change, append card with style info
//    $('#beerType').change(addStyleCard);		   $('#beerType').change(addStyleCard);
//
//    function addStyleCard() {		   function addStyleCard() {
//      var parts = this.value.split(',');		     var parts = this.value.split(',');
//      var index = parts[1];		     var index = parts[1];
//      var name = styleData.data[index].name;		     var name = styleData.data[index].name;
//      var description = styleData.data[index].description;		     var description = styleData.data[index].description;
//      var abvMin = styleData.data[index].abvMin;		     var abvMin = styleData.data[index].abvMin;
//      var abvMax = styleData.data[index].abvMax;		     var abvMax = styleData.data[index].abvMax;
//      var abvRange = abvMin + ' - ' + abvMax;		     var abvRange = abvMin + ' - ' + abvMax;
//      if (abvMin === undefined || abvMax === undefined) {		     if (abvMin === undefined || abvMax === undefined) {
//        abvRange = 'N/A';		       abvRange = 'N/A';
//      }		     }
//      var ibuMin = styleData.data[index].ibuMin;		     var ibuMin = styleData.data[index].ibuMin;
//      var ibuMax = styleData.data[index].ibuMax;		     var ibuMax = styleData.data[index].ibuMax;
//      var ibuRange = ibuMin + ' - ' + ibuMax;		     var ibuRange = ibuMin + ' - ' + ibuMax;
//      if (ibuMin === undefined || ibuMax === undefined) {		     if (ibuMin === undefined || ibuMax === undefined) {
//        ibuRange = 'N/A';		       ibuRange = 'N/A';
//      }		     }
//      var styleId = parts[0];		     var styleId = parts[0];
// -    var beerUrl = 'http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers/?key=53f372495b64d9d4e9a86e2a8ca999b4&styleId=' + styleId + '&hasLabels=y&withBreweries=y';		+    var beerUrl = 'https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/beers/?key=53f372495b64d9d4e9a86e2a8ca999b4&styleId=' + styleId + '&hasLabels=y&withBreweries=y';
//      // Remove previous content from #styleCard		     // Remove previous content from #styleCard
//      $('#styleCard').empty();		     $('#styleCard').empty();
//      // Remove previous content from #beerCards		     // Remove previous content from #beerCards
//  @@ -59,27 +59,27 @@
//                '</div>' +		               '</div>' +
//              '</div>' +		             '</div>' +
//            '</div>' +		           '</div>' +
//          '</div>' +		         '</div>' +
//        '</div>'		       '</div>'
//      );		     );
//      // GET request for beer data based on value of select		     // GET request for beer data based on value of select
//      $.get(beerUrl, addBeerCards)		     $.get(beerUrl, addBeerCards)
//        .then(function(beerData) {		       .then(function(beerData) {
//          if (beerData.numberOfPages > 1) {		         if (beerData.numberOfPages > 1) {
//            for (var j = 2; j <= beerData.numberOfPages; j++) {		           for (var j = 2; j <= beerData.numberOfPages; j++) {
//              var newUrl = beerUrl + '&p=' + j;		             var newUrl = beerUrl + '&p=' + j;
//              $.get(newUrl, addBeerCards);		             $.get(newUrl, addBeerCards);
//            }		           }
//          }		         }
//        });		       });
//    }		   }
//  }		 }
//
//  // function triggerModal() {		 // function triggerModal() {
//  //   console.log('Modal Trigger');		 //   console.log('Modal Trigger');
//  //   console.log(this.id);		 //   console.log(this.id);
//  //   var beerId = this.id;		 //   var beerId = this.id;
// -//   var beerIdUrl = 'http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beer/' + beerId + '/?key=53f372495b64d9d4e9a86e2a8ca999b4';		+//   var beerIdUrl = 'https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/beer/' + beerId + '/?key=53f372495b64d9d4e9a86e2a8ca999b4';
//  //   $.get(beerIdUrl, populateModal);		 //   $.get(beerIdUrl, populateModal);
//  // }		 // }
//  //		 //
