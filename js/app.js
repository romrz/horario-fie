$("#form").submit(function(e) {
    $.ajax({
        url: "pageScript.php",
        method: "POST",
        data: { materia: $("#materia").val() },
        dataType: "html"
    })
    .done(function(html) {
        $("#info").html(html); 
    })
    .fail(function() {
        alert("failure");
    });
    e.preventDefault();
});
