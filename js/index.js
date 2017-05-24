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
    observe(){
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            observeProperty(data, key, data[key])
        })
    }
}
let common = new Common();
class Chess {
    //点击落子时改变类
    change_class(flag,e,cls,removeCls){//flag：当前位置上是否已有棋子;e:点击的dom对象
        if(flag){
            let target_classname = e.className;
            let re_cls = common.has_class.call(this,removeCls,target_classname);
            if(re_cls)
                target_classname = common.remove_class.call(this,removeCls,target_classname)

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
        for (let i = x, j = y; i >= 0, j < 15; i--, j++) {
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
        for (let i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {
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

        if(count1 >= 5||count2 >= 5||count3 >= 5||count4 >= 5){
            //todo 赢了后不能继续下了
            this.win=true;
            if(chessflag ==2){
                // alert('黑棋赢了');
                this.blackWin=true;
            }else{
                // alert('白棋赢了');
                this.whiteWin=true;
            }
        }
    }
    init(){
        let that = this;
        this.chess_flag=1;//没选黑白棋
        this.wtite_chess= [];
        this.black_chess= [];
        this.count1=0;
        this.white_turn=true;
        this.black_turn = false;
        this.win=false;
        this.blackWin=false;
        this.whiteWin=false;
        let msg=document.getElementById('msg');

        //全局变量 黑白棋 0默认 1白 2黑
        document.getElementsByClassName('js_board')[0].addEventListener('click',function (e) {
            if(that.win){
                return ;
            }else{
                if(that.chess_flag==1&&that.white_turn || that.chess_flag==2&&that.black_turn){
                    const li_chess = common.has_class.call(that,'chess',e.target.className),
                    round_click = common.has_class.call(that,'round_common',e.target.className),
                    target_dom = li_chess?e.target.children[0]:e.target,
                    li_chess_name = target_dom.className,
                    li_dom = li_chess?e.target:e.target.parentNode,
                    li_chess_flag = li_dom.getAttribute('flag');

                    if(li_chess&&li_chess_flag!=1||round_click){
                        li_dom.setAttribute('flag',1);//标记下过

                        if(that.chess_flag ==1 )
                            that.change_class(1,target_dom,'round_active_white','round_common');
                        if(that.chess_flag ==2)
                            that.change_class(1,target_dom,'round_active_black','round_common');

                        //获取li 索引
                        let index = common.get_li_index.call(that,'js_board',li_dom);
                        //保存坐标信息
                        that.save_chess_msg.call(that,that.chess_flag,index);
                        console.log(that.wtite_chess);
                        // console.log(index);
                        that.judge.call(that,that.chess_flag,index);
                        that.black_turn= !that.black_turn;
                        that.white_turn= !that.white_turn;
                        if(that.black_turn){
                            that.chess_flag=2;
                            msg.innerText='您现在是黑棋...';
                        }else{
                            that.chess_flag=1;
                            msg.innerText='您现在是白棋...';
                        }
                        if(that.blackWin) alert('黑棋赢了');
                        if(that.whiteWin) alert('白棋赢了');
                    }else{
                        // alert('这个地方点过了啊');//li里面的子元素没绑定点击
                        return;
                    }
                }else{
                    // alert('请交换棋子角色');
                }
            }

            // }
        });
    }
}
let chess = new Chess();
chess.init();
