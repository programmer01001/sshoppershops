var counter = 0;
var testing_value=localStorage.getItem("key");
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userId = firebase.auth().currentUser;
    if(userId != null){
      var emal =userId.email
   
     
      $("#emailName").append(emal);
      $("#logIn").hide();
      $("#loOut").show(); 
      $("#uploadTag").hide();
      if(emal == "admin@au.edu"){
          $("#uploadTag").show();
        }
     
    }
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser;
    if(userEmail != null){
    var emal =userEmail.email

    console.log(emal)
    var userDataRef = firebase.database().ref("user-posts-cart/" + userId).orderByChild("User").equalTo(userId);
    userDataRef.on("value", function (snapshot) {
      counter =0;
      var conIdContainer = document.getElementById("conId");
   conIdContainer.innerHTML = '';   
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
  
        var childData = childSnapshot.val();
        var user_v = childSnapshot.val().User;
  
         //update counter
        if (userId == user_v)
         {
          add();
        }
  
    
  
      })
      // append counter
      console.log(counter)
      $("#conId").append(counter);
    })
}
    var userDataRef = firebase.database().ref("Product").orderByChild("Job_Id").equalTo(testing_value);

    userDataRef.on("value", function (snapshot)  {
        var conIdContainer = document.getElementById("product_desc");
        conIdContainer.innerHTML = ''; 
    
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
    var jobID = childSnapshot.val().Job_Id
    var productN = childSnapshot.val().Product_Name

    var btn = `


  
    <div class="card" >

    <!--Card content-->
    <form class="card-body ">
 
    <div class="text-center">
    <img src="${image_v}" class="img-fluid"  id="imageV"  alt="..." height =200 width=200>
  </div>
      <!--Grid row-->
      <div class="row">

        <!--Grid column-->
        <div class="col-md-6 mb-2">


          <!--firstName-->
          <div class="md-form ">
            <input type="text" value="${productN}"  id="ProductName" class="form-control" required>
            <label for="firstName"class="active">Product Name</label>
          </div>

        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-md-6 mb-2">

          <!--lastName-->
          <div class="md-form">
            <input type="text"  value="${price_v}"  id="Price" class="form-control" placeholder="฿" required>
            <label for="lastName" class="active">Price</label>
          </div>

        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->



      
      <div  class="md-form amber-textarea active-amber-textarea-2">
      <textarea type="text" id="Description" class="md-textarea form-control" rows="3"> ${des_val} </textarea>
      <label for="Description" class="active">Desccription</label>
  </div>

      <div class="row">
        <div class="col-md-6 mb-2">

          <!--firstName-->
          <div class="md-form ">
            <input type="text" value="${typeValue}" id="prtype" class="form-control" required>
            <label for="firstName" class="active">Type</label>
          </div>

        </div>

        <div class="col-md-6 mb-2">

          <!--firstName-->
          <div class="md-form ">
            <input type="text" value="${id_val}" id="Ribbon" class="form-control" required>
            <label for="firstName" class="active">Ribbon</label>
          </div>

        </div>

      </div>
      <div class="row">
      <div class="col-lg-4 col-md-6 mb-4">

        <label for="zip" class="active">Discount</label>
        <input type="text" value="${discount_v}" class="form-control" id="dis" placeholder="%" required="" > 
        <div class="invalid-feedback">
          Zip code required.
        </div>

      </div>

      <div class="col-lg-4 col-md-6 mb-4">

          <label for="p" class="active">Size</label>
          <input type="text" value="${size_v}" class="form-control" id="siz" placeholder="" required="" > 
        </div>

        <div class="col-lg-4 col-md-6 mb-4">

            <label for="colp" class="active">Color</label>
            <input type="text" value="${colo_v}" class="form-control" id="colo" placeholder="" required="" > 

          </div>
    </div>
      
      <!--Grid row-->
      <div class="md-form mb-5">
        <input type="file" id="upload" name="upload" />
      </div>
      

     
     
     
      <hr class="mb-4">
      <div class="row">
            <div class="col-md-6 mb-2">
      <button class="btn btn-primary btn-lg btn-block btn-success" onclick="updateB('${jobID}')"  type="button">Update</button>
    </div>
    <div class="col-md-6 mb-2">
      <button class="btn btn-primary btn-lg btn-block btn-danger" onclick="deleteB('${jobID}')"  type="button">Delete</button>
    </div>
</div>
    </form>

  </div>
    `;
    $('#product_desc').append(btn);


    })
})
  }
})
$(document).ready(function()
{  
 // alert("its working")
  $("#loOut").hide(); 
  $("#uploadTag").hide();
});
var selectedfile

