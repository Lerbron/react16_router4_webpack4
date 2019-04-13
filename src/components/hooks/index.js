import React, { useState } from 'react';
import { Button } from 'antd';

export default function FirstHooks () {
  let [ count, setCount ] = useState(0);
  let [ name, setName ] = useState('bruce')

  return(
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>+</Button>
      <Button onClick={() => setCount(count - 1)}>-</Button>
      <br />
      <p>{name}</p>
      <Button onClick={() => setName('LEE')}>onClick</Button>
    </div>
  )
}