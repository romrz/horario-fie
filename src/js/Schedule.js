
/*
    A Schedule contains a set of ScheduleEntries
    arranged in a bidimensional array in the following way:

    [
        0 => [monday-entry1, monday-entry2, ...]
        1 => [tuesday-entry1, tuesday-entry2, ...]
        .
        .
        .
        4 => [friday-entry1, friday-entry2, ...]
    ]

    Where the first position in the array indicates the
    day of the week or the entry(ies), and each of those
    arrays contains all the ScheduleEntries of that day.

    This makes it easier when combining schedules or 
    checking if schedules overlap.
*/
var Schedule = function(entries) {
    var obj = Object.create(Schedule.prototype);

    obj.entries = [];
    obj.addEntries(entries);
    
    return obj;
};

/*
    Adds a ScheduleEntry to the Schedule.

    It puts the entry in the corresponding position
    in the array according to the entry's day.
*/
Schedule.prototype.addEntry = function(entry) {
    if(!(this.entries[entry.day] instanceof Array)) {
        this.entries[entry.day] = [];
    }

    this.entries[entry.day].push(entry);
};

/*
    Adds an array of ScheduleEntries to the entries array
*/
Schedule.prototype.addEntries = function(entries) {
    for(var i = 0; i < entries.length; i++) {
        this.addEntry(entries[i]);
    }
};

/*
    Combines the other Schedule into this Schedule
    if possible.

    Returns true if the combination was successful,
    false if not.
*/
Schedule.prototype.combine = function(other) {
    if(this.overlaps(other)) return false;

    // Just add the other's entries to this one
    other.entries.forEach(function(entries, day) {
        this.addEntries(entries);
        // entries.forEach(function(entry, index) {
            // this.addEntry(entry);
        // }, this);
    }, this);

    return true;
};

/*
    Checks if the other Schedule overlaps with this.

    Returns true if they overlap, false if not.
*/
Schedule.prototype.overlaps = function(other) {
    var overlaps = false;

    this.entries.forEach(function(entries1, day) {
        entries2 = other.entries[day];

        if(!(entries2 instanceof Array)) return;

        for(var i = 0; i < entries1.length; i++) {
            for(var j = 0; j < entries2.length; j++) {
                var entry1 = entries1[i];
                var entry2 = entries2[j];

                if(entry1.overlaps(entry2)) {
                    overlaps = true;
                    return;
                }
            } 
        }
    });

    return overlaps;
};

/*
    Displays the schedule into the schedule table given.
*/
Schedule.prototype.display = function(table, group) {
    this.entries.forEach(function(entries, day) {
        entries.forEach(function(entry, index) {
            entry.display(table, group);
        });
    }); 
};
