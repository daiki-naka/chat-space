$(function(){

  $(document).on('turbolinks:load', function(){
    
    var search_list = $(".chat-group-user")
    var delete_list = $(".chat-group-member-add")
    
    function apendUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user-name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`
                  search_list.append(html)
                  
    }

    
    function apendErrMsgToHTML(msg){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user-name">${msg}</p>
                  </div>`
                  search_list.append(html);
    }

    function chatUser(name, user_id) {
      var html = `<div class='chat-group-member'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-member__name'>${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
                  delete_list.append(html);

    }


    $(".chat-group-user__name").on("keyup", function(){
      var input = $(".chat-group-user__name").val();
        
        $.ajax({
          type: 'GET',
          url: '/users/',
          data: { keyword: input },
          dataType: 'json'
        })
      
        .done(function(users){
          if (input.length === 0){
            $('.chat-group-user.clearfix').empty();
          }
          else if(users.length !== 0){
            users.forEach(function(user){
              apendUser(user)
              })
            }
          else {
            $('.chat-group-user.clearfix').empty();
              apendErrMsgToHTML("このユーザーは該当しません。");
            }
        })
      .fail(function(){
        alert("該当なし");
        });
      })
      $(document).on("click",".user-search-add",function(){
        var user_id = $(this).data("user-id")
        var name = $(this).data("user-name")
        $(this).parent().remove();
        chatUser(name, user_id)
    });
      $(document).on("click", ".js-remove-btn",function(){
        $(this).parent().remove();
      });
  });
});