var messagesRef = firebase.database().ref('Product');

var cartRef = firebase.database().ref('Cart');


function deleteB(key){
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
            userDataRef = firebase.database() .ref('/Product/' + key );
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

function updateB(keyid){
    var ProductName = document.getElementById("ProductName");
    var Price = document.getElementById("Price");
    var Description = document.getElementById("Description");
    var Type = document.getElementById("prtype");
    var Ribbon = document.getElementById("Ribbon");
    var Discount = document.getElementById("dis");
    var Size = document.getElementById("siz");
    var Color = document.getElementById("colo");
    var im = document.getElementById("imageV");
    console.log(im)
    


    var selectedfile = document.getElementById("upload").files[0];
     if(selectedfile != null){
      
        
        var newPostKey = firebase.database().ref().child('Product').push().key;
 
 
        var fileName = selectedfile.name;
       
        
        var storageRef = firebase.storage().ref('productImages/' + fileName);
        var uploadTask = storageRef.put(selectedfile);
       
 
        uploadTask.on('state_changed', function(snapshot){
        
         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
 
         Swal('Upload is ' + progress + '% done')
        // console.log('Upload is ' + progress + '% done');
         switch (snapshot.state) {
           case firebase.storage.TaskState.PAUSED: // or 'paused'
             console.log('Upload is paused');
             break;
           case firebase.storage.TaskState.RUNNING: 
             console.log('Upload is running');
             break;
         }
       }, function(error) {
           console.log(error)
         // Handle unsuccessful uploads
       }, function() {
       
         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
           console.log('File available at', downloadURL);
           console.log(downloadURL)
           
           insertUpdateData(ProductName.value,Price.value,Description.value,Type.value,Ribbon.value,Discount.value,downloadURL,keyid,Size.value,Color.value);
 
          // insertDataToCart(ProductName.value,Price.value,Description.value,Type.value,Ribbon.value,Discount.value,downloadURL,newPostKey,Size.value,Color.value)
           // location.href = "index.html";
       
          
         });
       });
      }
      else{
        var userDataRef = firebase.database().ref("Product").orderByChild("Job_Id").equalTo(testing_value);

        userDataRef.on("value", function (snapshot)  {
          
        
          snapshot.forEach(function (childSnapshot) {
            var image_v = childSnapshot.val().ImageURL;
            console.log(image_v)

        insertUpdateData(ProductName.value,Price.value,Description.value,Type.value,Ribbon.value,Discount.value,image_v,keyid,Size.value,Color.value);
        Swal('Update Successful')

    
    });
});
    }
     
     
  
    
     
 
   }


function insertUpdateData(ProductName,Price,Description,Type,Ribbon,Discount,upload,jobId,size,color) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userEmail= firebase.auth().currentUser;
    
    //var newPos = firebase.database().ref().child('Cart').push().key;
    postData = {
        Product_Name : ProductName,
        Price :  Price,
        Description : Description,
        Type : Type,
        Ribbon : Ribbon,
        Discount: Discount,
        ImageURL : upload,
        Job_Id : jobId,
        Size : size,
        Color : color,
  
    }
   
    var updates = {};
    updates['/Product/'+ jobId] =  postData;
  
  
  
    return firebase.database().ref().update(updates);
  }
  });
  
  }

/* function insertDataToCart(ProductName,Price,Description,Type,Ribbon,Discount,upload,jobId,size,color){
  
  var newMessageRef = cartRef.push();
 
   newMessageRef.set({
      Product_Name : ProductName,
      Price :  Price,
      Description : Description,
      Type : Type,
      Ribbon : Ribbon,
      Discount: Discount,
      ImageURL : upload,
      Job_Id : jobId,
      Size : size,
      Color : color,
    
  },function(error) {
      if(error){
        Swal(error)
         
      }else{
          console.log("successful")
      }
     
    }); 

}
*/
function add() {
  counter += 1;
  
}