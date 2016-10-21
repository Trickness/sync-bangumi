
var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();
rule.minute = 25;
//var j = schedule.scheduleJob(rule, function(){
//    console.log("执行任务");
//});

var oneSecond = 1000 * 5; // one second = 1000 x 1 ms
setTimeout(function() {
    console.log('<p>Hello there.</p>');
}, oneSecond);