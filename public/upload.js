var counter = 0;
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




function prodSubmit(){
    
    var selectedfile = document.getElementById("upload").files[0];
  
       var ProductName = document.getElementById("ProductName");
       var Price = document.getElementById("Price");
       var Description = document.getElementById("Description");
       var Type = document.getElementById("prtype");
       var Ribbon = document.getElementById("Ribbon");
       var Discount = document.getElementById("dis");
       var Size = document.getElementById("siz");
       var Color = document.getElementById("colo");
       
       
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
          insertData(ProductName.value,Price.value,Description.value,Type.value,Ribbon.value,Discount.value,downloadURL,newPostKey,Size.value,Color.value);

         // insertDataToCart(ProductName.value,Price.value,Description.value,Type.value,Ribbon.value,Discount.value,downloadURL,newPostKey,Size.value,Color.value)
          // location.href = "index.html";

         
        });
      });
     
  
    
     
 
   }
function insertData(ProductName,Price,Description,Type,Ribbon,Discount,upload,jobId,size,color){
  firebase.database().ref('Product/' + jobId).set({
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
  
  }),function(error) {
        if(error){
          Swal(error)
           
        }else{
            console.log("successful")
        }
       
      };

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