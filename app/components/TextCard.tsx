interface TextCardType {
    message: String;
};

const TextCard: React.FC<TextCardType> = ({message}) => {
  return (
    <div className="inline text-white bg-black px-5 py-3 rounded-3xl">
      {message}
    </div>
  );
};

export default TextCard;
