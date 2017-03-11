(function () {
   'use strict';

    $(document).on('ready', function () {
        // $.ajax({
        //     url:"/todo",
        //     async:true
        // }).done( function(data) {
        //     $('p').html(data);
        // });

        $('.deletedTasks').on('click', function () {
            var button_idTask = $(this).attr("data-id-tasks");
            $(this).parent().remove();

            $.ajax({
                url: "/remove?remove=" + button_idTask +"",
                async:true
            }).done( function (data) {

            })
        });
        var flag = 0;
        $('.readTask').on('click', function () {
             var redactElem = $(this).parent().children("span"),
                 inputAddedText = $(this).parent().children("input"),
                 button_idTask = $(this).attr("data-id-tasks");
            if(flag === 1) {
                flag = 0;
                inputAddedText.hide();
                $(this).children('.saveInput').hide();
                $(this).children('.openInput').show();
                if(inputAddedText.val() !== "") {
                    redactElem.text(inputAddedText.val());
                    $.ajax({
                        url: "refact?refact=" + inputAddedText.val() + "&thisId=" + button_idTask +"",
                        async: true
                    }).done( function (data) {

                    });
                } else {
                    return false;
                }
            } else if(flag === 0) {
                flag = 1;
                inputAddedText.show();
                $(this).children('.saveInput').show();
                $(this).children('.openInput').hide();
            }
        });

        $('.addedTascs').on('click', function (event) {
            var textVals = $('.someTextTascs').val();
            $('.someTextTascs').val('');

           // $('.todoList').append("<li>" + textVals + "</li>");
            $.ajax({
                url:"/added?added="+ textVals +"",
                async:true
            }).done( function(data) {
                $('.todoList').append('<li>' + data + '<span class="newTascs">' + ' Это новая задача !' + '</span>' + '</li>');
            });
        });
        $("form").submit( function(event){
            event.preventDefault();
        });

        $('.filterInput').keyup( function () {
            var inputValFilter = $(this).val();

            $.ajax({
                url:"/todoFilter?filter="+ inputValFilter +"",
                async:true
            }).done( function(data) {
                $('.todoList').html(data);
                // console.log(data);
                // $('.test').html(data);
            });
        });
        // $('.textAdd').on('keydown', function () {
        //     socket.emit('chat message change', true, nameUserCookie);
        // });
    });
})();