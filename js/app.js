
var Plan = function(groups) {
    var obj = Object.create(Plan.prototype);

    obj.groups = groups;

    return obj;
}

Plan.prototype.clone = function () {
    var plan = Plan(this.groups.slice());

    return plan;
}

Plan.prototype.addGroup = function(group) {
    this.groups.push(group);
}

Plan.prototype.schedule = function() {
    var schedule = Schedule([]);

    for(var i = 0; i < this.groups.length; i++) {
        if(!schedule.combine(this.groups[i].schedule)) {
            return null;
        }
    }

    return schedule;
}

Plan.prototype.display = function() {
    var planDiv = $(".plans").append($(".plan-div-blueprint").html()).find(".plan:last-child");

    planDiv.find(".schedule-tab").html("Horario (" + (currentPlanIndex + 1) + " de " + plans.length + ")");

    for(var i = 0; i < this.groups.length; i++) {
        this.groups[i].display(planDiv);
    }
}

var Subject = function(name) {
    var obj = Object.create(Subject.prototype);

    obj.name = name;
    obj.groups = []; 

    return obj;
}

Subject.prototype.setGroups = function (groups) {
    this.groups = groups;
    for(var i = 0; i < groups.length; i++) {
        groups[i].subject = this;
    }
}

var Group = function() {
    var obj = Object.create(Group.prototype);

    obj.subject = null;
    obj.number = "";
    obj.teacher = "";
    obj.schedule = null;

    return obj;
}

Group.prototype.display = function(planDiv) {
    console.time("Groups table");
    var groupsTable = planDiv.find(".groups table");
    console.timeEnd("Groups table");
    groupsTable.append(
        "<tr><td>" + this.number + "</td><td>" + this.subject.name + "</td><td>" + this.teacher + "</td></tr>"
    );

    // planDiv.find(".groups table").append(
    //     "<tr><td>" + this.number + "</td><td>" + this.subject.name + "</td><td>" + this.teacher + "</td></tr>"
    // );
    // console.time("Schedule display");
    this.schedule.display(planDiv.find(".schedule table"), this);
    // console.timeEnd("Schedule display");
}

var Schedule = function(entries) {
    var obj = Object.create(Schedule.prototype);

    obj.entries = [];

    for(var i = 0; i < entries.length; i++) {
        if(!(obj.entries[entries[i].day] instanceof Array)) {
            obj.entries[entries[i].day] = [entries[i]];
        }
        else {
            obj.entries[entries[i].day].push(entries[i]);
        }
    }

    return obj;
}

Schedule.prototype.display = function(table, group) {
    this.entries.forEach(function(entries, day) {
        for(var i = 0; i < entries.length; i++) {
            entries[i].display(table, group);
        }
    }, this); 
}

Schedule.prototype.combine = function (other) {
    if(this.overlaps(other)) return false;

    other.entries.forEach(function(entries, day) {
        for(var i = 0; i < entries.length; i++) {
            if(!(this.entries[day] instanceof Array)) {
                this.entries[day] = [];
            }

            this.entries[day].push(entries[i]);
        } 
    }, this);

    return true;
}

Schedule.prototype.overlaps = function (other) {
    var overlap = false;

    this.entries.forEach(function(entries1, day) {
        entries2 = other.entries[day];

        if(!(entries2 instanceof Array)) return;

        for(var i = 0; i < entries1.length; i++) {
            for(var j = 0; j < entries2.length; j++) {
                var entry1 = entries1[i];
                var entry2 = entries2[j];

                if(entry1.startTime >= entry2.startTime && entry1.startTime < entry2.endTime ||
                    entry1.endTime <= entry2.endTime && entry1.endTime > entry2.startTime) {
                    overlap = true;
                    return;
                }
            } 
        }
    });

    return overlap;
}


var ScheduleEntry = function() {
    var obj = Object.create(ScheduleEntry.prototype);

    obj.day = 0;
    obj.startTime = 0;
    obj.endTime = 0;
    obj.classroom = "";

    return obj;
}

ScheduleEntry.prototype.display = function(table, group) {
    for(var i = this.startTime; i < this.endTime; i++) {
        table.find("tr:nth-child(" + (i - 5) + ") td:nth-child(" + (this.day + 2) + ")").addClass("td-subject")
        .html("<span class=\"td-subject-name\">" + group.subject.name + "</span>" + "<span class=\"td-subject-classroom\">" + this.classroom + "</span>");// + " (" + group.number + ") " + this.classroom);
    }
}

function getDayNumber(day) {
    switch(day) {
        case "Lun":
            return 0;
        case "Mar":
            return 1;
        case "Mie":
            return 2;
        case "Jue":
            return 3;
        case "Vie":
            return 4;
    } 
}

var SubjectParser = function(html) {
    var obj = Object.create(SubjectParser.prototype);

    obj.html = html;

    return obj;
}

