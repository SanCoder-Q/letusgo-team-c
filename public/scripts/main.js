$(document).ready(function () {
  var feature = (function () {
    var initItems = function () {
      if($('#item-table').length) {
        $.ajax({
          type: "GET",
          url: "/products",
          dataType: "json",
          success: function(data) {
            var items = data;
            $.each(items, function (index, item) {
              var addCart = '<button id="btn-'+index+'">加入购物车</button>';
              var listItem = $('<tr class="itemRow">\
                                <td>' + item.name + '</td>\
                                <td>' + item.price + '</td>\
                                <td>' + item.unit + '</td>\
                                <td>' + addCart + '</td>\
                                </tr>');
              $('#item-table').append(listItem);
            });
            $('.itemRow button').click(function(event) {
              event.preventDefault();
              var itemIndex = parseInt($(event.target).attr("id").split("-")[1]);
              //shopping cart should do something
              //the counter of cart should updata
            });
          }
        });
      }
    };

    var initAddItemForm = function () {
      var form = $('#addForm');
      if(form.length) {
        form.submit(function(event) {
          event.preventDefault();
          var postData = utils.serializeArraytoJson($(this).serializeArray());
          $.ajax({
            type: "POST",
            url: "/add",
            dataType: "json",
            data: postData,
            success: function(data) {
              if(data === "success") {
                messageBox("添加成功！");
              }
              else {
                messageBox("添加失败！");
              }
            },
            error: function(error) {
              messageBox("请求失败！");
            },
            complete: function() {
              form.find("input").val("");
            }
          });
        });
      }
    };

    var printDate = function() {
      $("#pay-date").text(utils.getDate());
    };

    return {
      init: initItems,
      initAddItemForm: initAddItemForm,
      printDate: printDate
    };

    function messageBox (str) {
      var messagebox = $("\
                          <div id='messagebox'>\
                            <div id='messageboxOverlay'></div>\
                            <div id='messageboxContent'>" + str + "\
                            </div>\
                          </div>");
      $("body").append(messagebox);
      $("#messagebox").click(function(){
        $(this).fadeOut(400, function(){
          messagebox.remove();
        });
      });
    }
  })();

  feature.init();
  feature.initAddItemForm();
  feature.printDate();
});
