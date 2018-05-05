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
//生成相同类型端口和SN码对应数组
function txtToPs(txtStr,portStr,portNum) {
    var portSn = new Array();
    var txtArr = txtStr.split(portStr);

    for (var i = 1; i <= portNum; i++) {
        var ps = txtArr[i].split('Manu. Serial Number : ');
        var port = $.trim(ps[0].substring(0,2));
        var sn = ps[1] === undefined ?  "无记录" + '\n' : ps[1].substring(0,21);
        portSn[port] = sn;
        
    };
    return portSn;
}

//生成SN号text字符串
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
/////////////////////////////////////////////////
//页面执行函数
/////////////////////////////////////
function dcc() {
    var port1arr = ['Ten-GigabitEthernet1/0/',48];
    var port2arr = ['FortyGigE1/0/',4];
    var port3arr = ['Ten-GigabitEthernet2/0/',48];
    var port4arr = ['FortyGigE2/0/',4];

    var logtxt = $("#log").val();
    var txt ;
    if(logtxt.indexOf("disabled to display logs") >= 0 ) {
        txt = logtxt.split("disabled to display logs")[1];
    }else{
        txt = logtxt;
    }
        
    var port1sn = txtToPs(txt,port1arr[0],port1arr[1]);

    var txt2 = txt.split(port1arr[0]);
    
    //调试
    //$("#ceshi").text(txt2[0]);
    
    var port2sn = txtToPs(txt2[0],port2arr[0],port2arr[1]);


 

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

    


    //第1组端口SN码
    
    var htmlStr = toSnStr(port1sn);

    $("#port1").html("端口类型：" + port1arr[0] + '<button class="btn button-xsmall pure-button" data-clipboard-text="' + htmlStr + '">复制</button>');
    $("#port1sn").text(htmlStr);


    //第2组端口SN码
    
    var htm2Str = toSnStr(port2sn);

    $("#port2").html("端口类型：" + port2arr[0] + '<button class="btn button-xsmall pure-button" data-clipboard-text="' + htm2Str + '">复制</button>' + '<br />');
    $("#port2sn").html(htm2Str);


    //var snAll = htmlStr + '\n' + htm2Str + '\n' + htm3Str + '\n' + htm4Str;
    var snAll = htmlStr + '\n' + htm2Str;
    

//判断是否存在Slot 2
    if(txt.indexOf("Slot 2") >= 0 ) { 

        var txt3 = txt;
        var port3sn = txtToPs(txt3,port3arr[0],port3arr[1]);
    
        var txt4 = txt.split(port1arr[0]);
        var port4sn = txtToPs(txt4[0],port4arr[0],port4arr[1]);
         //Slot 2 SN码
        var sw2 = txt.split('Slot 1');//避免一次Slot 2干扰日志记录
        sw2 = sw2[1].split('Slot 2');
        var sw2Arr = sw2[1].split("DEVICE_SERIAL_NUMBER : ");
        var sw2Str = sw2Arr[1].substring(0,21).replace(/^\s+|\s+$/g,'');
    
        $("#sw2sn").html('Slot 2 SN码 <button class="btn button-xsmall pure-button" data-clipboard-text="' + sw2Str + '">复制</button>');
        $("#sw2").text(sw2Str);
    
        //第3组端口SN码
        
        var htm3Str = toSnStr(port3sn);
    
        $("#port3").html("端口类型：" + port3arr[0] + '<button class="btn button-xsmall pure-button" data-clipboard-text="' + htm3Str + '">复制</button>');
        $("#port3sn").text(htm3Str);
    
    
        //第4组端口SN码
        
        var htm4Str = toSnStr(port4sn);
    
        $("#port4").html("端口类型：" + port4arr[0] + '<button class="btn button-xsmall pure-button" data-clipboard-text="' + htm4Str + '">复制</button>' + '<br />');
        $("#port4sn").html(htm4Str);

        snAll = snAll + '\n' + htm3Str + '\n' + htm4Str;
    };
    
    $("#snall").html('<button class="btn button-xsmall pure-button" data-clipboard-text="' + snAll + '">复制全部端口SN码</button>');

}