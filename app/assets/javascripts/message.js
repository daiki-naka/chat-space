$(function(){
  function buildHTML(message){
    var html = `<div class="upper-message__user-name">
                  ${message.name}
                </div>
                <div class="upper-message__date">
                  ${message.date}
                </div>
                <p class="lower-message__content">
                  ${message.text}
                </p>
                <div class="lower-message">
                  ${message.image}
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
      $('#new_message').val('');
      var target = $('.message').last();
      $('.message').animate({scrollTop:target.offset().top}, 500, 'swing');
      $('.form__submit')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })
});