$(function(){
  
    function buildHTML(data){
      var img = `${data.image !== null ? img = `<img class="lower-message__image" src="${data.image}">` : img = "" }`
      var content = `${data.text !== null ? content = `<p class="lower-message__text">${data.text}</p>` : content = ""}`
      var html = `<div class="message" data-message-id = "${data.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${data.name}
                      </div>
                      <div class="upper-message__date">
                      ${data.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      ${content}
                      ${img}
                    </div>
                </div>`
      return html;
  }
  $('#new-message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new-message')[0].reset();
      $(".form__submit").prop("disabled", false);
    })
    .fail(function(){
      alert('error');
    });
    });

    var reloadMessages = function() {
      last_message_id = $('.message:last').data('message-id');
      
      if (window.location.href.match(/\/groups\/\d+\/messages/)){

      $.ajax ({
        url:"api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        messages.forEach(function(message){
          var html = buildHTML(message);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      
      .fail(function(){
        alert('error')
      })
    }
  }
    setInterval(reloadMessages, 5000);
});

