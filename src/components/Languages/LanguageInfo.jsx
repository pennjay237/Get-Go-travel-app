import Loader from '../UI/Loader'

const LanguageInfo = ({ languages, loading, error }) => {
  if (loading) {
    return <Loader message="Loading language information..." />
  }

  if (error || !languages || languages === 'N/A') {
    return (
      <div className="text-center py-4 text-gray-600">
        Language information unavailable
      </div>
    )
  }

  const languageList = languages.split(', ')

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="text-3xl mr-3">🗣️</span>
        <div>
          <div className="text-sm text-gray-600">Languages Spoken</div>
          <div className="font-medium">{languageList.length} {languageList.length === 1 ? 'Language' : 'Languages'}</div>
        </div>
      </div>

      <div className="space-y-2">
        {languageList.map((language, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
          >
            <span className="font-medium">{language}</span>
            {index === 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Primary
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        These are the official languages spoken at your destination.
      </div>
    </div>
  )
}

export default LanguageInfo