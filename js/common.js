$(function() {


/* Слайдер

$('').owlCarousel({
    loop:true,
    nav:true,
	items: 1,
	navText: ['','']
})

*/


$('.scroll').click( function(){
  var scroll_el = $(this).attr('href');
  if ($(scroll_el).length != 0) {
    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
   }
  return false;
})


// Добавление товара в форму

$('.item-btn').on('click',function(e){
	$target = $(this).data('product');
	$price = $(this).data('pprice');
	$info = $target + " | " + $price +' руб.';
	$('.product_title').val($info); 
  $('#p_name').text($target); 
})



/** START  Форма валидации*/

$("form").on("submit", function(e) {   
     var _name = false;
     var _email = false; 
     var _phone = false; 
      
  if ($(this).find("input[name=name]").length>0) { 
      var er_msg = 'Укажите корректные ФИО.' 
        $("input[name=name]", this).val($.trim($("input[name=name]", this).val()));
        if (!$("input[name=name]", this).val()) {
          alert(er_msg);
          return false;
        }else{
          _name = true;
        }
    }else{
      _name = true;
    }


  if ($(this).find("input[name=email]").length>0) {
         var emailRegex = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$'; 
       var er_msg = 'Укажите корректный Email.';
       var email_val = $.trim($("input[name=email]", this).val()); 
       if (!email_val || !validateEmail(email_val)) {
           alert(er_msg);
           return false;
       }else{
        _email = true;
       }
    }else{
      _email = true
    }

    

  if ($(this).find("input[name=phone]").length>0) {
        /* Проверка телефона*/
         var phone_val = $("input[name=phone]", this).val(); 
         var reg1 = new RegExp("[^0-9]*", "g"),
             reg2 = new RegExp("[^0-9-+ ()]", "g");
         var phone_txt = phone_val.replace(reg1, "");
         if (phone_val.search(reg2) != -1 || !phone_txt || phone_txt.length < 7) {
             var er_msg = 'Номер телефона может содержать только цифры, символы "+", "-", "(", ")" и пробелы.';
             var er_msg_2 ='В вашем телефоне слишком мало цифр.'

             alert(er_msg);
             alert(er_msg_2);
             return false;
         } else{
          _phone = true;
         }
    }else{
      _phone = true
    }

    if(_phone && _email){
      return true;
    }
    return false;
      
  
});  

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/** валидация конец*/


// Дата

    var today = new Date();
    var dd = today.getDate()+2;
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    var saleDate = new Date();
    var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    saleDate.setDate(saleDate.getDate() + 2) ;
    $day = saleDate.getDate();
    $month = month[saleDate.getMonth()];
    $('.sale__date').text(saleDate.getDate());
    $('.sale__month').text(month[saleDate.getMonth()]);
    $('.sale_dateMonth').text('' + $day + ' ' + $month);

    today = dd + '/' + mm + '/' + yyyy;
    $('#clock').text(today);


// Определение устройства


var md = new MobileDetect(window.navigator.userAgent);
var ustr = 'Компьютер'
if(md.phone()){
  ustr = 'Мобильный телефон '+md.mobile()
}else if(md.tablet()){
  ustr = 'Планшет '+md.mobile()
}
$("input[name='ustr']").val(ustr)


});
