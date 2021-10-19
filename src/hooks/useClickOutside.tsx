import React, { useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T> | React.MutableRefObject<T>,
  onClickOutside?: () => void,
  onClickInside?: () => void,
) => {
  useEffect(() => {
    const handleClickOutsider = (e: any) => {
      const event = e as React.MouseEvent;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (onClickOutside) onClickOutside();
      } else {
        if (onClickInside) onClickInside();
      }
    };
    document.addEventListener('mousedown', handleClickOutsider);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsider);
    };
  }, [ref]);
};
