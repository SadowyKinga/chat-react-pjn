import React from 'react';
import LoadingStep from '../loading-step';
import { Avatar, Icon } from 'antd';

import './loading-message.css'

const Loading = () => (
  <div>
    <h1 className="rsc-loading" style={{ marginTop: '-1.5em' }}>
      {<Avatar style={{ width: '40px', height: '40px', borderRadius: '50% 50% 0 50%', marginRight: '10px' }} icon={<Icon type="robot" />} />}
      <LoadingStep delay="0s">.</LoadingStep>
      <LoadingStep delay=".2s">.</LoadingStep>
      <LoadingStep delay=".4s">.</LoadingStep>
    </h1>
  </div>

);

export default Loading;