SubjectParser.prototype.parse = function() {
    var node = $("<div></div>").html(this.html).find(".interesante");

    if(node.children().length == 0) return null;

    var subjectName = node.find("td").html().split("<br>")[0];

    var subject = Subject(subjectName);
    subject.setGroups(this.parseGroups(node));

    return subject;
}

SubjectParser.prototype.parseGroups = function (htmlNode) {
    var groups = [];

    var Class = this;

    var groupNodes = htmlNode.find("table").parent().parent();
    groupNodes.each(function(index, groupNode) {
        var node = $(groupNode);

        var groupData = node.find("td:first-child").html().split("<br>");

        var group = Group();
        group.number = groupData[1].substr(6, groupData[1].length);
        group.teacher = groupData[2];
        group.schedule = Class.parseSchedule(node.find("table"));

        groups.push(group);
    });

    return groups; 
}

SubjectParser.prototype.parseSchedule = function(htmlNode) {
    return Schedule(this.parseScheduleEntries(htmlNode));
}

SubjectParser.prototype.parseScheduleEntries = function(htmlNode) {
    var entries = [];

    var entryNodes = $(htmlNode).find("tr").not(":first-child");
    entryNodes.each(function(index, entryNode) {
        var entryData = $(entryNode).find("td").append("|").text().split("|");

        var entry = ScheduleEntry();
        entry.day = getDayNumber(entryData[0]);
        entry.startTime = parseInt(entryData[1].substr(0, 2));
        entry.endTime = parseInt(entryData[2].substr(0, 2));
        entry.classroom = entryData[3];

        entries.push(entry);
    });   

    return entries;
}

function displayPlans(plans) {
    if(plans.length == 0) {
        return;
    }

    plans[0].display();

    $(".plans .plan:first-child").addClass("current").show();
    $(".slide-control").hide();
    if(plans.length > 1) {
        $(".right-control").show();
    }
}

function getNewPossiblePlans(oldPlans, subject) {
    var possiblePlans = [];

    if(oldPlans.length == 0) {
        for(var i = 0; i < subject.groups.length; i++) {
            possiblePlans.push(Plan([subject.groups[i]]));
        }
        return possiblePlans;
    }

    for(var i = 0; i < oldPlans.length; i++) {
        for(var j = 0; j < subject.groups.length; j++) {
            if(!oldPlans[i].schedule().overlaps(subject.groups[j].schedule)) {
                var newPlan = oldPlans[i].clone();
                newPlan.addGroup(subject.groups[j]);
                possiblePlans.push(newPlan);
            }
        }
    }

    return possiblePlans;
}

function getAllPossiblePlans() {
    var possiblePlans = [];

    for(var i = 0; i < selectedSubjects.length; i++) {
        possiblePlans = getNewPossiblePlans(possiblePlans, selectedSubjects[i]);
    }

    return possiblePlans;
}

function isPlanPossible(groups) {
    var schedule = Schedule([]);

    for(var i = 0; i < groups.length; i++) {
        if(!schedule.combine(groups[i].schedule))
            return false;
    }

    return true;
}

function isSubjectSelected(subject) {
    for(var i = 0; i < selectedSubjects.length; i++) {
        if(subject.name == selectedSubjects[i].name) return true;
    }
}

function combinations(sets,f,context){
    if (!context) context=this;
    var p=[],max=sets.length-1,lens=[];
    for (var i=sets.length;i--;) lens[i]=sets[i].length;
    function dive(d){
        var a=sets[d], len=lens[d];
        if (d==max) for (var i=0;i<len;++i) p[d]=a[i], f.apply(context,p);
        else        for (var i=0;i<len;++i) p[d]=a[i], dive(d+1);
        p.pop();
    }
    dive(0);
}

function showPlans() {
    $(".plans").empty();
    hideMessage();
    $(".slide-control").hide();
    $(".slide-control-mobile").hide();

    containerPlansLength = 0;
    currentPlanIndex = 0;

    if(selectedSubjects.length == 0) return;

    displayPlans(plans);
    $(".plan .groups").hide();

    if(plans.length == 0) {
        showMessage("No se encontro ningun horario con las materias seleccionadas", "warning");
    }
    else if(plans.length == 1) {
        showMessage("Se encontró <b>1</b> horario", "success") 
    }
    else {
        showMessage("Se encontraron <b>" + plans.length + "</b> posibles horarios", "success") 
    }

    containerPlansLength = 1;
}

var timer = null;

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

function hideMessage(withEffect) {
    $("#message")
    .removeClass("alert-success")
    .removeClass("alert-warning")
    .removeClass("alert-danger")
    .removeClass("alert-info");

    if(withEffect) {
        $("#message").fadeOut("fast");
    }
    else {
        $("#message").hide();
    }
}

