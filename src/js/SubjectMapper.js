
/*
    SubjectMapper is the responsible for mapping the json objects obtained
    from the API to the corresponding objects.
*/
var SubjectMapper = function(json) {
    var obj = Object.create(SubjectMapper.prototype);

    obj.json = json;

    return obj;
};

/*
    Maps the subject and all its information

    Returns a Subject if there were no errors or null otherwise
*/
SubjectMapper.prototype.map = function() {
    var subject = Subject();
    subject.id = this.json.id;
    subject.name = this.json.name;
    subject.optional = this.json.optional;
    subject.credits = this.json.credits;
    subject.setGroups(this.parseGroups(this.json.groups));
    return subject;
};

/*
    Maps the groups of the subject and all its information.
    
    Returns an array of Group objects.
*/
SubjectMapper.prototype.parseGroups = function (jsonGroups) {
    var groups = [];

    for(var i = 0; i < jsonGroups.length; i++) {
        var group = Group();
        group.number = jsonGroups[i].id;
        group.teacher = jsonGroups[i].teacher;
        group.schedule = this.parseSchedule(jsonGroups[i].schedule);
        groups.push(group);
    }

    return groups; 
};

/*
    Maps the schedule for a single group.

    Returns a Schedule object.
*/
SubjectMapper.prototype.parseSchedule = function(jsonSchedule) {
    return Schedule(this.parseScheduleEntries(jsonSchedule.entries));
};

/*
    Maps the schedule entries of a group.

    Returns an array of ScheduleEntry's.
*/
SubjectMapper.prototype.parseScheduleEntries = function(jsonEntries) {
    var entries = [];

    for(var i = 0; i < jsonEntries.length; i++) {
        var entry = ScheduleEntry();
        entry.day = jsonEntries[i].day;
        entry.startTime = parseInt(jsonEntries[i].startTime.substr(0, 2));
        entry.endTime = parseInt(jsonEntries[i].endTime.substr(0, 2));
        entry.classroom = jsonEntries[i].classroom;
        entries.push(entry);
    }   

    return entries;
};
