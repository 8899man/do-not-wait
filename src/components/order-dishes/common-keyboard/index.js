
import React from 'react';
import './common-keyboard.css';

class CommonKeyboard extends React.Component{

    state = {result: ''}

    itemClick=(e)=>{

        let temp = this.state.result;
        let value = e.target.value;
        
        if(value>=0&&value<=9){
            temp = temp.concat(value);  
        }else if(value==='.'){
            if(!temp.includes(".")){
                temp = temp.concat(value);
            }
        }else{
            temp = temp.substring(0,temp.length-1);
        }

        if(temp.startsWith('.')){
            temp="0".concat(temp);
        }

        this.setState({result: temp}); 

        if(this.props.getResult){ 
            if(temp.indexOf('0') === 0 && temp.indexOf('.') !== 1 && temp.length>1) {
                temp = temp.substr(1);
            }
            if(temp.indexOf('.') > -1) {
                let index=temp.indexOf('.');
                temp = temp.substr(0,index+3);
            }

            if(temp.indexOf('.') === -1) {
                temp = temp.substr(0,3);
            }

            this.props.getResult(temp);
            this.setState({result: temp});
        }

        if(this.props.getValue){
            this.props.getValue(value);
        }

    }

    render(){
        return(
             <div className="my-keyboard">
                <div className='cheng-btns'>
                    {['1','2','3','4','5','6','7','8','9','.','0'].map(key => {
                        return <input
                            key={key} 
                            type='button' 
                            className='btn-item' 
                            value={key} 
                            onClick={this.itemClick} 
                        />
                    })}
                    <div className='btn-back' onClick={this.itemClick}><i className='iconfont icon-order_btn_back'></i></div>
                </div>
            </div>
        )
    }
}


export default CommonKeyboard;
