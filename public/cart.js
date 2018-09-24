
var counter = 0;

var total_result;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
    var emal = user.email;
    // document.getElementById("emailName").innerHTML = emal;

    $("#emailName").append(emal);
    $("#logIn").hide();
    $("#loOut").show();

    var userId = firebase.auth().currentUser.uid;
    var userDataRef = firebase.database() .ref("user-posts-cart/" + userId).orderByChild("User").equalTo(userId);
    userDataRef.on("value", function(snapshot) {
      var total_price = 0;
      var cartInfoContainer = document.getElementById("cartInfo");
      cartInfoContainer.innerHTML = '';
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;

        var childData = childSnapshot.val();

        var name_val = childSnapshot.val().Product_Name;
        var size_val = childSnapshot.val().Size;
        var price_v = childSnapshot.val().Price;
        var color_v = childSnapshot.val().Color;
        var image_v = childSnapshot.val().ImageURL;
        var cart_v = childSnapshot.val().cart_item;
        var amount_v = childSnapshot.val().Amount;
        var cartId = childSnapshot.val().Cart_Id;
        var user_v = childSnapshot.val().User;
        total_price += Number(amount_v);


        //
    
       


        var btn = `
        <tr >
            <th scope="row">
          <a href="javascript:localStorage.setItem('key' ,'${cartId}');window.location.href='product-page.html';"  >
         <img src="${image_v}" alt="" class="img-fluid" height =100 width=100>
        </a>
         
        </th>
        <td>
        <h5 class="mt-3">
         <strong>${name_val}</strong>
        </h5>
        <strong> Size  </strong> : ${size_val}
         </td>
        <td> ${color_v}</td>
        
        <td>${price_v}</td>
        
        <td>
        ${cart_v}
        </td>
       
        
         <td class="font-weight-bold">
         <strong >฿${amount_v}</strong>
          </td>
          
       
         <td>
        <button type="button" onclick="deleteP('${cartId}')" class="btn btn-sm btn-primary" data-toggle="tooltip"  data-placement="top" title="Remove item">X
         </button>
         
         </td>                        
        </tr>
       
        `;

   
        
        $("#cartInfo").append(btn);
      //  $("#total_amount").append(total_price);
    
      });
 
     
      
   
      console.log(total_price);
 
      $("#total_amount").html("฿ " + total_price);
    
    });
    $("#uploadTag").hide();
    if (emal == "admin@au.edu") {
      $("#uploadTag").show();
    }
  }

 
});

function deleteP(key){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          var userId = firebase.auth().currentUser.uid;
          userDataRef = firebase.database() .ref('/user-posts-cart/' + userId + '/' + key );
            userDataRef.remove().then(function(){
              console.log("successful")
            })
          swal(
            'Deleted!',
            'The Item has been deleted.',
            'success'
          )
        }
      })

    }
  })

}


 function confirmation(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     var userId = firebase.auth().currentUser.uid;
      var userDataRef = firebase.database() .ref("user-posts-cart/" + userId).orderByChild("User").equalTo(userId);
      userDataRef.on("value", function(snapshot) {
       
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
  
          var childData = childSnapshot.val();
  
         
          var totl = document.getElementById("total_amount");
          var total =totl.value

       
  
          swal({
            type: 'success',
            title: '฿',
            text:'Your purchase has been confirmed',
            showConfirmButton: false,
            timer: 2500
          })
            
        });
      
       
      
      });
    
    }
  
  
  });
 }



$(document).ready(function() {
  // alert("its working")
  $("#loOut").hide();
  $("#uploadTag").hide();
});




function add() {
  counter += 1;
  
}




