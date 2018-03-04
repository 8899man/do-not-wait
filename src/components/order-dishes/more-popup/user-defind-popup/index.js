/**
* @author shelly
* @description 自定义菜
* @date 2017-05-23
**/
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Alert, Select, Checkbox } from 'antd';
import classnames from 'classnames';

import BeiZhu from '../../beizhu';

import { getJSON } from 'common/utils';

import './user_defind_popup.less';

const Option = Select.Option;

@inject('dishesStore')
@observer
class UserDifineDishes extends React.Component {
  constructor(props) {
    super(props);
    this.getProductUnit();
    this.getProducePort();
  }

  state = {
    unitList: [],
    portList: [],
    productName: '',
    productUnit: '',
    needWeight: false,
    expectWeight: 0,
    price: '',
    portID: '',
    memo: ''
  };

  //确定
  handleOk = () => {
    const { dishesStore } = this.props;
    const {
      portID,
      productName,
      productUnit,
      memo,
      price,
      expectWeight
    } = this.state;
    if (!productName) {
      dishesStore.showFeedback({status: 'validate', msg: '请输入名称！'});
    } else if (!price) { 
      dishesStore.showFeedback({status: 'validate', msg: '请输入单价！'});
    }else {
      const dishes = {
        aLaCarteMethod: 684,
        quantity: 1,
        portID,
        productName,
        productUnit,
        memo,
        price,
        expectWeight
      };
  
      dishesStore.addTemporaryDishes(dishes);
  
      this.props.handleClose && this.props.handleClose();
    } 
  };
  //放弃
  handleCancel = () => {
    this.props.handleClose && this.props.handleClose();
  };

  handleProductName = e => {
    this.setState({ productName: e.target.value });
  };

  handleUnit = value => {
    this.setState({ productUnit: value * 1 });
  };

  handleNeedWeight = e => {
    this.setState({ needWeight: !this.state.needWeight });
  };

  handleExpectWeight = e => {
    this.setState({ expectWeight: e.target.value * 1 });
  };

  handlePrice = e => {
    this.setState({ price: e.target.value * 1 });
  };

  handlePort = value => {
    this.setState({ portID: value * 1 });
  };

  handleMemo = memo => {
    this.setState({ memo });
  };

  getProductUnit = () => {
    getJSON({
      url: '/reception/product/getProductUnit',
      success: json => {
        if (json.code === 0 && json.data.length > 0) {
          this.setState({
            unitList: json.data,
            productUnit: json.data[0].id
          });
        }
      }
    });
  };

  getProducePort = () => {
    const archiveID = JSON.parse(sessionStorage.getItem('account')).archiveID;
    getJSON({
      url: '/reception/product/getProducePort',
      data: { archiveID },
      success: json => {
        if (json.code === 0 && json.data.length > 0) {
          this.setState({
            portList: json.data,
            portID: json.data[0].portID
          });
        }
      }
    });
  };

  render() {
    const { dishesStore } = this.props;
    const {
      unitList,
      portList,
      productName,
      productUnit,
      needWeight,
      expectWeight,
      price,
      portID,
      memo
    } = this.state;
    return (
      <div>
        <Modal
          title="临时菜"
          visible={true}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
          width={640}
          wrapClassName="user-defind-popup-modal"
        >
          {dishesStore.feedback &&
            dishesStore.feedback.status === 'validate' && (
              <Alert
                message={dishesStore.feedback.msg}
                banner
                closable
                onClose={() => {
                  //关闭警告信息
                  dishesStore.closeFeedback();
                }}
              />
            )}
          <div className="guige">
            <div className="list">
              <p className="left-name">
                <i className="required-icon">*</i>名称
              </p>
              <div className="input-choose">
                <input
                  type="text"
                  value={productName}
                  onChange={this.handleProductName}
                />
              </div>
            </div>
            <div className="list">
              <p className="left-name">单位</p>
              <div className="input-choose">
                <Select
                  value={productUnit + ''}
                  style={{ width: 200 }}
                  onChange={this.handleUnit}
                >
                  {unitList.map(unit => {
                    return (
                      <Option key={unit.id} value={unit.id + ''}>
                        {unit.name}
                      </Option>
                    );
                  })}
                </Select>
                <Checkbox checked={needWeight} onChange={this.handleNeedWeight}>
                  需要称重
                </Checkbox>
              </div>
            </div>
            {needWeight && (
              <div className="list">
                <p className="left-name">期望重量</p>
                <div className="input-choose">
                  <input
                    type="number"
                    value={expectWeight > 0 && expectWeight}
                    onChange={this.handleExpectWeight}
                  />
                </div>
              </div>
            )}
            <div className="list">
              <p className="left-name">
                <i className="required-icon">*</i>单价
              </p>
              <div className="input-choose">
                <input
                  type="number"
                  value={price}
                  onChange={this.handlePrice}
                />
              </div>
            </div>
            <div className="list">
              <p className="left-name">出品口</p>
              <div className="input-choose">
                <Select
                  value={portID + ''}
                  style={{ width: 200 }}
                  onChange={this.handlePort}
                >
                  {portList.map(port => {
                    return (
                      <Option key={port.portID} value={port.portID + ''}>
                        {port.portName}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="list">
              <p className="left-name">备注</p>
              <div className="input-choose">
                <BeiZhu memo={memo} onEntry={this.handleMemo} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserDifineDishes;
