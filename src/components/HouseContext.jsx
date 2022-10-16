import React, { createContext, useEffect, useState } from "react";

import { housesData } from "../data";

export const HouseContext = createContext();

export const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [countries, setCountries] = useState([]);
  const [properties, setProperties] = useState([]);

  const [country, setCountry] = useState("Location (any)");
  const [property, setProperty] = useState("Property type (any)");
  const [price, setPrice] = useState("Price range (any)");

  const [loading, setLoading] = useState(false);

  /**
   * Loading Countries
   */
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);

  /**
   * Loading Properties
   */
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    const uniqueProperties = ["Location (any)", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, []);

  const isDefaultValue = (value) => {
    return value.includes("(any)");
  };

  const handleClick = () => {
    setLoading(true);
    const [valueFrom, , valueTo] = price.split(" ");

    const isCountrySelected = !isDefaultValue(country);
    const isPropertySelected = !isDefaultValue(property);
    const isPriceSelected = !isDefaultValue(price);

    const filteredHouses = housesData.filter((house) => {
      if (isCountrySelected && house.country !== country) {
        return false;
      }

      if (isPropertySelected && house.type !== property) {
        return false;
      }

      const housePrice = parseInt(house.price);
      const valueFromInt = parseInt(valueFrom);
      const valueToInt = parseInt(valueTo);
      if (
        isPriceSelected &&
        !(housePrice >= valueFromInt && housePrice <= valueToInt)
      ) {
        return false;
      }

      return true;
    });

    setHouses(filteredHouses || []);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};
