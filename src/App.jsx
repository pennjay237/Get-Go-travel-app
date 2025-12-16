import React, { useState } from "react";


import Navbar from "./components/Layout/Navbar";
import PageContainer from "./components/Layout/PageContainer";
import Hero from "./components/Layout/Hero";


import SectionWrapper from "./components/UI/SectionWrapper";
import ResultCard from "./components/UI/ResultCard";
import Loader from "./components/UI/Loader";
import ErrorMessage from "./components/UI/ErrorMessage";


import SearchBar from "./components/SearchBar/SearchBar";

import WeatherCard from "./components/Weather/WeatherCard";
import WeeklyForecast from "./components/Weather/WeeklyForecast";

import AttractionsList from "./components/Attractions/AttractionList";

import CurrencyInfo from "./components/Currency/CurrencyInfo";
import ConverterForm from "./components/Currency/ConverterForm";

import LanguageInfo from "./components/Languages/LanguageInfo";
import AirportInfo from "./components/Airport/AirportInfo";


import useWeather from "./hooks/useWeather";
import useAttractions from "./hooks/useAttractions";
import useCurrency from "./hooks/useCurrency";
import useCountryInfo from "./hooks/useCountryInfo";
import useAirport from "./hooks/useAirport";

function App() {
  
  const [destination, setDestination] = useState(null);

  
  const {
    weather,
    weeklyForecast,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather(destination);

  const {
    attractions,
    loading: attractionsLoading,
    error: attractionsError,
  } = useAttractions(destination);

  const {
    currency,
    loading: currencyLoading,
    error: currencyError,
  } = useCurrency(destination);

  const {
    languages,
    loading: languagesLoading,
    error: languagesError,
  } = useCountryInfo(destination);

  const {
    data: airport,
    loading: airportLoading,
    error: airportError,
  } = useAirport(
    destination ? { lat: destination.lat, lon: destination.lon } : null
  );

  return (
    <div className="min-h-screen bg-gray-50">
     
      <Navbar />

      <Hero />


      <PageContainer>

      
        <SectionWrapper>
          <SearchBar onSelectDestination={setDestination} />
        </SectionWrapper>

        <SectionWrapper>
          <ResultCard title="Weather">
            {weatherLoading ? (
              <Loader />
            ) : weatherError ? (
              <ErrorMessage message={weatherError} />
            ) : weather ? (
              <>
                <WeatherCard
                  weather={weather}
                  countryCode={destination?.country}
                />
                <WeeklyForecast forecast={weeklyForecast} />
              </>
            ) : (
              <p className="text-gray-500">
                Search a destination to view weather info
              </p>
            )}
          </ResultCard>
        </SectionWrapper>

        <SectionWrapper>
          <ResultCard title="Top Attractions">
            {attractionsLoading ? (
              <Loader />
            ) : attractionsError ? (
              <ErrorMessage message={attractionsError} />
            ) : attractions?.length ? (
              <AttractionsList attractions={attractions} />
            ) : (
              <p className="text-gray-500">No attractions found</p>
            )}
          </ResultCard>
        </SectionWrapper>


        <SectionWrapper>
          <ResultCard title="Currency">
            {currencyLoading ? (
              <Loader />
            ) : currencyError ? (
              <ErrorMessage message={currencyError} />
            ) : currency ? (
              <>
                <CurrencyInfo currency={currency} />
                <ConverterForm currency={currency} />
              </>
            ) : (
              <p className="text-gray-500">
                No currency info available
              </p>
            )}
          </ResultCard>
        </SectionWrapper>

        <SectionWrapper>
          <ResultCard title="Languages">
            {languagesLoading ? (
              <Loader />
            ) : languagesError ? (
              <ErrorMessage message={languagesError} />
            ) : languages?.length ? (
              <LanguageInfo languages={languages} />
            ) : (
              <p className="text-gray-500">
                No language info available
              </p>
            )}
          </ResultCard>
        </SectionWrapper>

        <SectionWrapper>
          <ResultCard title="Nearest Airport">
            {airportLoading ? (
              <Loader />
            ) : airportError ? (
              <ErrorMessage message={airportError} />
            ) : airport ? (
              <AirportInfo airport={airport} />
            ) : (
              <p className="text-gray-500">
                No airport info available
              </p>
            )}
          </ResultCard>
        </SectionWrapper>

      </PageContainer>
    </div>
  );
}

export default App;
