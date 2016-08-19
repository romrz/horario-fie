
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
};

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
};

