import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { getQiniuToken } from '../../../utils/server.js';
import { qiniuUrl } from '../../../utils/constants.js';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      pictures: null,
    };
  }
  componentWillMount() {
    this.getQiniuToken();
  }
  getQiniuToken = async () => {
    const { token } = await getQiniuToken();
    if (token) this.setState({ token });
  };
  getImgUrl = () => {
    return this.state.pictures;
  }
  handleChange = ({ file }) => {
    const pictures = file.response ? `http://${qiniuUrl}/${file.response.key}` : null;
    this.setState({ pictures });
  }
  render() {
    const { token, pictures } = this.state;
    return (
      <Upload.Dragger
        showUploadList={false}
        listType="picture-card"
        action="http://up-z0.qiniu.com/"
        data={{ token }}
        onChange={this.handleChange}
      >
        {
        pictures ? <img style={{ width: '100%' }} src={pictures} alt="" /> : <div>
          <p className="ant-upload-drag-icon">
            <Icon type="picture" />
          </p>
          <p className="ant-upload-text">上传图片</p>
          <p className="ant-upload-hint">点击或拖拽图片到这个区域都可以</p>
        </div>
    }
      </Upload.Dragger>
    );
  }
}

export default Editor;
