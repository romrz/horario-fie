
/*
    A Group Plan is a combination of groups of the selected subjects
    so that the union of its schedules does not overlaps.

    A Group Plan in this context is like the "schedule" for the semester.
*/
var GroupPlan = function(groups) {
    var obj = Object.create(GroupPlan.prototype);

    obj.groups = groups;

    return obj;
};

/*
    Clones the GroupPlan.
*/
GroupPlan.prototype.clone = function () {
    return GroupPlan(this.groups.slice());
};

/*
    Adds a group to the group plan.
*/
GroupPlan.prototype.addGroup = function(group) {
    this.groups.push(group);
};

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

GroupPlan.prototype.getScheduleTable = function() {
    var table = [];

    for(var r = 0; r < 13; r++)  {
        var row = [];
        for(var c = 0; c < 5; c++) {
            row.push(null);
        }
        table.push(row);
    }

    // console.log(this);

    for(var g = 0; g < this.groups.length; g++) {
        var group = this.groups[g];

        console.log(group);

        var entries = group.schedule.entries;
        console.log(entries);
        // entries.forEach(function(entry, day) {
        entries.forEach(function(sentries, day) {
            sentries.forEach(function(entry, index) {
                // entry.display(table, group);
            // for(var i = 0; i < entries.length; i++) {
                // var entry = entries[i];
                console.log(entry);
                console.log(entry.startTime);
                console.log(entry.endTime);
                console.log(entry.startTime < entry.endTime);
                for(var h = entry.startTime; h < entry.endTime; h++) {
                    var e = { subject: group.subject.name, classroom: entry.classroom };
                    console.log(e);
                    table[h - 7][entry.day] = e;
                }
            });
        }); 
    }

    console.log(table);

    return table;
};

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
};

