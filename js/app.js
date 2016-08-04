
var Plan = function(groups) {
    var obj = Object.create(Plan.prototype);

    obj.groups = groups;

    return obj;
}

Plan.prototype.display = function() {
    var planDiv = $(".plans").append($(".plan-div-blueprint").html()).find(":last-child");

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
    planDiv.find(".groups ul").append("<li>" + this.subject.name + " " + this.number + " " + this.teacher + "</li>");
    this.schedule.display(planDiv.find(".schedule table"), this);
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
        table.find("tr:nth-child(" + (i - 5) + ") td:nth-child(" + (this.day + 2) + ")").html(group.subject.name);
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
        group.number = groupData[1];
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
        var entryData = $(entryNode).find("td").append(" ").text().split(" ");

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
    $(".plans").empty();
    for(var i = 0; i < plans.length; i++) {
        plans[i].display();
    } 
}

function getPossiblePlans(subjects) {
    var plans = [];

    var groupsArray = [];
    for(var i = 0; i < subjects.length; i++) {
        groupsArray.push(subjects[i].groups);
    }

    combinations(groupsArray, function() {
        var groups = Array.prototype.slice.call(arguments);
        if(isPlanPossible(groups)) {
            plans.push(Plan(groups)); 
        }
    });

    return plans;
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

var selectedSubjects = [];

$("#form").submit(function(e) {
    $.ajax({
        url: "pageScript.php",
        method: "POST",
        data: { materia: $("#materia").val() },
        dataType: "html"
    })
    .done(function(html) {
        var subject = SubjectParser(html).parse();

        if(isSubjectSelected(subject)) return; 
         
        selectedSubjects.push(subject);
        $(".selected-subjects ul").append("<li>" + subject.name + "</li>");

        var plans = getPossiblePlans(selectedSubjects);
        displayPlans(plans);
    })
    .fail(function() {
        alert("failure");
    });

    e.preventDefault();
});
