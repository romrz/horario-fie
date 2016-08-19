
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
};

/*
    Checks if this entry overlaps with other.

    Returns true if they overlap, false if not.
*/
ScheduleEntry.prototype.overlaps = function(other) {
    return this.startTime >= other.startTime &&
            this.startTime < other.endTime ||
            this.endTime <= other.endTime &&
            this.endTime > other.startTime;
};

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
};

