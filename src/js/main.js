
// User's plan
var plan = null;

// Helper to show a message for only certain time
var timer = null;

$(document).ready(function () {

    // User presses the main button in the index page
    $("#main-button").click(startEvent);

    // User presses the "add subject" button
    $(".btn-subject").click(addSubjectEvent);

    // User presses any of the buttons to change the current group plan
    $("body").on("click", ".btn-slide-control", changeGroupPlanEvent); 

    // User presses the button to remove a subject
    $("body").on("click", ".remove-subject-btn", removeSubjectEvent);

    // User presses one of the tabs (schedule or groups)
    $("body").on("click", ".tab", function(event) {
        showTab($(event.target).data("tab"));
    });

    // User closes a message
    $(".message .close-btn").click(function() {
        hideMessage(true);
    });

});

/*
    Called when the user presses the main button
    on the index page.

    Hides the index message and shows the app's content.
*/
function startEvent() {
    $(".index-page-container").hide();
    $(".app-container").css("display", "flex"); 
}

/*
    Called when the user adds a new subject to the plan. 
*/
function addSubjectEvent(event) {
    disableInputs();
    hideEverything();
    $(".loader").show();

    // Sends an AJAX request to get the raw HTML with the
    // subject's information
    $.ajax({
        url: "https://horario-fie-api-v2.herokuapp.com",
        method: "GET",
        data: { subject: $("#materia").val() },
        dataType: "json",
        crossDomain: true,
    })
    .done(function(json) {
        var subject = SubjectMapper(json).map();

        if(subject === null) {
            showMessage("No existen grupos para la materia seleccionada", "danger");
            return;
        }

        // Creates a new Plan object if it doesn't exist
        if(plan === null) {
            plan = Plan();
        }

        if(!plan.hasSubject(subject)) { 
            plan.addSubject(subject);
        }

        plan.displayFirstGroupPlan();
    })
    .fail(function() {
        showMessage("Error al conectar con el servidor. Por favor inténtalo de nuevo", "danger");
    })
    .always(function() {
        enableInputs();
        $(".loader").hide();
        $(".selected-subjects").show();
        $(".info-container").show();
    });
}

/*
    Called when the user removes a subject
*/
function removeSubjectEvent(event) {
    var subjectName = $(event.target).data("subject");
    plan.removeSubject(subjectName);
    plan.displayFirstGroupPlan();
}

/*
    Called when the user wants to change the currently
    displayed group plan. This is, when the user clicks
    any of the buttons to change the group plan.
*/
function changeGroupPlanEvent(event) {
    var button = $(event.target).parent();
    if(button.hasClass("left-control")) {
        plan.displayPreviousGroupPlan();
    }
    else if(button.hasClass("right-control")) {
        plan.displayNextGroupPlan();
    }
} 
