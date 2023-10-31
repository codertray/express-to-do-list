import express from "express";
import bodyParser from "body-parser";

const app= express();
const port= 3000;
var tasksToday= [];
var tasksTmrw= [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.redirect("/today");
});

app.get("/today", (req, res) => {
    res.render("today.ejs",  {title: "Today", tasks: tasksToday,});
});

app.get("/tomorrow", (rep, res) => {
    res.render("tomorrow.ejs", {title: "Tomorrow", tasks: tasksTmrw,});
});

app.post("/today/add", (req, res) => {
    tasksToday.push(req.body["newTask"]);
    res.redirect("/today");
});

app.post("/tomorrow/add", (req, res) => {
    tasksTmrw.push(req.body["newTask"]);
    res.redirect("/tomorrow");
});

app.post("/postpone", (req, res) => {
    tasksTmrw.push(tasksToday[req.body["taskId"]]);
    tasksToday.splice(req.body["taskId"], 1);
    res.redirect("/today");
});

app.post("/advance", (req, res) => {
    tasksToday.push(tasksTmrw[req.body["taskId"]]);
    tasksTmrw.splice(req.body["taskId"], 1);
    res.redirect("/tomorrow");
});

app.post("/today/delete", (req, res) => {
    tasksToday.splice(req.body["taskId"], 1);
    console.log(req.body["taskId"]);
    res.redirect("/today")
})

app.post("/tomorrow/delete", (req, res) => {
    tasksTmrw.splice(req.body["taskId"], 1);
    res.redirect("/tomorrow")
});

app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})