function removeSubject(subject) {
    for(var i = 0; i < selectedSubjects.length; i++) {
        if(selectedSubjects[i].name == subject) {
            selectedSubjects.splice(i, 1);

            $(".selected-subjects table tr:nth-child(" + (i + 2) + ")").remove();

            if(selectedSubjects.length == 0) {
                $(".selected-subjects").hide();
                $(".start-message").show();
            }

           return true;
        }
    }

    return false;
}

var selectedSubjects = [];
var plans = [];

$(".btn-subject").click(function(e) {

    $("#materia").attr("disabled", "disabled");
    $(".btn-subject").attr("disabled", "disabled"); 
    hideMessage();
    $(".start-message").hide();
    $(".info-container").hide();
    $(".loader").show();
    $(".slide-control").hide();
    $(".slide-control-mobile").hide();

    console.log("Waiting for response");

    $.ajax({
        url: "https://horario-fie.herokuapp.com/pageScript.php",
        method: "POST",
        data: { materia: $("#materia").val() },
        dataType: "html",
        crossDomain: true,
    })
    .done(function(html) {
        console.log("Response arrived");

        var subject = SubjectParser(html).parse();

        console.log("Subject parsed");

        if(subject == null) {
            showMessage("No existen grupos para la materia seleccionada", "danger");
            return;
        }
        if(!isSubjectSelected(subject)) { 
         
            selectedSubjects.push(subject);
            $(".selected-subjects").show();
            $(".selected-subjects table").append("<tr><td>" + subject.name + "</td><td><button class=\"btn btn-danger remove-subject-btn\" data-subject=\"" + subject.name + "\">&times;</button></td></tr>");

            plans = getNewPossiblePlans(plans, selectedSubjects[selectedSubjects.length - 1]);

        }

        showPlans();
    })
    .fail(function() {
        showMessage("Error al conectar con el servidor. Por favor inténtalo de nuevo", "danger");
    })
    .always(function() {
        $("#materia").removeAttr("disabled");
        $(".btn-subject").removeAttr("disabled"); 
        $(".loader").hide();
        $(".info-container").show();
    });

    e.preventDefault();
});

function showTab(tabName) {
    if(tabName == "schedule") {
        $(".current .tab-selected").removeClass("tab-selected");
        $(".current .schedule-tab").addClass("tab-selected");
        $(".current .schedule").show();
        $(".current .groups").hide();
    }
    else if(tabName == "groups") {
        $(".current .tab-selected").removeClass("tab-selected");
        $(".current .groups-tab").addClass("tab-selected");
        $(".current .groups").show();
        $(".current .schedule").hide();
    }
}


function displayNextPlan(index, tabToSelect) {
    if(index >= containerPlansLength) {
        plans[index].display(); 
        containerPlansLength++;
    }

    var current = $(".plans .plan:nth-of-type(" + (index+1) + ")");
    current.addClass("current");
    showTab(tabToSelect);
    current.show();
}

var currentPlanIndex = 0;
var containerPlansLength = 0;


$(document).ready(function() {
    $("body").on("click", ".tab", function (event) {
        if($(event.target).hasClass("tab-selected")) return;

        if($(event.target).hasClass("schedule-tab")) {
            showTab("schedule");
        }
        else if($(event.target).hasClass("groups-tab")) {
            showTab("groups")
        }

    });

    $("body").on("click", ".btn-slide-control", function (event) {
        var button = $(event.target).parent();

        var tabSelected = $(".current .tab-selected");
        var tabToSelect = "";

        if(tabSelected.hasClass("schedule-tab")) {
            tabToSelect = "schedule";
        }
        else if(tabSelected.hasClass("groups-tab")) {
            tabToSelect = "groups";
        }

        if(button.hasClass("left-control")) {
            currentPlanIndex--;

            var current = $(".current");
            var next = current.prev();

            current.removeClass("current");
            current.hide();

            next.addClass("current");
            showTab(tabToSelect);
            next.show();

            $(".right-control").show();
            // $(".right-control").addClass("show");
            if(next.prev().length == 0) {
                $(".left-control").hide();
                // button.hide();
                // button.addClass("hide");
            }
        }
        else if(button.hasClass("right-control")) {
            currentPlanIndex++;

            var current = $(".current");

            current.removeClass("current");
            current.hide();

            displayNextPlan(currentPlanIndex, tabToSelect);

            $(".left-control").show();
            // $(".left-control").addClass("show");
            if((currentPlanIndex + 1) >= plans.length) {
                $(".right-control").hide();
                // button.hide();
                // button.addClass("hide");
            }
        }
    }); 

    $("body").on("click", ".remove-subject-btn", function(event) {
        var subject = $(event.target).data("subject");
        if(removeSubject(subject)) {
            plans = getAllPossiblePlans();
            showPlans();
        }
    });

    $(".message .close-btn").click(function(event) {
        hideMessage(true); 
    });

    $("#main-button").click(function() {
        $(".index-page-container").hide();
        $(".app-container").css("display", "flex"); 
    });
});