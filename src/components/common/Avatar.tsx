import React, { useMemo } from 'react';

interface AvatarProps {
  imageUrl?: string;
  name?: string;
  altTitle: string;
  size: 'small' | 'medium' | 'large';
}
const Avatar = ({ imageUrl, altTitle, name, size }: AvatarProps) => {
  const avatarSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 'w-[35px] h-[35px]';
      case 'medium':
        return 'w-[56px] h-[56px]';
      case 'large':
        return 'w-[72px] h-[72px]';
    }
  }, [size]);
  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt={altTitle} className={`rounded-full ${avatarSize} object-cover`} />
      ) : (
        <div
          className={`${avatarSize} rounded-full bg-gradient-to-bl from-purple-400 to-blue-500 flex items-center justify-center`}
        >
          {name ? name[0].toUpperCase() : altTitle[0].toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
