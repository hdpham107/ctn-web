import { Icon, Steps } from 'antd';
import React, { useState } from 'react';
import Step1 from '../Steps/Step1';
import Step2 from '../Steps/Step2';
import Step3 from '../Steps/Step3';

const { Step } = Steps;

const CeremonyServingRegister = (props) => {
  const { submitTarget = '/dashboard' } = props;
  const [step, setStep] = useState(0);
  const submitStep = (s) => () => {
    setStep(s);
  };
  let stepTemplate = [
    {
      title: 'Thông tin cơ bản',
      template: <Step1 submitStep={submitStep(1)} />,
      current: 0,
    },
    {
      title: 'Thông tin đầy đủ',
      template: <Step2 submitStep={submitStep(2)} />,
      current: 1,
    },
    {
      title: 'Thông tin đầy đủ',
      template: <Step3 submitTarget={submitTarget} />,
      current: 2,
    },
  ];
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="display-5 mb-4 text-center">ĐĂNG KÝ ĐẠI LỄ</h1>
        <Steps current={stepTemplate[step].current}>
          <Step title="Thông tin cơ bản" icon={<Icon type="login" />} />
          <Step title="Cập nhật thông tin" icon={<Icon type="solution" />} />
          <Step title="Hoàn thành" icon={<Icon type="smile-o" />} />
        </Steps>
        <div
          className="row g-5 justify-content-center"
          style={{ marginTop: 20 }}
        >
          {stepTemplate[step].template}
        </div>
      </div>
    </div>
  );
};

export default CeremonyServingRegister;
