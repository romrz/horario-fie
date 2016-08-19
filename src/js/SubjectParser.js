
/*
    SubjectParser is the responsible for obtaining the relevant subject
    information from the raw HTML retrieved by the request to:
    https://escolar.fie.umich.mx/actual/estudiante/materia-sig.php
*/
var SubjectParser = function(html) {
    var obj = Object.create(SubjectParser.prototype);

    obj.html = html;

    return obj;
};

/*
    Parses the subject and all its information from the raw HTML

    Returns a Subject if there were no errors or null otherwise
*/
SubjectParser.prototype.parse = function() {
    var htmlNode = $("<div></div>").html(this.html);
    var basicInfoNode = htmlNode.find("table").not(".menu").first().find("tr").last();
    var groupsInfoNode = htmlNode.find(".interesante");

    if(groupsInfoNode.children().length === 0) return null;

    var subject = Subject();
    subject.id = basicInfoNode.find("td:nth-child(1)").html();
    subject.name = basicInfoNode.find("td:nth-child(2)").html();
    subject.optional = basicInfoNode.find("td:nth-child(3)").html() == "S" ? "Si" : "No";
    subject.credits = parseInt(basicInfoNode.find("td:nth-child(4)").html());
    subject.setGroups(this.parseGroups(groupsInfoNode));

    return subject;
};

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
};

/*
    Parses the schedule for a single group.
    The schedule information is inside the HTML Node given.

    Returns a Schedule object.
*/
SubjectParser.prototype.parseSchedule = function(htmlNode) {
    return Schedule(this.parseScheduleEntries(htmlNode));
};

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
};

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
};

