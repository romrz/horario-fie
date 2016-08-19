
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
};

/*
    Sets the groups for this subject.
*/
Subject.prototype.setGroups = function (groups) {
    this.groups = groups;
    for(var i = 0; i < groups.length; i++) {
        groups[i].subject = this;
    }
};

