var counter = 0;
var testing_value=localStorage.getItem("key");



//const testing_value = JSON.parse(localStorage.getItem('key'));
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userId = firebase.auth().currentUser;
    if (userId != null) {
      var emal = userId.email
      // document.getElementById("emailName").innerHTML = emal;

      $("#emailName").append(emal);
      $("#logIn").hide();
      $("#loOut").show();
      $("#uploadTag").hide();
      if (emal == "admin@au.edu") {
        $("#uploadTag").show();
      }


    }
    var userEmail = firebase.auth().currentUser;
    var userId = firebase.auth().currentUser.uid;
    var userDataRef = firebase.database().ref('/user-posts-cart/' + userId + '/').orderByChild("User").equalTo(userId);
    userDataRef.on("value", function (snapshot) {
         counter = 0;
      var conIdContainer = document.getElementById("conId");
   conIdContainer.innerHTML = '';   
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;

        var childData = childSnapshot.val();
        var user_v = childSnapshot.val().User;


        //  var con = count(userId === user_v);
        // console.log(count)
        if (userId == user_v) {
          add();
        
          
        }
        var userData = firebase.database().ref('/user-posts-cart/' + userId + '/').orderByChild("Cart_Id").equalTo(testing_value);
        userData.on("value", function (snapshot) {
            
          snapshot.forEach(function (childSnapshot) {
         
            var cartItem = childSnapshot.val().cart_item;
           
            localStorage.setItem('cartItem' ,cartItem)
        
          })
        })


      })
      // location.reload()
      console.log(counter)

      $("#conId").append(counter);
    })
   

  }
})
$(document).ready(function () {
  // alert("its working")
  $("#loOut").hide();
  $("#uploadTag").hide();
  //
});
var userDataRef = firebase.database().ref("Product").orderByChild("Job_Id").equalTo(testing_value);
  


userDataRef.once("value").then(function (snapshot) {
 // reload()

  snapshot.forEach(function (childSnapshot) {

    var key = childSnapshot.key;
    var childData = childSnapshot.val();

    var des_val = childSnapshot.val().Description;
    var id_val = childSnapshot.val().Ribbon;
    var price_v = childSnapshot.val().Price;
    var image_v = childSnapshot.val().ImageURL;
    var discount_v = childSnapshot.val().Discount;
    var colo_v = childSnapshot.val().Color;
    var size_v = childSnapshot.val().Size;
    var typeValue = childSnapshot.val().Type;




    var disV = price_v - (discount_v / 100 * price_v)

    // console.log(childData)

    // $("#Product-name").append(name_val);
    // $("#ribbon").append(id_val);
    // $("#prc").append(price_v);
    // $("#type").append(type_v);
    
    var cartItemValue=localStorage.getItem("cartItem");
 
    var btn = `
        
        <div class="col-md-6 mb-4">

          <img src="${image_v}" class="img-fluid" alt=""  height =350 width=350>

        </div>
        <div class="col-md-6 mb-4">

        <!--Content-->
        <div class="p-4">

          <div class="mb-3">
          <a href="">
          <span class="badge red mr-1"> ${id_val}</span>
        </a>
            <a href="">
              <span class="badge blue mr-1"> ${discount_v}%</span>
            </a>
        
          </div>

          <p class="lead">
            <span class="mr-1">
              <del>${price_v}</del>
            </span>
            <span>${disV}</span>
          </p>
          <p class="lead font-weight-bold">Color</p>

          <p>${colo_v}.</p>
          <p class="lead font-weight-bold">Size</p>

          <p>${size_v}.</p>
          <p class="lead font-weight-bold">Description</p>

          <p>${des_val}.</p>

          <form class="d-flex justify-content-left">
            <!-- Default input -->
            <input type="number" value="${cartItemValue}"  aria-label="Search" id="cart_item" class="form-control" style="width: 100px">
            <button class="btn btn-primary btn-md my-0 p" onclick="addToCart()" type="button">Add to cart
              <i class="fa fa-shopping-cart ml-1"></i>
            </button>

          </form>

        </div>
        <!--Content-->

      </div>
      <!--Grid column-->
        `;
    $('#product_desc').append(btn);
      var ribb = "New Arrival"
  
      var userD = firebase.database().ref("Product").orderByChild("Ribbon").equalTo(ribb).limitToFirst(4);
      userD.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
        var image_v = childSnapshot.val().ImageURL;
        var id_v = childSnapshot.val().Job_Id;
          var rec = `
          <div class="col-lg-3 col-md-6 mb-4">

            <!--Card-->
           

              <!--Card image-->
              <div class="view overlay">
          <img src=" ${image_v}"  class="img-fluid" alt=""  >
          <a href="javascript:localStorage.setItem('key' ,'${id_v}');window.location.href='product-page.html';"  >
            <div class="mask rgba-white-slight"></div>
          </a>
          </div>
         
          </div>
       
          `;
          $('#recomPage').append(rec);
      
      
        });
      });


    
  


  });


});


function addToCart() {
  firebase.auth().onAuthStateChanged(function(user) {


  userDataRef.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {

      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var name_val = childSnapshot.val().Product_Name;

      var price_v = childSnapshot.val().Price;

      var image_v = childSnapshot.val().ImageURL;
      var colo_v = childSnapshot.val().Color;
      var job_key = childSnapshot.val().Job_Id;

      var size_v = childSnapshot.val().Size;
      var discount_v = childSnapshot.val().Discount;
      var disV = price_v - (discount_v / 100 * price_v)

    
      var cart = document.getElementById("cart_item");
    
      
      var amount = cart.value * disV
      if (user) {
        var userId = firebase.auth().currentUser.uid;
                insertUpdateData(name_val, disV, image_v, userId, job_key, cart.value, size_v, colo_v, amount);
                Swal(cart.value + ' Item(S) Added To Cart')
      } 
      
      else {
        Swal('Please Log In!')
      }

    });


    });


  });


}

  



function insertUpdateData(name_val, disV, image_v, userId, newPostKey, cart, size_v, colo_v, amount) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userEmail= firebase.auth().currentUser;
  
  //var newPos = firebase.database().ref().child('Cart').push().key;
  postData = {
    Product_Name: name_val,
    Price: disV,
    ImageURL: image_v,
    User: userId,
    Cart_Id: newPostKey,
    cart_item: cart,
    Size: size_v,
    Color: colo_v,
    Amount: amount,

  }
 
  var updates = {};
  updates['/user-posts-cart/' + userId + '/' + newPostKey] =  postData;



  return firebase.database().ref().update(updates);
}
});

}

function add() {
  counter += 1;
  
}



