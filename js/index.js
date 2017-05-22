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
    //算法有错，应该是五个连在一起的棋子，改改改
    judge(chessflag,index){//黑白棋，x，y棋子坐标。直线就是y=x+b
        let x = index % 10,//10应该用变量代替，后期改下
            y= Math.floor(index / 10);
        let wtite_chess_data= this.wtite_chess,
            black_chess_data= this.black_chess;
        let count1 =0,
            count2=0,
            count3=0,
            count4=0;
        //左右方向，x变化，y不变，因为这里，加上flag；没法判断黑白棋；记上了呢？
        for (let i = x; i >= 0; i--) {
            if(chessflag ==1 ){
                if(wtite_chess_data.indexOf('('+i+','+y+')') != -1){
                    count1 ++;
                }else{
                    break;
                }
            }
            if(chessflag ==2){
                if(black_chess_data.indexOf('('+i+','+y+')') != -1 ){
                    count1 ++;
                }else{
                    break;
                }
            }
        }
        for (let i = x + 1; i < x+5; i++) {
            if(chessflag ==1){
                if(wtite_chess_data.indexOf('('+i+','+y+')') != -1){
                    count1 ++;
                }else{
                    break;
                }
            }
            if(chessflag ==2){
                if(black_chess_data.indexOf('('+i+','+y+')') != -1){
                    count1 ++;
                }else{
                    break;
                }
            }
            // break;
        }
        //上下判断
        for (let i = y; i >= 0; i--) {
            if(chessflag ==1 ){
                if(wtite_chess_data.indexOf('('+x+','+i+')') != -1){
                    count2 ++;
                }else{
                    break;
                }
            }
            if(chessflag ==2){
                if(black_chess_data.indexOf('('+x+','+i+')') != -1 ){
                    count2 ++;
                }else{
                    break;
                }
            }
        }
        for (let i = y + 1; i < 5; i++) {
            if(chessflag ==1){
                if(wtite_chess_data.indexOf('('+i+','+y+')') != -1){
                    count2 ++;
                }else{
                    break;
                }
            }
            if(chessflag ==2){
                if(black_chess_data.indexOf('('+i+','+y+')') != -1){
                    count2 ++;
                }else{
                    break;
                }
            }
        }

        //左上右下判断
        for (let i = x, j = y; i >= 0, j >= 0; i--, j--) {
            if(chessflag ==1 ){
                if(wtite_chess_data.indexOf('('+i+','+j+')') != -1){
                    count3 ++;
                }else{
                    break;
                }
            }
            if(chessflag ==2){
                if(black_chess_data.indexOf('('+i+','+j+')') != -1 ){
                    count3 ++;
                }else{
                    break;
                }
            }
        }
        for (let i = x + 1, j = y + 1; i < x+5, j < y+5; i++, j++) {
            if(chessflag ==1 ){
                if(wtite_chess_data.indexOf('('+i+','+j+')') != -1){
                    count3 ++;
                }else{
                    break;
                }
            }
            if(chessflag ==2){
                if(black_chess_data.indexOf('('+i+','+j+')') != -1 ){
                    count3 ++;
                }else{
                    break;
                }
            }
        }

        //右上左下判断
        for (var i = x, j = y; i >= 0, j < 15; i--, j++) {
            if(chessflag ==1 ){
                if(wtite_chess_data.indexOf('('+i+','+j+')') != -1){
                    count4 ++;
                }else{
                    break;
                }
            }
            if(chessflag ==2){
                if(black_chess_data.indexOf('('+i+','+j+')') != -1 ){
                    count4 ++;
                }else{
                    break;
                }
            }
        }
        for (var i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {
            if(chessflag ==1 ){
                if(wtite_chess_data.indexOf('('+i+','+j+')') != -1){
                    count4 ++;
                }else{
                    break;
                }
            }
            if(chessflag ==2){
                if(black_chess_data.indexOf('('+i+','+j+')') != -1 ){
                    count4 ++;
                }else{
                    break;
                }
            }
        }

        // console.log(this.count1);
        if(count1 >= 5||count2 >= 5||count3 >= 5||count4 >= 5){
            //todo 赢了后不能继续下了
            // alert(999);
            if(chessflag ==2){
                alert('黑棋赢了');
            }else{
                alert('白棋赢了');
            }
        }
    }
    init(){
        let that = this;
        this.chess_flag=0;//没选黑白棋
        this.wtite_chess= [];
        this.black_chess= [];
        this.count1=0;
        this.white_turn=false;
        this.black_turn = false;

        //全局变量 黑白棋 0默认 1白 2黑
        document.getElementsByClassName('js_board')[0].addEventListener('click',function (e) {
            if(that.chess_flag==0){
                alert('请选择棋子颜色');
            }else {//下过子就不能再下了
                //添加样式
                if(that.chess_flag==1&&that.white_turn || that.chess_flag==2&&that.black_turn){
                    let li_chess = common.has_class.call(that,'chess',e.target.className);
                    if(li_chess){
                        // e.target.setAttribute('flag',1);//刚刚循环了？为啥？没标记flag?好像没用到
                        let li_chess_name = e.target.children[0].className;
                        let has_active = common.has_class.call(that,'round_active',li_chess_name);
                        if(has_active){
                            return ;
                        }
                        if(that.chess_flag ==1 ){
                            that.change_class(1,e.target.children[0],'round_active_white','round_common');
                        }else if(that.chess_flag ==2){
                            that.change_class(1,e.target.children[0],'round_active_black','round_common');
                        }

                        //获取li 索引
                        let index = common.get_li_index.call(that,'js_board',e.target);
                        //保存坐标信息
                        that.save_chess_msg.call(that,that.chess_flag,index);
                        console.log(that.wtite_chess);
                        // console.log(index);
                        that.judge.call(that,that.chess_flag,index);
                        that.black_turn= !that.black_turn;
                        that.white_turn= !that.white_turn;
                    }else{
                        alert('这个地方点过了啊');//li里面的子元素没绑定点击
                    }
                }else{
                    alert('请交换棋子角色');
                }
            }
        });
        //选择黑白棋
        document.getElementsByClassName('js_black_chess')[0].onclick=function(){
            that.chess_flag=2;
            let check = document.getElementById("white_chess").checked;
            if(check){
                that.black_turn =document.getElementById("white_chess").checked= false;//直接写1就好了吧
            }
            that.black_turn=true;
            // that.white_turn=true;
        };

        document.getElementsByClassName('js_white_chess')[0].onclick=function(){
            that.chess_flag=1;
            let check = document.getElementById("black_chess").checked;
            if(check){
                that.white_turn =document.getElementById("black_chess").checked= false;
            }
            that.white_turn=true;
            // that.black_turn=true;
        };
    }
}
let chess = new Chess();
chess.init();
