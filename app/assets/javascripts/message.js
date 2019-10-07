$(function(){
  function buildHTML(message){
    var html = `<div class="upper-message__user-name">
                  ${name}
                </div>
                <div class="upper-message__date">
                  ${date}
                </div>
                <p class="lower-message__content">
                  ${text}
                </p>
                <div class="lower-message">
                  ${image}
                </div>`
      return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $('.form__submit').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      var target = $('.message').last();
      var position = target.offset().top
      $('.messages').animate({scrollTop:position}, 500 , 'swing');
      $('.form__submit')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })
});