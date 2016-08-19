
/*
    Shows a message.

    message param: The text to be displayed.
    type param: The type of the message.

    The message's type can be one of the following:
        success, info, warning, danger.

    The message is displayed for ten seconds and then 
    it is hidden.
*/
function showMessage(message, type) {
    hideMessage(false);
    $("#message").addClass("alert-" + type).find("> span").html(message);
    $("#message").fadeIn("fast");

    if(timer) {
        clearTimeout(timer);
        timer = null;
    }

    timer = setTimeout(function() {
        hideMessage(true);
    }, 10000);
}

/*
    Hides the message.

    WithEffect determines if the message should be
    hidden with a fade effect or not.
*/
function hideMessage(withEffect) {
    var message = $("#message")
    .removeClass("alert-success")
    .removeClass("alert-warning")
    .removeClass("alert-danger")
    .removeClass("alert-info");

    if(withEffect) {
        message.fadeOut("fast");
    }
    else {
        message.hide();
    }
}

/*
    Show the tab specified by tabName.
    The tabs can be "Schedule (Horario)" or "Groups (Groups)"
    these are inside the group plan view.
*/
function showTab(tabName) {
    $(".current .tab-selected").removeClass("tab-selected");
    $(".current ." + tabName + "-tab").addClass("tab-selected");
    $(".current .schedule").hide();
    $(".current .groups").hide();
    $(".current ." + tabName).show();
}

/*
    Show the new group plan, hiding the current one.
*/
function showGroupPlan(plan, newElement) {
    var currentElement = $(".current");
    var tabToSelect = currentElement.find(".tab-selected").data("tab");

    currentElement.removeClass("current").hide();
    newElement.addClass("current");
    showTab(tabToSelect);
    newElement.show();

    // Show only the necessary buttons for changing the group plan
    $(".slide-control").show();
    $(".slide-control-mobile").show();
    if(newElement.prev().length === 0) {
        $(".left-control").hide();
    }
    if((plan.currentGroupPlan + 1) >= plan.groupPlans.length) {
        $(".right-control").hide();
    }
}


/*
    Helper functions to manipulate the DOM and
    make the code a little more readable.
*/

function hideEverything() {
    hideMessage(false);
    $(".slide-control").hide();
    $(".slide-control-mobile").hide();
    $(".start-message").hide();
    $(".info-container").hide();
    $(".loader").hide();
}

function showStartMessage() {
    hideEverything();
    $(".start-message").show();
}

function addSubjectToTable(subject) {
    $(".selected-subjects table").append(
        "<tr>" +
            "<td>" + subject.name + "</td>" +
            "<td>" + subject.credits + "</td>" +
            "<td>" + subject.optional + "</td>" +
            "<td>" +
                "<button class=\"btn btn-danger remove-subject-btn\" data-subject=\"" + subject.name + "\">" +
                    "&times;" +
                "</button>" +
            "</td>" +
        "</tr>"
    );
}

function removeSubjectFromTable(index) {
    $(".selected-subjects table tr:nth-child(" + (index + 2) + ")").remove();
}

function getTableCell(table, row, col) {
    return table.find("tr:nth-child(" + row + ")").find("td:nth-child(" + col + ")");
}

function enableInputs() {
    $("#materia").removeAttr("disabled");
    $(".btn-subject").removeAttr("disabled"); 
}

function disableInputs() {
    $("#materia").attr("disabled", "disabled");
    $(".btn-subject").attr("disabled", "disabled"); 
}
