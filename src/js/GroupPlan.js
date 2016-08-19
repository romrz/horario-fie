
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

