
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
};

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
};

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

        if(this.subjects.length === 0) {
            showStartMessage();
        }

        return;
    }
};

/*
    Checks if the plan already has the subject given.
*/
Plan.prototype.hasSubject = function(subject) {
    for(var i = 0; i < this.subjects.length; i++) {
        if(subject.name == this.subjects[i].name) return true;
    }
    return false;
};

/*
    Calculates the possible group plans after adding the subject given
    to the plan.
*/
Plan.prototype.calculateNewGroupPlans = function(subject) {
    var newGroupPlans = [];

    for(var i = 0; i < subject.groups.length; i++) {
        // If there aren't group plans currently, create a new group plan
        // for each subject's group
        if(this.groupPlans.length === 0) {
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
};

/*
    Calculates all the possible group plans for the subjects
    in the plan.
*/
Plan.prototype.calculateGroupPlans = function() {
    this.groupPlans = [];
    for(var i = 0; i <  this.subjects.length; i++) {
        this.calculateNewGroupPlans(this.subjects[i]);
    }
};

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

    if(this.subjects.length === 0) return;

    if(this.groupPlans.length === 0) {
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
};

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
};

/*
    Displays the previous group plan to the user.
*/
Plan.prototype.displayPreviousGroupPlan = function() {
    this.currentGroupPlan--;
    showGroupPlan(this, $(".current").prev());
};

