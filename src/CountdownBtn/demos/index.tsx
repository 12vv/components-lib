import React, { useState } from 'react';
import { CountdownBtn } from 'yjy-components-lib';

function CountdownBtnDemo() {
  const [loading, setLoading] = useState<boolean>(false);

  const getCode = async () => {
    setLoading(true);
    try {
      return await new Promise((resolve) =>
        setTimeout(() => {
          resolve(123);
        }, 1000),
      );
    } catch (err) {
      throw new Error('failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CountdownBtn
      loading={loading}
      onClick={async (completeCallback) => {
        const code = await getCode();
        console.log(`验证码：${code}`);
        completeCallback();
      }}
    >
      获取验证码
    </CountdownBtn>
  );
}

export default CountdownBtnDemo;