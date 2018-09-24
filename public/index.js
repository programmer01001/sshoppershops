var counter = 0;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userId = firebase.auth().currentUser;
    if(userId != null ){
      var emal =userId.email
      console.log(emal);
     
     
      $("#emailName").append(emal);
      $("#logIn").hide();
      $("#loOut").show(); 
      $("#uploadTag").hide();
    
   
      
     
      if(emal == "admin@au.edu"){  
        $("#uploadTag").show();
        
   
       //get value from firebase
   var userDataRef = firebase.database().ref("Product");
   
   userDataRef.on("value",function(snapshot) {
    var productInfoContainer = document.getElementById("productInfo");
    productInfoContainer.innerHTML = '';
    snapshot.forEach(function(childSnapshot) {

     

        var key = childSnapshot.key;
        var childData = childSnapshot.val();    
              
         
        var name_val = childSnapshot.val().Product_Name;
        var id_val = childSnapshot.val().Ribbon;
        var price_v = childSnapshot.val().Price;
        var type_v = childSnapshot.val().Type;
        var image_v = childSnapshot.val().ImageURL;
        var job_key = childSnapshot.val().Job_Id;

       
        console.log(key)
     
        // $("#Product-name").append(name_val);
        // $("#ribbon").append(id_val);
        // $("#prc").append(price_v);
        // $("#type").append(type_v);
        //myFunction(job_key)
      
      
        var name = job_key
      
      
     
        var btn = `
        <div class="col-lg-3 col-md-6 mb-4" id="jobKey"   >

            <!--Card-->
            <div class="card">

              <!--Card image-->
              <div class="view overlay">
        <img src=" ${image_v}"  class="card-img-top" alt="Card image cap" height =305 width=180 >
        <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='product-page.html';"  >
          <div class="mask rgba-white-slight"></div>
        </a>
        </div>
        
        <div  class="card card-outline-info text-xs-center">
        <!--Category & Title-->
        <span  class="grey-text" id ="type">
          <h5 >${type_v}</h5>
        </span>
        <h5 >
          <strong>
            <Span class="dark-grey-text" id="Product-name">${name_val} </Span>
              <span class="badge badge-pill danger-color" id ="ribbon">${id_val}</span>
            
          </strong>
        </h5>
        
        <h4 class="font-weight-bold blue-text" id ="prc">
          <strong>฿ ${price_v}</strong>
        </h4>
      
        </div> 
      
        <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='edit.html';"  class="nav-link border border-light rounded waves-effect" >
        <i class="fa fa-edit" id="editCard" style="font-size:24px;color:red"></i>
        </a>
        
   
              <!--Card content-->
             
              
            </div>
            <!--Card-->
       
          </div>
          
        `;
        $('#productInfo').append(btn);
        
        
       

     });


   });
   
        
      }
    }
   

   
    //update and keep track of counter based on the user
    var userId = firebase.auth().currentUser.uid;
    var userDataRef = firebase.database().ref('/user-posts-cart/' + userId + '/').orderByChild("User").equalTo(userId);
    userDataRef.on("value", function (snapshot) {
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

  $("#loOut").hide(); 
  $("#uploadTag").hide();

});
      //get value from firebase
      var userDataRef = firebase.database().ref("Product");

      userDataRef.on("value",function(snapshot) {
       var productInfoContainer = document.getElementById("productInfo");
       productInfoContainer.innerHTML = '';
       snapshot.forEach(function(childSnapshot) {
      
        
      
           var key = childSnapshot.key;
           var childData = childSnapshot.val();    
                 
            
           var name_val = childSnapshot.val().Product_Name;
           var id_val = childSnapshot.val().Ribbon;
           var price_v = childSnapshot.val().Price;
           var type_v = childSnapshot.val().Type;
           var image_v = childSnapshot.val().ImageURL;
           var job_key = childSnapshot.val().Job_Id;
      
          
           console.log(key)
        
           // $("#Product-name").append(name_val);
           // $("#ribbon").append(id_val);
           // $("#prc").append(price_v);
           // $("#type").append(type_v);
           //myFunction(job_key)
         
         
           var name = job_key
         
         
        
           var btn = `
           <div class="col-lg-3 col-md-6 mb-4" id="jobKey"   >
      
               <!--Card-->
               <div class="card">
      
                 <!--Card image-->
                 <div class="view overlay">
           <img src=" ${image_v}"   class="card-img-top" alt="Card image cap" height =305 width=180 >
           <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='product-page.html';"  >
             <div class="mask rgba-white-slight"></div>
           </a>
           </div>
           
           <div class="card card-outline-info text-xs-center" >
           <!--Category & Title-->
           <!--Category & Title-->
           <span  class="grey-text" id ="type">
             <h5 >${type_v}</h5>
           </span>
           <h5 >
             <strong>
               <Span class="dark-grey-text" id="Product-name">${name_val} </Span>
                 <span class="badge badge-pill danger-color" id ="ribbon">${id_val}</span>
               
             </strong>
           </h5>
           
           <h4 class="font-weight-bold blue-text" id ="prc">
             <strong>฿ ${price_v}</strong>
           </h4>
         
           </div> 
           <div  style="display: none;">
           <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='edit.html';"  class="nav-link border border-light rounded waves-effect" >
           <i class="fa fa-edit" id="editCard" style="font-size:24px;color:red"></i>
           </a>
           </div>
      
                 <!--Card content-->
                
                 
               </div>
               <!--Card-->
          
             </div>
             
           `;
           $('#productInfo').append(btn);
           
           
          
      
        });
      
      
      });



  //counter function
   function add() {
    counter += 1;
    
  }

  function allItem(){
    var userDataRef = firebase.database().ref("Product");
   
    userDataRef.on("value",function(snapshot) {
      var conIdContainer = document.getElementById("conId");
   conIdContainer.innerHTML = '';   
     var productInfoContainer = document.getElementById("productInfo");
     productInfoContainer.innerHTML = '';
     snapshot.forEach(function(childSnapshot) {
 
      
 
         var key = childSnapshot.key;
         var childData = childSnapshot.val();    
               
          
         var name_val = childSnapshot.val().Product_Name;
         var id_val = childSnapshot.val().Ribbon;
         var price_v = childSnapshot.val().Price;
         var type_v = childSnapshot.val().Type;
         var image_v = childSnapshot.val().ImageURL;
         var job_key = childSnapshot.val().Job_Id;
 
        
         console.log(key)
      
         // $("#Product-name").append(name_val);
         // $("#ribbon").append(id_val);
         // $("#prc").append(price_v);
         // $("#type").append(type_v);
         //myFunction(job_key)
       
       
         var name = job_key
       
       
      
         var btn = `
           <div class="col-lg-3 col-md-6 mb-4" id="jobKey"   >
      
               <!--Card-->
               <div class="card">
      
                 <!--Card image-->
                 <div class="view overlay">
           <img src=" ${image_v}"   class="card-img-top" alt="Card image cap" height =305 width=180 >
           <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='product-page.html';"  >
             <div class="mask rgba-white-slight"></div>
           </a>
           </div>
           
           <div class="card card-outline-info text-xs-center" >
           <!--Category & Title-->
           <!--Category & Title-->
           <span  class="grey-text" id ="type">
             <h5 >${type_v}</h5>
           </span>
           <h5 >
             <strong>
               <Span class="dark-grey-text" id="Product-name">${name_val} </Span>
                 <span class="badge badge-pill danger-color" id ="ribbon">${id_val}</span>
               
             </strong>
           </h5>
           
           <h4 class="font-weight-bold blue-text" id ="prc">
             <strong>฿ ${price_v}</strong>
           </h4>
         
           </div> 
           <div  style="display: none;">
           <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='edit.html';"  class="nav-link border border-light rounded waves-effect" >
           <i class="fa fa-edit" id="editCard" style="font-size:24px;color:red"></i>
           </a>
           </div>
      
                 <!--Card content-->
                
                 
               </div>
               <!--Card-->
          
             </div>
             
           `;
           $('#productInfo').append(btn);
         
         
        
 
      });
 
 
    });
 
  }

  function shirtPress(){
    var userDataRef = firebase.database().ref("Product").orderByChild("Type").equalTo("Shirt");
   
    userDataRef.on("value",function(snapshot) {
      var conIdContainer = document.getElementById("conId");
   conIdContainer.innerHTML = '';   
     var productInfoContainer = document.getElementById("productInfo");
     productInfoContainer.innerHTML = '';
     snapshot.forEach(function(childSnapshot) {
 
      
 
         var key = childSnapshot.key;
         var childData = childSnapshot.val();    
               
          
         var name_val = childSnapshot.val().Product_Name;
         var id_val = childSnapshot.val().Ribbon;
         var price_v = childSnapshot.val().Price;
         var type_v = childSnapshot.val().Type;
         var image_v = childSnapshot.val().ImageURL;
         var job_key = childSnapshot.val().Job_Id;
 
        
         console.log(key)
      
         // $("#Product-name").append(name_val);
         // $("#ribbon").append(id_val);
         // $("#prc").append(price_v);
         // $("#type").append(type_v);
         //myFunction(job_key)
       
       
         var name = job_key
       
       
      
         var btn = `
         <div class="col-lg-3 col-md-6 mb-4" id="jobKey"   >
    
             <!--Card-->
             <div class="card">
    
               <!--Card image-->
               <div class="view overlay">
         <img src=" ${image_v}"   class="card-img-top" alt="Card image cap" height =305 width=180 >
         <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='product-page.html';"  >
           <div class="mask rgba-white-slight"></div>
         </a>
         </div>
         
         <div class="card card-outline-info text-xs-center" >
         <!--Category & Title-->
         <!--Category & Title-->
         <span  class="grey-text" id ="type">
           <h5 >${type_v}</h5>
         </span>
         <h5 >
           <strong>
             <Span class="dark-grey-text" id="Product-name">${name_val} </Span>
               <span class="badge badge-pill danger-color" id ="ribbon">${id_val}</span>
             
           </strong>
         </h5>
         
         <h4 class="font-weight-bold blue-text" id ="prc">
           <strong>฿ ${price_v}</strong>
         </h4>
       
         </div> 
         <div  style="display: none;">
         <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='edit.html';"  class="nav-link border border-light rounded waves-effect" >
         <i class="fa fa-edit" id="editCard" style="font-size:24px;color:red"></i>
         </a>
         </div>
    
               <!--Card content-->
              
               
             </div>
             <!--Card-->
        
           </div>
           
         `;
         $('#productInfo').append(btn);
         
         
        
 
      });
 
 
    });
 
  }

  function sportwearPress(){
    var userDataRef = firebase.database().ref("Product").orderByChild("Type").equalTo("Sport Wear");
   
    userDataRef.on("value",function(snapshot) {
      var conIdContainer = document.getElementById("conId");
   conIdContainer.innerHTML = '';   
     var productInfoContainer = document.getElementById("productInfo");
     productInfoContainer.innerHTML = '';
     snapshot.forEach(function(childSnapshot) {
 
      
 
         var key = childSnapshot.key;
         var childData = childSnapshot.val();    
               
          
         var name_val = childSnapshot.val().Product_Name;
         var id_val = childSnapshot.val().Ribbon;
         var price_v = childSnapshot.val().Price;
         var type_v = childSnapshot.val().Type;
         var image_v = childSnapshot.val().ImageURL;
         var job_key = childSnapshot.val().Job_Id;
 
        
         console.log(key)
      
         // $("#Product-name").append(name_val);
         // $("#ribbon").append(id_val);
         // $("#prc").append(price_v);
         // $("#type").append(type_v);
         //myFunction(job_key)
       
       
         var name = job_key
       
       
      
         var btn = `
         <div class="col-lg-3 col-md-6 mb-4" id="jobKey"   >
    
             <!--Card-->
             <div class="card">
    
               <!--Card image-->
               <div class="view overlay">
         <img src=" ${image_v}"   class="card-img-top" alt="Card image cap" height =305 width=180 >
         <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='product-page.html';"  >
           <div class="mask rgba-white-slight"></div>
         </a>
         </div>
         
         <div class="card card-outline-info text-xs-center" >
         <!--Category & Title-->
         <!--Category & Title-->
         <span  class="grey-text" id ="type">
           <h5 >${type_v}</h5>
         </span>
         <h5 >
           <strong>
             <Span class="dark-grey-text" id="Product-name">${name_val} </Span>
               <span class="badge badge-pill danger-color" id ="ribbon">${id_val}</span>
             
           </strong>
         </h5>
         
         <h4 class="font-weight-bold blue-text" id ="prc">
           <strong>฿ ${price_v}</strong>
         </h4>
       
         </div> 
         <div  style="display: none;">
         <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='edit.html';"  class="nav-link border border-light rounded waves-effect" >
         <i class="fa fa-edit" id="editCard" style="font-size:24px;color:red"></i>
         </a>
         </div>
    
               <!--Card content-->
              
               
             </div>
             <!--Card-->
        
           </div>
           
         `;
         $('#productInfo').append(btn);
         
         
        
 
      });
 
 
    });
 
  }

  function outwearPress(){
    var userDataRef = firebase.database().ref("Product").orderByChild("Type").equalTo("Out Wear");
   
    userDataRef.on("value",function(snapshot) {
      var conIdContainer = document.getElementById("conId");
   conIdContainer.innerHTML = '';   
     var productInfoContainer = document.getElementById("productInfo");
     productInfoContainer.innerHTML = '';
     snapshot.forEach(function(childSnapshot) {
 
      
 
         var key = childSnapshot.key;
         var childData = childSnapshot.val();    
               
          
         var name_val = childSnapshot.val().Product_Name;
         var id_val = childSnapshot.val().Ribbon;
         var price_v = childSnapshot.val().Price;
         var type_v = childSnapshot.val().Type;
         var image_v = childSnapshot.val().ImageURL;
         var job_key = childSnapshot.val().Job_Id;
 
        
         console.log(key)
      
         // $("#Product-name").append(name_val);
         // $("#ribbon").append(id_val);
         // $("#prc").append(price_v);
         // $("#type").append(type_v);
         //myFunction(job_key)
       
       
         var name = job_key
       
       
      
         var btn = `
         <div class="col-lg-3 col-md-6 mb-4" id="jobKey"   >
    
             <!--Card-->
             <div class="card">
    
               <!--Card image-->
               <div class="view overlay">
         <img src=" ${image_v}"   class="card-img-top" alt="Card image cap" height =305 width=180 >
         <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='product-page.html';"  >
           <div class="mask rgba-white-slight"></div>
         </a>
         </div>
         
         <div class="card card-outline-info text-xs-center" >
         <!--Category & Title-->
         <!--Category & Title-->
         <span  class="grey-text" id ="type">
           <h5 >${type_v}</h5>
         </span>
         <h5 >
           <strong>
             <Span class="dark-grey-text" id="Product-name">${name_val} </Span>
               <span class="badge badge-pill danger-color" id ="ribbon">${id_val}</span>
             
           </strong>
         </h5>
         
         <h4 class="font-weight-bold blue-text" id ="prc">
           <strong>฿ ${price_v}</strong>
         </h4>
       
         </div> 
         <div  style="display: none;">
         <a href="javascript:localStorage.setItem('key' ,'${name}');window.location.href='edit.html';"  class="nav-link border border-light rounded waves-effect" >
         <i class="fa fa-edit" id="editCard" style="font-size:24px;color:red"></i>
         </a>
         </div>
    
               <!--Card content-->
              
               
             </div>
             <!--Card-->
        
           </div>
           
         `;
         $('#productInfo').append(btn);
         
         
        
 
      });
 
 
    });
 
  }



  function show() { 
    if(document.getElementById('editCard').style.display=='none') { 
        document.getElementById('editCard').style.display='block'; 
    } 
    return false;
  }

