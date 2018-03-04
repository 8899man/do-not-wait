/**
* @author gm
* @description 复制给其他桌台弹窗
* @date 2017-05-17
**/
import React, { Component } from 'react';
import {Modal} from 'antd';  
import './copy_to_desk.less';
import Scrollbars from 'react-custom-scrollbars';

class CopyToDesk extends Component {

	okClick=()=>{
		if(this.props.okClick){
			this.props.okClick();
		}
	}
	cancelClick=()=>{
		if(this.props.cancelClick){
			this.props.cancelClick();
		}
	}
	render() {
    	return <div>
			<Modal  
				title="选择复制点菜的桌台"
				visible={true} 
				maskClosable={false} 
				width={670}
				footer={null}
				closable={false}
				wrapClassName="copy-to-desk-popup-modal"    
				>      
				<div className="copy-to-desk-container">
					
					<div className="content">
						<Scrollbars>
							<ul className="all-item">
								<li className="desk-item select">
									<p>A101</p>
									<div>8人桌</div>
								</li>
								<li className="desk-item">
									<p>A101</p>
									<div>10人桌</div>
								</li>
								<li className="desk-item">
									<p>A101</p>
									<div>10人桌</div>
								</li>										
							</ul>
						</Scrollbars>
					</div>
					<ul className="btns">
						<li>全选</li>
						<li>反选</li>
						<li onClick={this.cancelClick}>取消</li>
						<li onClick={this.okClick}>确定</li>
					</ul>
				</div>
			</Modal>
      </div>
	}

}

export default CopyToDesk;
