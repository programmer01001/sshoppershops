var mainApp = {};
(function(){
//var mainContainer = document.getElementById("loOut");

    var logtout =  function(){
        firebase.auth().signOut().then(function(){
            console.log('success');
            
            
            window.location.replace("index.html");
        },function(){})
    }

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("stay");
       //  mainContainer.style.display = "";
        } 
        
    /*     else {
    
            
          // No user is signed in.
        //mainContainer.style.display = "none";
          console.log("redirect");
          window.location.replace("index.html");
        } */
      });
}
    
init();

mainApp.logout = logtout;
})();