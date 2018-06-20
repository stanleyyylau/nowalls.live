/**
 * 背景配置
 */
particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#999"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#999",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

$(document).ready(function () {
  var num = 1;
  var stopIndex = 0;
  var bottomTexts = ['下一步购买', '已付款，下一步获取账号','确认'];
  var sum = 0;
  var order = '';
  var email = '';
  
  /**
   * 打开/关闭 弹窗
   */
  var $openBtn = $('#openBtn');
  var $popup = $('#popup');
  var $close = $('#close');
  $openBtn.click(function() {
    $popup.addClass('active').removeClass('fadeOutDown');
  });
  $close.click(function () {
    $popup.addClass('fadeOutDown').removeClass('active');
  });
  /**
   * 点击 选择类型
   */  
  var $types = $('#typeBox .type');
  var type = $types.eq(1).attr('data-type');
  $types.click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    type = parseInt($(this).attr('data-type'));
    
    outputSum();
  });

  
  /**
   * 点击 减加 按钮
   */
  var $increase = $('#increase');
  var $decrease = $('#decrease');

  $increase.click(function (){
    var val = parseInt($numberInput.val());

    $decrease.removeClass('is-disabled');
    $numberInput.val(++val);
    num = val;

    outputSum();
  });

  $decrease.click(function () {
    var val = parseInt($numberInput.val());
    if(val <= 1){
      $decrease.addClass('is-disabled');
      return false;
    }
    $numberInput.val(--val);
    num = val; 
    outputSum();
  });
  
  
  /**
   * 数量 改变触发事件
   */
  var $numberInput = $('#numberInput');
  $numberInput.change(function (e){
    if (/\D/g.test($(this).val())) {
      $(this).val(1);
    };

    $decrease.addClass('is-disabled');

    if (parseInt($(this).val()) <= 1){
      $(this).val(1);
    }else{
      $decrease.removeClass('is-disabled');
    };
    
    num = parseInt($(this).val());
    outputSum();
  });

  /**
   * 输出 显示金额
   */
  function outputSum() {
    $('#sum').text(parseInt(num) * parseInt(type) );
  };

  /**
   * 生成订单号
   */
  function newOrder() {
  
    var date = new Date();

    var currentMonth = date.getMonth();
    if (currentMonth < 9 ){
        currentMonth = '0' + String(currentMonth + 1)
    } else {
        currentMonth = currentMonth + 1
    }
    var currentDay = date.getDate()
    var currentHour = date.getHours()
    var currentMin = date.getMinutes()
    var currentDateStr = `${currentMonth}${currentDay}${currentHour}${currentMin}`
    return currentDateStr;

  };
  
  /**
   * 点击下一步
   */
  var $next = $('#next');
  var $stops = $('#popup .el-step');
  var $stepContent = $('#popup .step-content');
  $next.click(function(){
    sum = parseInt(num) * parseInt(type);

    // 步骤效果显示
    $stops.eq(stopIndex).find('.el-step__head,.el-step__description').addClass('is-finish');
    $stops.eq(stopIndex).find('.el-step__line-inner').css('width','100%');
    $stops.eq(stopIndex + 1).find('.is-wait').removeClass('is-wait');
    $stepContent.eq(stopIndex + 1).show().siblings('.step-content').hide();

    stopIndex++;

    $(this).text(bottomTexts[stopIndex]);
    if (stopIndex === 1){
      order = newOrder();
      
      $('#paySum').text(sum);
      $('#orderNumber').text(order);
    };
    
    if (stopIndex >= 2) {
      $(this).remove();
    }
  });

  /**
   * 邮箱 输入框失去焦点事件
   */
  $('#eMail').blur(function(){
    email = $(this).val();

    var filter = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!filter.test(email)){
      $('.err-msg').show();
      return false;
    };
    $('.err-msg').hide();
  });
  
  /**
   * 提交表单
   */
  $('#submit').click(function(){
    var filter = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!filter.test(email)){
      $('.err-msg').show();
      return false;
    };

    $stops.eq(stopIndex).find('.el-step__head,.el-step__description').addClass('is-finish');
    
    $('[name="totalAmount"]').val(sum);
    $('[name="orderNo"]').val(order);
    $('[name="userEmail"]').val(email);
    
    setTimeout(function (){
      $('#form').submit();
    }, 500);
  });


})