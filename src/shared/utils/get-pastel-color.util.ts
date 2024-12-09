const getPastelColor = (username: string) => {
    const hash = username.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

export default getPastelColor;
