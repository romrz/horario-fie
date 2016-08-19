
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
    SubjectParser is the responsible for obtaining the relevant subject
    information from the raw HTML retrieved by the request to:
    https://escolar.fie.umich.mx/actual/estudiante/materia-sig.php
*/
var SubjectParser = function(html) {
    var obj = Object.create(SubjectParser.prototype);

    obj.html = html;

    return obj;
}

/*
    Parses the subject and all its information from the raw HTML

    Returns a Subject if there were no errors or null otherwise
*/
SubjectParser.prototype.parse = function() {
    var htmlNode = $("<div></div>").html(this.html);
    var basicInfoNode = htmlNode.find("table").not(".menu").first().find("tr").last();
    var groupsInfoNode = htmlNode.find(".interesante");

    if(groupsInfoNode.children().length == 0) return null;

    var subject = Subject();
    subject.id = basicInfoNode.find("td:nth-child(1)").html();
    subject.name = basicInfoNode.find("td:nth-child(2)").html();
    subject.optional = basicInfoNode.find("td:nth-child(3)").html() == "S" ? "Si" : "No";
    subject.credits = parseInt(basicInfoNode.find("td:nth-child(4)").html());
    subject.setGroups(this.parseGroups(groupsInfoNode));

    return subject;
}

/*
    Parses the groups of the subject and all its information.
    
    Returns an array of Group objects.
*/
SubjectParser.prototype.parseGroups = function (htmlNode) {
    var Class = this;
    var groups = [];
    var groupNodes = htmlNode.find("table").parent().parent();

    groupNodes.each(function(index, groupNode) {
        var node = $(groupNode);

        var groupData = node.find("td:first-child").html().split("<br>");
        var scheduleNode = node.find("table");

        var group = Group();
        group.number = groupData[1].substr(6, groupData[1].length);
        group.teacher = groupData[2];
        group.schedule = Class.parseSchedule(scheduleNode);

        groups.push(group);
    });

    return groups; 
}

/*
    Parses the schedule for a single group.
    The schedule information is inside the HTML Node given.

    Returns a Schedule object.
*/
SubjectParser.prototype.parseSchedule = function(htmlNode) {
    return Schedule(this.parseScheduleEntries(htmlNode));
}

/*
    Parses the schedule entries of a group from the HTML Node given.

    Returns an array of ScheduleEntry's.
*/
SubjectParser.prototype.parseScheduleEntries = function(htmlNode) {
    var Class = this;
    var entries = [];
    var entryNodes = $(htmlNode).find("tr").not(":first-child");

    entryNodes.each(function(index, entryNode) {
        var entryData = $(entryNode).find("td").append("|").text().split("|");

        var entry = ScheduleEntry();
        entry.day = Class.getDayNumber(entryData[0]);
        entry.startTime = parseInt(entryData[1].substr(0, 2));
        entry.endTime = parseInt(entryData[2].substr(0, 2));
        entry.classroom = entryData[3];

        entries.push(entry);
    });   

    return entries;
}

/*
    Returns the day number corresponding to the day name.
*/
SubjectParser.prototype.getDayNumber = function(day) {
    switch(day) {
        case "Lun": return 0;
        case "Mar": return 1;
        case "Mie": return 2;
        case "Jue": return 3;
        case "Vie": return 4;
        default: return -1;
    } 
}


/*
    Basically, a Plan is all the subjects the user wants to course
    for the semester. Just the subjects, not a specific group.

    A Plan can have many possible "schedules".
    We will refer to these "schedules" as Group Plans to avoid ambiguities
    with the schedule of a specific group.
    A group plan is a possible combination of groups for the selected subjects.

    A Plan object holds the subjects a user has selected as well as 
    all the possible group plans for those subjects.
*/
var Plan = function() {
    var obj = Object.create(Plan.prototype);

    obj.subjects = [];
    obj.groupPlans = [];
    obj.credits = 0;

    // Currently displaying group plan index
    obj.currentGroupPlan = 0;
    // Total of group plans displayed so far
    obj.displayedGroupPlans = 0;

    return obj;
}

