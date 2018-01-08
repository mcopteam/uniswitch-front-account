import './index.less'
import React, { Component } from 'react'
import { Form, Modal, Button,Input, Icon, message } from 'antd';
import reqwest from 'reqwest';
import { api } from '../../../../common/api_server'
import { param }from '../../../../common/param'
import { url }from '../../../../common/url_api'
import { actionMenuEdit } from  '../../../../actions/limit-menu'
import CreateForm from '../createForm'

export default class CreateBtn extends React.Component {
  state = {
  	visible: false,
	update:false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>添加区块链</Button>
        <Modal
					footer={null}
          title="区块链信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="添加"
          cancelText="取消"
        >
          <CreateForm onOk={this.handleOk} />
        </Modal>
      </div>
    );
  }
}
