/* DEVELOPER: Vishal Tailor, IS117-002, Spring 2019 */
/* Orignal Source: https://bootsnipp.com/snippets/z8aM9 */
/// <reference path="jquery-1.12.3.js" />
(function ($) {
   var list = [];
   /* function to be executed when product is selected for comparision*/
   $(document).on('click', '.addToCompare', function () {
      $(".comparePanle").show();
      $(this).toggleClass("rotateBtn");
      $(this).parents(".selectProduct").toggleClass("selected");
      var productID = $(this).parents('.selectProduct').attr('data-title');

      var inArray = $.inArray(productID, list);
      if (inArray < 0) {
         if (list.length > 2) {
            $("#WarningModal").show();
            $("#warningModalClose").click(function () {
               $("#WarningModal").hide();
            });
            $(this).toggleClass("rotateBtn");
            $(this).parents(".selectProduct").toggleClass("selected");
            return;
         }

         if (list.length < 2) {
            list.push(productID);

            var displayTitle = $(this).parents('.selectProduct').attr('data-id');
            var image = $(HTMLImageElement).find(".productImg").attr('src');
            //var image = $(this).siblings(".productImg").attr('src');
            
            $(".comparePan").append('<div id="' + productID + '" class="relPos titleMargin w3-margin-bottom   w3-col l3 m4 s4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn closebtn cursor">&times</a><img src="' + image + '" alt="image" style="height:100px;"/><p id="' + productID + '" class="titleMargin1">' + displayTitle + '</p></div></div>');
           
         }
      } else {
         list.splice($.inArray(productID, list), 1);
         var prod = productID.replace(" ", "");
         $('#' + prod).remove();
         hideComparePanel();

      }
      if (list.length > 1) {

         $(".cmprBtn").addClass("active");
         $(".cmprBtn").removeAttr('disabled');
      } else {
         $(".cmprBtn").removeClass("active");
         $(".cmprBtn").attr('disabled', '');
      }
   });
   /*function to be executed when compare button is clicked*/
   $(document).on('click', '.cmprBtn', function () {
      if ($(".cmprBtn").hasClass("active")) {
         /* this is to print the  features list statically*/
         $(".contentPop").append('<div class="col-md-3 compareItemParent relPos">' + '<ul class="product">' + '<li class=" relPos compHeader"><p class="w3-display-middle">Tech Specs</p></li>' + '<li>Title</li>' + '<li>Dimensions</li>' + '<li>Weight</li>' + '<li>Screen</li>' + '<li>OS</li>' + '<li>Storage</li>' + '<li>MicroSD card slot</li>' + '<li>Processor</li>' + '<li>RAM</li>' + '<li>Camera</li>' + '<li>Water resistant</li>' + '<li>Battery</li>' +'<li class="no-bottom-border">Price</li></ul>' + '</div>');

         for (var i = 0; i < list.length; i++) {
            /* this is to add the items to popup which are selected for comparision */
            product = $('.selectProduct[data-title="' + list[i] + '"]');
            var image = $('[data-title=' + list[i] + ']').find(".productImg").attr('src');
            var title = $('[data-title=' + list[i] + ']').attr('data-id');
            /*appending to div*/
            $(".contentPop").append('<div class="col-md-3 compareItemParent relPos">' + '<ul class="product">' + '<li class="compHeader"><img src="' + image + '" class="compareThumb"></li>' + '<li>' + title + '</li>' + '<li>' + $(product).data('dimensions') + '</li>' + '<li>' + $(product).data('weight') + '<li>' + $(product).data('screen')  + '<li>' + $(product).data('os') + '</li>' + '<li>' + $(product).data('storage') + '</li>' + '<li>' + $(product).data('microsd') + '</li>' + '<li>' + $(product).data('processor') + '</li>' + '<li>' + $(product).data('ram') + '</li>' + '<li>' + $(product).data('camera') + '</li>' + '<li>' + $(product).data('waterresistant') + '</li>' + '<li>' + $(product).data('battery') + '</li>' + '<li>' + $(product).data('price') + '</ul>' + '</div>');
         }
      }
      $(".modPos").show();
   });

   /* function to close the comparision popup */
   $(document).on('click', '.closeBtn', function () {
      $(".contentPop").empty();
      $(".comparePan").empty();
      $(".comparePanle").hide();
      $(".modPos").hide();
      $(".selectProduct").removeClass("selected");
      $(".cmprBtn").attr('disabled', '');
      list.length = 0;
      $(".rotateBtn").toggleClass("rotateBtn");
   });

   /*function to remove item from preview panel*/
   $(document).on('click', '.selectedItemCloseBtn', function () {
      var test = $(this).siblings("p").attr('id');
      $('[data-title=' + test + ']').find(".addToCompare").click();
      hideComparePanel();
   });
   function hideComparePanel() {
      if (!list.length) {
         $(".comparePan").empty();
         $(".comparePanle").hide();
      }
   }
})(jQuery);