require('../css/index.scss');
class Common{
    has_class(clsName,eleClsName){
        let reg = new RegExp('(^|\\s+)' + clsName + '($|\\s+)');
        return reg.test(eleClsName);
    }
    remove_class(clsName,eleClsName){
        let reg = new RegExp('(^|\\s+)' + clsName + '($|\\s+)');
        let new_name = eleClsName.replace(reg,"");
        return new_name;
    }
    get_li_index(parentClass,target){//仅能取以及li
        let p_dom = document.getElementsByClassName(parentClass)[0],
            child_arr = p_dom.children,
            len = child_arr.length;
        for(let i=0;i<len;i++){
            if(child_arr[i] === target){
                return i;
            }
        }

    }
}
let common = new Common();
class Chess {
    constructor(x, y) {
        //全局变量 黑白棋 0默认 1白 2黑
        this.chess_flag=0;
        this.wtite_chess= [];
        this.black_chess= [];
    }
    //点击落子时改变类
    change_class(flag,e,cls,removeCls){//flag：当前位置上是否已有棋子;e:点击的dom对象
        if(flag){
            let target_classname = e.className;
            let re_cls = common.has_class.call(this,removeCls,target_classname);
            if(re_cls){
                target_classname = common.remove_class.call(this,removeCls,target_classname)
            }
            let new_class = target_classname+' '+cls;
            e.setAttribute('class',new_class);
        }
    }
    //获取坐标和黑白棋
    get_coordinate(index,rowNum,chessFlag){
        let x = index % rowNum,
            y= Math.floor(index / rowNum);
        return '(' + x+','+y+')';
    }
    //根据坐标获取棋子信息
    get_chess_mess(){

    }
    //保存棋子坐标信息
    save_chess_msg(chessFlag,chessIndex){//黑白棋，坐标
        //白棋一个对象，黑棋一个对象
        let chess_index = this.get_coordinate(chessIndex,10,chessFlag);
        if(chessFlag  == 1){
            this.wtite_chess.push(chess_index);
        }
        if(chessFlag  == 2){
            this.black_chess.push(chess_index);
        }
        return ;

    }
    //判断下棋输赢,该棋子八个方向上是否有五个子连成一条线
    judge(chessflag,index){//黑白棋，x，y棋子坐标。直线就是y=x+b
        let x = index % 10,//10应该用变量代替，后期改下
            y= Math.floor(index / 10);
        let wtite_chess_data= this.wtite_chess,
            black_chess_data= this.black_chess;
        let count1 =0,
            count2=0,
            count3=0,
            count4=0;
        //左右方向，x变化，y不变
        for (let i = x; i >= 0; i--) {
            if(wtite_chess_data.indexOf('('+i+','+y+')') == -1 && chessflag===1 ){
                break;
            }
            console.log(this.count1);
            count1 ++;
        }
        for (let i = x + 1; i < x+4; i++) {
            if(wtite_chess_data.indexOf('('+i+','+y+')') == -1 && chessflag===1){
                break;
            }
            count1 ++;
        }
        // console.log(this.count1);
        if(count1 >= 5){
            alert(999);
        }
    }
    init(){
        let that = this;
        this.chess_flag=0;
        this.wtite_chess= [];
        this.black_chess= [];
        this.count1=0;

        //全局变量 黑白棋 0默认 1白 2黑
        document.getElementsByClassName('js_board')[0].addEventListener('click',function (e) {
            //添加样式
            let li_chess = common.has_class.call(that,'chess',e.target.className);
            if(li_chess){
                e.target.setAttribute('flag',1);//刚刚循环了？为啥？没标记flag?
                let li_chess_name = e.target.children[0].className;
                let has_active = common.has_class.call(that,'round_active',li_chess_name);
                if(has_active){
                    return ;
                }
                that.change_class(1,e.target.children[0],'round_active','round_common');
                //获取li 索引
                let index = common.get_li_index.call(that,'js_board',e.target);
                //保存坐标信息
                that.save_chess_msg.call(that,1,index);
                console.log(that.wtite_chess);
                // console.log(index);
                that.judge.call(that,1,index);
            }else{
                alert('这个地方点过了啊');
            }
        });
    }
}
let chess = new Chess();
chess.init();

function judge(x, y, chess) {//判断该局棋盘是否赢了
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
//左右判断
    for (var i = x; i >= 0; i--) {
        if (chessData
                [y] != chess) {
            break;
        }
        count1++;
    }
    for (var i = x + 1; i < 15; i++) {
        if (chessData
                [y] != chess) {
            break;
        }
        count1++;
    }
//上下判断
    for (var i = y; i >= 0; i--) {
        if (chessData[x]
            != chess) {
            break;
        }
        count2++;
    }
    for (var i = y + 1; i < 15; i++) {
        if (chessData[x]
            != chess) {
            break;
        }
        count2++;
    }
//左上右下判断
    for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
        if (chessData
                [j] != chess) {
            break;
        }
        count3++;
    }
    for (var i = x + 1, j = y + 1; i < 15, j < 15; i++, j++) {
        if (chessData
                [j] != chess) {
            break;
        }
        count3++;
    }
//右上左下判断
    for (var i = x, j = y; i >= 0, j < 15; i--, j++) {
        if (chessData
                [j] != chess) {
            break;
        }
        count4++;
    }
    for (var i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {
        if (chessData
                [j] != chess) {
            break;
        }
        count4++;
    }
    if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
        if (chess == 1) {
            alert("白棋赢了");
        }
        else {
            alert("黑棋赢了");
        }
        isWell = true;//设置该局棋盘已经赢了，不可以再走了
    }
}
