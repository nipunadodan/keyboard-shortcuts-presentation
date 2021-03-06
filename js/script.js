/*var isCtrlHold = false;
var isShiftHold = false;

$(document).keyup(function (e) {
    if (e.which == 17) //17 is the code of Ctrl button
        isCtrlHold = false;
    if (e.which == 16) //16 is the code of Shift button
        isShiftHold = false;
});
$(document).keydown(function (e) {
    if (e.which == 17)
        isCtrlHold = true;
    if (e.which == 16)
        isShiftHold = true;

    ShortcutManager(e);
});*/

$(document).ready(function (event) {

    function displayHtml(slide) {
        $('h1.keys').html(slide.title);
        $('#key1').html((slide.keyCombination[0] == 'return' ? 'enter' : slide.keyCombination[0]));
        $('#key2').html(slide.keyCombination[1] !== '' ? (slide.keyCombination[1] == 'return' ? 'enter' : slide.keyCombination[1]) : '');
        $('#desc').html(slide.description);
        $('#title2').html(slide.title2);
        $('#desc2').html(slide.desc2);
        if( slide.hasOwnProperty("image")) {
            $('#image').html('<img class="img-fluid" src="images/'+slide.image+'">');
            $('#imagealt').html(slide.imagealt);
        }else{
            $('#image').html('');
            $('#imagealt').html('');
        }
    }

    var i = 0;
    function display(slide, data){
        console.log(i);
        if( slide.hasOwnProperty("keyCombination")) {
            var keys = slide.keyCombination[0];
            displayHtml(slide);
            $.each(slide.keyCombination.slice(1), function (key, val) {
                keys += '+' + val
            });
            console.log(keys);

            $(document).unbind('keyup');
            $(document).bind('keyup', 'left', function (evt) {
                evt.preventDefault();
                console.log(data);
                console.log(i);
                if (i > 0 )
                    display(data[--i], data);

                return false;
            });
            $(document).bind('keyup', 'right', function (evt) {
                evt.preventDefault();
                console.log(data);
                console.log(i);
                if (i > 0 )
                    display(data[++i], data);

                return false;
            });

            $(document).bind('keyup', keys, function (evt) {
                evt.preventDefault();
                console.log(keys);
                display(data[++i], data);
                return false;
            });

            /*$(document).bind('keyup', 'right', function (evt) {
                evt.preventDefault();
                display(data[++i], data);
                return false;
            });*/
        }else {
            return false;
        }
    }

    $.getJSON('keys.json').done(function (data) {
        console.log(data);
        display(data[0], data);
        //displayHtml(data[0]);
        /*$(document).bind('keyup', 'left', function (evt) {
            evt.preventDefault();
            console.log(data);
            console.log(i);
            displayHtml(data[--i]);

            return false;
        });*/
    });
});