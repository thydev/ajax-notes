$(document).ready(function(){
    console.log("ready...");

    // jQuery .ajax method
    // $.ajax({
    //     url: /* Where should this go? */,
    //     method: /* Which HTTP verb? */,
    //     data: /* Any data to send along? */,
    //     success: /* What code should we run when the server responds? */
    //    )};


    // Posting data
    $('#addnote').submit(function(e){
        e.preventDefault()
        console.log('Sending Ajax request to', $(this).attr('action'))
        console.log('Submitting the following data', $(this).serialize())
        $.ajax({
            url: $(this).attr('action'), /* Where should this go? */
            method: 'post', /* Which HTTP verb? */
            data: $(this).serialize(), /* Any data to send along? */
            success: function(res) { /* What code should we run when the server responds? */
                //$('#placeholder3').html(serverResponse)
                console.log(res);
                if(res["status"] == "Ok"){
                    $('.success').text("Added successfully!");
                    $('.error').text("");
                    $('#title').val("");

                    var noteStr = `<div class="note" id = "div-note-${res.note.id}" >
                        <div class="title">
                            <h2>${res.note.title}</h2>
                            <form action="/activity/delete/${res.note.id}" method="post">
                                <button type="submit" class="delete"  id="${res.note.id}">Delete</button>
                            </form>
                        </div>
                        <form action="/activity/update/${res.note.id}" method="post">
                            <textarea name="description" id="description" cols="30" rows="10"></textarea>

                            <div class="action">
                                <button type="submit" class="update">Update</button>
                                <button type="button" class="cancel">Cancel</button>
                            </div>
                        </form>
                    </div>`
                    $('.display-note').prepend(noteStr);
                    console.log(noteStr);
                } else {
                    $('.success').text("");
                    $('.error').text(res["error"])
                }
            }
        });
      });
    
      //Getting data
    $('#button_json').click(function(){
        $.ajax({
            url: '/user_login/all.json', /* Where should this go? */
            success: function(serverResponse) {  /* What code should we run when the server responds? */
                console.log("Received this from server:", serverResponse)
                console.log("Now, I can use the serverResponse to manipulate the DOM")
                $('#placeholder1').html(JSON.stringify(serverResponse))
            }
        });
    });

    // $(".update").click(function(e){
    //     e.preventDefault();

    //     console.log(e);
    //     console.log(e.currentTarget.form.action);
    //     console.log($(e.currentTarget.form).serialize());
    //     // console.log(e.currentTarget.form.childNotes[3].value);
    //     // console.log(e.currentTarget.form.childNodes[3].value);

    //     $.ajax({
    //         url: e.currentTarget.form.action, /* Where should this go? */
    //         method: 'post', /* Which HTTP verb? */
    //         data: $(e.currentTarget.form).serialize(), /* Any data to send along? */
    //         success: function(res) { /* What code should we run when the server responds? */
    //             //$('#placeholder3').html(serverResponse)
    //             console.log(res);
    //             if(res["status"] == "Ok"){
    //                 $('.success').text(res["note"][0]["title"] + " " + res["message"]);
    //                 $('.error').text("");
    //             } else {
    //                 $('.success').text("");
    //                 $('.error').text(res["error"])
    //             }
    //         }
    //     });
    // });

    // $(".delete").click(function(e){
    //     e.preventDefault();

    //     console.log(e);
    //     console.log(e.currentTarget.form.action);
    //     console.log($(e.currentTarget.form).serialize());
    //     // console.log(e.currentTarget.form.childNotes[3].value);
    //     // console.log(e.currentTarget.form.childNodes[3].value);

    //     $.ajax({
    //         url: e.currentTarget.form.action, /* Where should this go? */
    //         method: 'post', /* Which HTTP verb? */
    //         data: $(e.currentTarget.form).serialize(), /* Any data to send along? */
    //         success: function(res) { /* What code should we run when the server responds? */
    //             //$('#placeholder3').html(serverResponse)
    //             console.log(res);
    //             if(res["status"] == "Ok"){
    //                 $('.success').text(res["note"][0]["title"] + " " + res["message"]);
    //                 $('.error').text("");
    //                 $('#div-note-' + e.currentTarget.id).remove();

    //             } else {
    //                 $('.success').text("");
    //                 $('.error').text(res["error"])
    //             }
    //         }
    //     });
    // });

    $('.display-note').on('click', '.update', function(e){
        e.preventDefault();

        console.log(e);
        console.log(e.currentTarget.form.action);
        console.log($(e.currentTarget.form).serialize());
        // console.log(e.currentTarget.form.childNotes[3].value);
        // console.log(e.currentTarget.form.childNodes[3].value);

        $.ajax({
            url: e.currentTarget.form.action, /* Where should this go? */
            method: 'post', /* Which HTTP verb? */
            data: $(e.currentTarget.form).serialize(), /* Any data to send along? */
            success: function(res) { /* What code should we run when the server responds? */
                //$('#placeholder3').html(serverResponse)
                console.log(res);
                if(res["status"] == "Ok"){
                    $('.success').text(res["note"][0]["title"] + " " + res["message"]);
                    $('.error').text("");
                } else {
                    $('.success').text("");
                    $('.error').text(res["error"])
                }
            }
        });
    });

    $('.display-note').on('click', '.delete', function(e){
        e.preventDefault();

        console.log(e);
        console.log(e.currentTarget.form.action);
        console.log($(e.currentTarget.form).serialize());
        // console.log(e.currentTarget.form.childNotes[3].value);
        // console.log(e.currentTarget.form.childNodes[3].value);

        $.ajax({
            url: e.currentTarget.form.action, /* Where should this go? */
            method: 'post', /* Which HTTP verb? */
            data: $(e.currentTarget.form).serialize(), /* Any data to send along? */
            success: function(res) { /* What code should we run when the server responds? */
                //$('#placeholder3').html(serverResponse)
                console.log(res);
                if(res["status"] == "Ok"){
                    $('.success').text(res["note"][0]["title"] + " " + res["message"]);
                    $('.error').text("");
                    $('#div-note-' + e.currentTarget.id).remove();

                } else {
                    $('.success').text("");
                    $('.error').text(res["error"])
                }
            }
        });
    });


});