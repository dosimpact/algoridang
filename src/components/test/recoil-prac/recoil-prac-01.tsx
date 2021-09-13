import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// store Section
// atoms
interface IspeechState {
  name: string;
  speak: string;
}
const atom_speech = atom<IspeechState>({
  key: 'speech_',
  default: {
    name: '',
    speak: '',
  },
});
// selector
const select_speechToEn = selector({
  key: 'speechToEnSelect',
  get: ({ get }) => {
    const speech = get(atom_speech);
    return {
      ment: `🏳️‍🌈[${speech.name}] ${speech.speak}(En...translate)`,
    };
  },
});
const select_speechToKo = selector({
  key: 'speechToKoSelect',
  get: ({ get }) => {
    const speech = get(atom_speech);
    return {
      ment: `🇰🇷[${speech.name}] ${speech.speak}(Ko...translate)`,
    };
  },
});

// components

const Speaker = () => {
  const [speech, setSpeech] = useRecoilState(atom_speech);
  const [name, setName] = React.useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      setSpeech((prev) => ({ ...prev, name }));
    }
    setName('');
  };

  return (
    <div>
      <h2>Mike</h2>
      <form onSubmit={handleSubmit}>
        <h3>setName</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </form>
      <input
        type="text"
        value={speech.speak}
        onChange={(e) => {
          setSpeech({ name: speech.name, speak: e.target.value });
        }}
      ></input>
    </div>
  );
};
const ListenerEn = () => {
  const SpeechEn = useRecoilValue(select_speechToEn);
  return <div>{JSON.stringify(SpeechEn, null, 2)}</div>;
};
const ListenerKo = () => {
  const SpeechKo = useRecoilValue(select_speechToKo);
  return <div>{JSON.stringify(SpeechKo, null, 2)}</div>;
};

const Recoil01 = () => {
  return (
    <div>
      <Speaker />
      <ListenerEn />
      <ListenerKo />
    </div>
  );
};

export { Recoil01 };