/*
    Adds a subject to the plan. Recalculating the possible group plans
*/
Plan.prototype.addSubject = function(subject) {
    this.subjects.push(subject);
    this.credits += subject.credits;

    this.calculateNewGroupPlans(subject);

    // Displays the new subject and the new credit count
    addSubjectToTable(subject);
    $("span.credits").html(this.credits);
}

/*
    Removes a subject from the plan. Recalculating the possible group plans.
*/
Plan.prototype.removeSubject = function(subjectName) {
    for(var i = 0; i < this.subjects.length; i++) {
        if(this.subjects[i].name != subjectName) continue;

        this.credits -= this.subjects[i].credits;
        this.subjects.splice(i, 1);
        this.calculateGroupPlans();

        // Updates the DOM
        removeSubjectFromTable(i);
        $("span.credits").html(this.credits);

        if(this.subjects.length == 0) {
            showStartMessage();
        }

        return;
    }
}

/*
    Checks if the plan already has the subject given.
*/
Plan.prototype.hasSubject = function(subject) {
    for(var i = 0; i < this.subjects.length; i++) {
        if(subject.name == this.subjects[i].name) return true;
    }
    return false;
}

/*
    Calculates the possible group plans after adding the subject given
    to the plan.
*/
Plan.prototype.calculateNewGroupPlans = function(subject) {
    var newGroupPlans = [];

    for(var i = 0; i < subject.groups.length; i++) {
        // If there aren't group plans currently, create a new group plan
        // for each subject's group
        if(this.groupPlans.length == 0) {
            newGroupPlans.push(GroupPlan([subject.groups[i]]));
            continue;
        }

        // If there are group plans already, check every group plan with every subject's group
        // and get only the ones whose schedule does not overlap.
        for (var j = 0; j < this.groupPlans.length; j++) {
            if(this.groupPlans[j].getSchedule().overlaps(subject.groups[i].schedule)) continue;

            var newGroupPlan = this.groupPlans[j].clone();
            newGroupPlan.addGroup(subject.groups[i]);
            newGroupPlans.push(newGroupPlan);
        }
    }

    this.groupPlans = newGroupPlans;
}

/*
    Calculates all the possible group plans for the subjects
    in the plan.
*/
Plan.prototype.calculateGroupPlans = function() {
    this.groupPlans = [];
    for(var i = 0; i <  this.subjects.length; i++) {
        this.calculateNewGroupPlans(this.subjects[i]);
    }
}

/*
    Displays only the first group plan in the set of
    possible group plans.

    For speed performance, we display the group plans to the user "on the fly".
    It means that we don't put all the group plans on the DOM because
    that is too slow. Instead, we display them as the user requests it (by
    clicking the "show next schedule" button).
*/
Plan.prototype.displayFirstGroupPlan = function() {
    $(".slide-control").hide();
    $(".slide-control-mobile").hide();
    $(".plans").empty();

    this.displayedGroupPlans = 0;
    this.currentGroupPlan = 0;

    if(this.subjects.length == 0) return;

    if(this.groupPlans.length == 0) {
        showMessage("No se encontro ningun horario con las materias seleccionadas", "warning");
        return;
    }
    else if(this.groupPlans.length == 1) {
        showMessage("Se encontró <b>1</b> horario", "success"); 
    }
    else {
        showMessage("Se encontraron <b>" + this.groupPlans.length + "</b> posibles horarios", "success"); 
        $(".right-control").show();
    }

    this.groupPlans[0].display();
    this.displayedGroupPlans = 1;

    $(".plans .group-plan:first-child").addClass("current").show();
    $(".group-plan .groups").hide();
}

/*
    Displays the next group plan to the user.
*/
Plan.prototype.displayNextGroupPlan = function() {
    // If the group plan is not in the DOM yet, it is first put in.
    if(++this.currentGroupPlan >= this.displayedGroupPlans) {
        plan.groupPlans[this.currentGroupPlan].display(); 
        this.displayedGroupPlans++;
    }

    showGroupPlan(this, $(".current").next());
}

