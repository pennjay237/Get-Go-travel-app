const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
      <div className="text-red-600 text-xl mb-2">⚠️</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage