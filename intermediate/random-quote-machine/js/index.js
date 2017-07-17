$(document).ready(function() {
  $("#refresh").click(function() {
    $.ajax({
    url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
     // Expect `json` back from server
      cache: false,
      dataType:'json',
     
    success:  function(a) {
         $("#quote").html(a[0].content);
         $("#author").html(a[0].title);
        }  
      });
  });
});