/*
    Displays the previous group plan to the user.
*/
Plan.prototype.displayPreviousGroupPlan = function() {
    this.currentGroupPlan--;
    showGroupPlan(this, $(".current").prev());
}

/*
    A Group Plan is a combination of groups of the selected subjects
    so that the union of its schedules does not overlaps.

    A Group Plan in this context is like the "schedule" for the semester.
*/
var GroupPlan = function(groups) {
    var obj = Object.create(GroupPlan.prototype);

    obj.groups = groups;

    return obj;
}

/*
    Clones the GroupPlan.
*/
GroupPlan.prototype.clone = function () {
    return GroupPlan(this.groups.slice());
}

/*
    Adds a group to the group plan.
*/
GroupPlan.prototype.addGroup = function(group) {
    this.groups.push(group);
}

/*
    Gets the schedule for this group plan.

    It combines the schedules of every single group in this
    group plan to create a schedule containing all group schedule's entries.

    Returns the Schedule or null if the individual schedules overlap.
*/
GroupPlan.prototype.getSchedule = function() {
    var schedule = Schedule([]);

    for(var i = 0; i < this.groups.length; i++) {
        if(!schedule.combine(this.groups[i].schedule)) return null;
    }

    return schedule;
}

/*
    Displays the group plan to the user.
*/
GroupPlan.prototype.display = function() {
    // Gets the group plan HTML template and appends it
    // to the group plan container
    var groupPlanTemplate = $(".group-plan-div-template").html();
    var plansContainer = $(".plans");
    plansContainer.append(groupPlanTemplate);

    // Gets the just inserted group plan div
    var groupPlanElement = plansContainer.find(".group-plan:last-child");

    var current = plan.currentGroupPlan + 1;
    var total = plan.groupPlans.length;

    groupPlanElement.find(".schedule-tab").html(
        "Horario (" + current + " de " + total + ")"
    );

    // Displays each group's information. (Schedule, teacher's name, etc)
    for(var i = 0; i < this.groups.length; i++) {
        this.groups[i].display(groupPlanElement);
    }
}


/*
    A Subject contains all the information of a subject,
    like the name, the id, and the groups.
*/
var Subject = function() {
    var obj = Object.create(Subject.prototype);

    obj.id = "";
    obj.name = "";
    obj.optional = "";
    obj.credits = 0;
    obj.groups = []; 

    return obj;
}

/*
    Sets the groups for this subject.
*/
Subject.prototype.setGroups = function (groups) {
    this.groups = groups;
    for(var i = 0; i < groups.length; i++) {
        groups[i].subject = this;
    }
}


/*
    A Group belongs to a subject.
    It has a number, or section, like 303, 401, ...
    It has a teacher, and a schedule.
*/
var Group = function() {
    var obj = Object.create(Group.prototype);

    obj.subject = null;
    obj.number = "";
    obj.teacher = "";
    obj.schedule = null;

    return obj;
}

/*
    Displays the group information to the user.

    Adds a row to the groups table inside a group plan view.
    Displays the schedule entries in the schedule table
    inside a group plan view.
*/
Group.prototype.display = function(planDiv) {
    var groupsTable = planDiv.find(".groups table");

    groupsTable.append(
        "<tr>" +
        "<td>" + this.number + "</td>" +
        "<td>" + this.subject.name + "</td>" +
        "<td>" + this.teacher + "</td>" +
        "</tr>"
    );

    var scheduleTable = planDiv.find(".schedule table");
    this.schedule.display(scheduleTable, this);
}

