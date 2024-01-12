type Props = {
  message: string;
  title: string;
  type: 'error' | 'neutral' | 'success';
};

const Alert: React.FC<Props> = ({ message, title, type }) => {
  const classList = {
    error:
      'bg-red-100 border-red-500 text-red-700 dark:bg-red-800 dark:border-red-600 dark:text-red-200',
    neutral:
      'bg-gray-200 border-gray-500 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400',
    success:
      'bg-green-300 border-green-500 text-green-700 dark:bg-green-800 dark:border-green-600 dark:text-green-200',
  };

  return (
    <div className={`border-l-4 p-4 ${classList[type]}`} role="alert">
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
