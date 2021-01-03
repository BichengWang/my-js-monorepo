// @flow
import {
  atom,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import React from 'react';

const textState = atom({
  // unique ID (with respect to other atoms/selectors)
  default: '',
  key: 'textState', // default value (aka initial value)
});

const CharacterCounter = () => {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
};

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input onChange={onChange} type="text" value={text} />
      <br />
      Echo: {text}
    </div>
  );
}

const charCountState = selector({
  // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
  key: 'charCountState',
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <div>Character Count: {count}</div>;
}

export default CharacterCounter;
