$(document).ready(function(){
    $('img').on('click',function(){
        $('legend').text($(this).attr("data-info"));
        if($(this).hasClass('rsa')){
            $('.key').each(function () {
                $(this).show();
            })
        }else if($(this).hasClass('aes')){
            $('.key').each(function () {
                $(this).hide();
            })
        }else{
            $('.key1').show();
            $('.key2').hide()
        }
    })
});