/*
    A Schedule contains a set of ScheduleEntries
    arranged in a bidimensional array in the following way:

    [
        0 => [monday-entry1, monday-entry2, ...]
        1 => [tuesday-entry1, tuesday-entry2, ...]
        .
        .
        .
        4 => [friday-entry1, friday-entry2, ...]
    ]

    Where the first position in the array indicates the
    day of the week or the entry(ies), and each of those
    arrays contains all the ScheduleEntries of that day.

    This makes it easier when combining schedules or 
    checking if schedules overlap.
*/
var Schedule = function(entries) {
    var obj = Object.create(Schedule.prototype);

    obj.entries = [];
    obj.addEntries(entries);
    
    return obj;
}

/*
    Adds a ScheduleEntry to the Schedule.

    It puts the entry in the corresponding position
    in the array according to the entry's day.
*/
Schedule.prototype.addEntry = function(entry) {
    if(!(this.entries[entry.day] instanceof Array)) {
        this.entries[entry.day] = [];
    }

    this.entries[entry.day].push(entry);
}

/*
    Adds an array of ScheduleEntries to the entries array
*/
Schedule.prototype.addEntries = function(entries) {
    for(var i = 0; i < entries.length; i++) {
        this.addEntry(entries[i]);
    }
}

/*
    Combines the other Schedule into this Schedule
    if possible.

    Returns true if the combination was successful,
    false if not.
*/
Schedule.prototype.combine = function(other) {
    if(this.overlaps(other)) return false;

    // Just add the other's entries to this one
    other.entries.forEach(function(entries, day) {
        this.addEntries(entries);
        // entries.forEach(function(entry, index) {
            // this.addEntry(entry);
        // }, this);
    }, this);

    return true;
}

/*
    Checks if the other Schedule overlaps with this.

    Returns true if they overlap, false if not.
*/
Schedule.prototype.overlaps = function(other) {
    var overlaps = false;

    this.entries.forEach(function(entries1, day) {
        entries2 = other.entries[day];

        if(!(entries2 instanceof Array)) return;

        for(var i = 0; i < entries1.length; i++) {
            for(var j = 0; j < entries2.length; j++) {
                var entry1 = entries1[i];
                var entry2 = entries2[j];

                if(entry1.overlaps(entry2)) {
                    overlaps = true;
                    return;
                }
            } 
        }
    });

    return overlaps;
}

/*
    Displays the schedule into the schedule table given.
*/
Schedule.prototype.display = function(table, group) {
    this.entries.forEach(function(entries, day) {
        entries.forEach(function(entry, index) {
            entry.display(table, group);
        })
    }); 
}

/*
    A ScheduleEntry defines a the day, start time, end time
    and classroom of a class's session.
*/
var ScheduleEntry = function() {
    var obj = Object.create(ScheduleEntry.prototype);

    obj.day = 0;
    obj.startTime = 0;
    obj.endTime = 0;
    obj.classroom = "";

    return obj;
}

/*
    Checks if this entry overlaps with other.

    Returns true if they overlap, false if not.
*/
ScheduleEntry.prototype.overlaps = function(other) {
    return this.startTime >= other.startTime &&
            this.startTime < other.endTime ||
            this.endTime <= other.endTime &&
            this.endTime > other.startTime;
}

/*
    Displays this schedule entry into the schedule table given.
*/
ScheduleEntry.prototype.display = function(scheduleTable, group) {
    for(var i = this.startTime; i < this.endTime; i++) {
        var row = i - 5;
        var col = this.day + 2;

        var cell = getTableCell(scheduleTable, row, col);
        cell.addClass("td-subject");
        cell.html(
            "<span class=\"td-subject-name\">" + group.subject.name + "</span>" +
            "<span class=\"td-subject-classroom\">" + this.classroom + "</span>"
        );
    }
}


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
        url: "https://horario-fie.herokuapp.com/php/pageScript.php",
        method: "POST",
        data: { materia: $("#materia").val() },
        dataType: "html",
        crossDomain: true,
    })
    .done(function(html) {
        var subject = SubjectParser(html).parse();

        if(subject == null) {
            showMessage("No existen grupos para la materia seleccionada", "danger");
            return;
        }

        // Creates a new Plan object if it doesn't exist
        if(plan == null) {
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
    if(newElement.prev().length == 0) {
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
