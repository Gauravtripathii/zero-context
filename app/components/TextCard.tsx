interface TextCardType {
  message: String;
  styles: String;
}

const TextCard: React.FC<TextCardType> = ({ message, styles }) => {
  return <div className={`flex items-center justify-center ${styles}`}>{message}</div>;
};

export default TextCard;
