$(".task-item").on("click", function() {
    var thisTask= $(this).attr("id");
    if($("#" + thisTask).hasClass("selected")){
        $("#" + thisTask).removeClass("selected");
        $("#" + thisTask + "> .actions").addClass("hidden");
    } else{
        $(".task-item").removeClass("selected");
        $(".actions").addClass("hidden");
        $("#" + thisTask).addClass("selected");
        $("#" + thisTask + "> .actions").removeClass("hidden");
    }
});