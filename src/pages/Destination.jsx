import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import WeatherCard from '../components/Weather/WeatherCard'
import WeeklyForecast from '../components/Weather/WeeklyForecast'
import AttractionsList from '../components/Attractions/AttractionsList'
import ToursList from '../components/Tours/ToursList'
import CurrencyInfo from '../components/Currency/CurrencyInfo'
import ConverterForm from '../components/Currency/ConverterForm'
import LanguageInfo from '../components/Languages/LanguageInfo'
import AirportInfo from '../components/Airport/AirportInfo'
import Loader from '../components/UI/Loader'
import ErrorMessage from '../components/UI/ErrorMessage'
import { useWeather } from '../hooks/useWeather'
import { useAttractions } from '../hooks/useAttractions'
import { useTours } from '../hooks/useTours'
import { useCountryInfo } from '../hooks/useCountryInfo'
import { useCurrency } from '../hooks/useCurrency'
import { useAirport } from '../hooks/useAirport'

const Destination = () => {
  const { name } = useParams()
  const location = useLocation()
  const [coordinates, setCoordinates] = useState(null)
  const [destinationName, setDestinationName] = useState(decodeURIComponent(name))

  const { weather, loading: weatherLoading, error: weatherError } = useWeather(coordinates)
  const { 
    attractions, 
    loading: attractionsLoading, 
    error: attractionsError,
    hasMore,
    loadMore 
  } = useAttractions(coordinates)
  const { tours, loading: toursLoading, error: toursError } = useTours(destinationName)
  const { countryInfo, loading: countryLoading, error: countryError } = useCountryInfo(destinationName)
  const { rates, loading: currencyLoading, error: currencyError, convert } = useCurrency(countryInfo?.currency)
  const { airport, loading: airportLoading, error: airportError } = useAirport(coordinates)

  useEffect(() => {
    if (location.state?.coordinates) {
      setCoordinates(location.state.coordinates)
    }
    if (location.state?.location) {
      setDestinationName(location.state.location.name)
    }
  }, [location])

  const isLoading = weatherLoading || attractionsLoading || countryLoading
  const hasError = weatherError || attractionsError || countryError

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader message="Loading destination information..." />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <ErrorMessage 
          message="Failed to load destination information"
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {destinationName}
          </h1>
          {countryInfo && (
            <div className="flex items-center gap-2 text-gray-600">
              <span>📍 {countryInfo.region}</span>
              {countryInfo.flag && (
                <img src={countryInfo.flag} alt="Flag" className="w-6 h-4 rounded" />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="card">
              <h2 className="text-2xl font-bold mb-6">Weather Information</h2>
              {weather ? (
                <div className="space-y-6">
                  <WeatherCard weather={weather.current} />
                  <WeeklyForecast forecast={weather.daily} />
                </div>
              ) : (
                <ErrorMessage message="Weather data unavailable" />
              )}
            </section>

            <section className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Top Attractions</h2>
                {attractionsError && (
                  <span className="text-sm text-red-600">Using sample data</span>
                )}
              </div>
              <AttractionsList 
                attractions={attractions} 
                loading={attractionsLoading}
                hasMore={hasMore}
                onLoadMore={loadMore}
              />
            </section>

            <section className="card">
              <h2 className="text-2xl font-bold mb-6">Tours & Activities</h2>
              <ToursList 
                tours={tours} 
                loading={toursLoading}
                error={toursError}
              />
            </section>
          </div>

          <div className="space-y-8">
            <section className="card">
              <h2 className="text-2xl font-bold mb-6">Currency Information</h2>
              <CurrencyInfo 
                currency={countryInfo?.currency}
                currencyName={countryInfo?.currencyName}
                loading={currencyLoading}
                error={currencyError}
              />
              {rates && (
                <div className="mt-6">
                  <ConverterForm 
                    rates={rates}
                    convert={convert}
                    baseCurrency={countryInfo?.currency}
                  />
                </div>
              )}
            </section>

            <section className="card">
              <h2 className="text-2xl font-bold mb-6">Language Information</h2>
              <LanguageInfo 
                languages={countryInfo?.languages}
                loading={countryLoading}
                error={countryError}
              />
            </section>

            <section className="card">
              <h2 className="text-2xl font-bold mb-6">Airport Information</h2>
              <AirportInfo 
                airport={airport}
                loading={airportLoading}
                error={airportError}
              />
            </section>

            {countryInfo && (
              <section className="card">
                <h2 className="text-2xl font-bold mb-6">Country Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capital</span>
                    <span className="font-medium">{countryInfo.capital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Population</span>
                    <span className="font-medium">{countryInfo.population}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Region</span>
                    <span className="font-medium">{countryInfo.region}</span>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Destination