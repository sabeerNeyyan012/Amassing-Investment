export default function abbreviateNumber(value) {
    if(value > 0){
        return (
          <span className='plus'>
            {Math.abs(Number(value)) >= 1.0e9
              ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
              : // Six Zeroes for Millions
              Math.abs(Number(value)) >= 1.0e6
              ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
              : // Three Zeroes for Thousands
              Math.abs(Number(value)) >= 1.0e3
              ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
              : Math.abs(Number(value)).toFixed(2)}
          </span>
        );
    }
    else if(value < 0){
        return (
          <span className='minus'>
            {Math.abs(Number(value)) >= 1.0e9
              ? '-' + (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
              : // Six Zeroes for Millions
              Math.abs(Number(value)) >= 1.0e6
              ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
              : // Three Zeroes for Thousands
              '-' + Math.abs(Number(value)) >= 1.0e3
              ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
              : '-' + Math.abs(Number(value)).toFixed(2)}
          </span>
        );
    }
    return value
}

export const NormalFormat = (value) =>{
    return Math.abs(Number(value)) >= 1.0e9
      ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
      : // Six Zeroes for Millions
      Math.abs(Number(value)) >= 1.0e6
      ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
      : // Three Zeroes for Thousands
      Math.abs(Number(value)) >= 1.0e3
      ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(value)).toFixed(2);
}