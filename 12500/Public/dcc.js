// +----------------------------------------------------------------------
// | 华三sn码，日志转表格应用
// +----------------------------------------------------------------------
// |6800测试通过，请根据不同型号修改
// +----------------------------------------------------------------------
// | 作者: 郝峥（dcchao@126.com）
// +----------------------------------------------------------------------

/////////////////////
//通用函数
/////////////
//txtStr 日志字符串
// portStr 端口前缀
// portNum 端口数量
//生成相同类型端口和SN码对应数组

//调试
    //$("#ceshi").text(txt2[0]);

function txtToPs(txtStr,portStr,portNum) {
    var portSn = new Array();
    var txtArr = txtStr.split(portStr);

    for (var i = 1; i <= portNum; i++) {
        var ps = txtArr[i].split('The transceiver is absent')[0].split('Manu. Serial Number : ');
        var port = $.trim(ps[0].substring(0,2));
        var sn = ps[1] === undefined ?  "无记录" + '\n' : ps[1].substring(0,21);
        portSn[port] = sn;
        
    };
    return portSn;
}

//将sn数组生成SN号text字符串
function toSnStr(SnArr) {
    var textStr = "";
    $.each(SnArr, function(key, val) {
        if (val != undefined) {
            textStr = textStr + val;
        } else {
            textStr = textStr + "";
        } 
    });
    textStr = textStr.replace(/^\s+|\s+$/g,'');
    return textStr;
}

function toSnHtml(txt,portArr) {
      //交换机前缀生成
      var pstr = portArr[0].split('$a');
      var boardsNum = portArr[1].split('-');
      var bn = Number(boardsNum[0]);
      var bnn = Number(boardsNum[1]);
  
      for (var i=bn; i<=bnn; i++) {
          //生成端口sn码数组
          var portstr = pstr[0] + i + pstr[1];
            //不存在的板卡跳过
          if(txt.indexOf(portstr) < 0 ) {
              continue;
          };
          var portsn = txtToPs(txt,portstr,portArr[2]);
          var htmlStr = toSnStr(portsn);
          //输出到网页
          $("#portlist").append('<p>端口前缀：' + portstr + '<button class="btn button-xsmall pure-button" data-clipboard-text="' + htmlStr + '">复制</button></p>' + '</br>' + '<pre>' + htmlStr + '</pre>');
   
      };
}

/////////////////////////////////////////////////
//页面执行函数
/////////////////////////////////////
function dcc() {
    var port1arr = ['FortyGigE$a/0/','2-17',48];
    var port2arr = ['HundredGigE$a/0/','9-10',2];
    // var port3arr = ['Ten-GigabitEthernet2/0/',48];
    // var port4arr = ['FortyGigE2/0/',4];

    var logtxt = $("#log").val();
    var txt ;
    //去除交换机终端日志干扰
    if(logtxt.indexOf("disabled to display logs") >= 0 ) {
        txt = logtxt.split("disabled to display logs")[1];
    }else{
        txt = logtxt;
    }
    
    //交换机名称 兼容交换机模式<>和[]
    var swname = txt.split(/\<|\[/)[1].split(/\>|\]/);
    $("#swname").html('交换机名称： <button class="btn button-xsmall pure-button" data-clipboard-text="' + swname[0] + '">复制</button>');
    $("#sysn").text(swname[0]);

    //交换机SN码

    //Slot 1 SN码
    var sw1Arr = txt.split("DEVICE_SERIAL_NUMBER : ");
    var sw1Str = sw1Arr[1].substring(0,21).replace(/^\s+|\s+$/g,'');

    $("#sw1sn").html('Slot 1 SN码 <button class="btn button-xsmall pure-button" data-clipboard-text="' + sw1Str + '">复制</button>');
    $("#sw1").text(sw1Str);

    toSnHtml(txt,port1arr);
    toSnHtml(txt,port2arr);
    
    // //交换机前缀生成
    // var pstr = port1arr[0].split('$a');
    // var boardsNum = port1arr[1].split('-');
    // var bn = Number(boardsNum[0]);
    // var bnn = Number(boardsNum[1]);

    // for (var i=bn; i<=bnn; i++) {
    //     //生成端口sn码数组
    //     var portstr = pstr[0] + i + pstr[1];
        
    //     if(txt.indexOf(portstr) < 0 ) {
    //         continue;
    //     };
    //     var port1sn = txtToPs(txt,portstr,port1arr[2]);
    //     var htmlStr = toSnStr(port1sn);
    //     //输出到网页
    //     $("#portlist").append('<p>端口前缀：' + portstr + '<button class="btn button-xsmall pure-button" data-clipboard-text="' + htmlStr + '">复制</button></p>' + '</br>' + '<pre>' + htmlStr + '</pre>');
 
    // };






}