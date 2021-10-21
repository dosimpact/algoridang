import React, { useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  // ref 오브젝트
  ref: React.RefObject<T> | React.MutableRefObject<T>,
  onClickOutside?: () => void,
  onClickInside?: () => void,
) => {
  useEffect(() => {
    // ref를 기준으로 하위 노드인지 contains 함수를 이용해서 판별한다.
    const handleClickOutsider = (e: any) => {
      const event = e as React.MouseEvent;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (onClickOutside) onClickOutside();
      } else {
        if (onClickInside) onClickInside();
      }
    };
    // 이벤트 등록 및 해제
    document.addEventListener('click', handleClickOutsider, {});
    return () => {
      document.removeEventListener('click', handleClickOutsider, {});
    };
  }, [ref, onClickInside, onClickOutside]);
};
