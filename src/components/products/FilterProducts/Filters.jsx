import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../redux/productsSlice';
import filterData from '../../../data/filter.json'; // Import the JSON file
import './Filters.css';

const Filters = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState(filterData.defaultValues.brand);
  const [internalStorage, setInternalStorage] = useState(filterData.defaultValues.internalStorage);
  const [camera, setCamera] = useState(filterData.defaultValues.camera);
  const [batteryLife, setBatteryLife] = useState(filterData.defaultValues.batteryLife);

  const handleCheckboxChange = (setter, value, currentValues, category) => {
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];

    setter(updatedValues);
    dispatch(setFilters({ [category]: updatedValues }));
  };

  const handleRadioChange = (setter, value, category) => {
    setter(value);
    dispatch(setFilters({ [category]: value }));
  };

  return (
    <div className="filters w-100">
      <h3 className="filters-heading">Filters</h3>

      {/* Render Brand Filters Dynamically */}
      <div className="filter-item">
        <h4>Brand</h4>
        {filterData.filters.brand.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={brand.includes(item)}
              onChange={() => handleCheckboxChange(setBrand, item, brand, 'brand')}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Render Internal Storage Filters Dynamically */}
      <div className="filter-item">
        <h4>Internal Storage</h4>
        {filterData.filters.internalStorage.map((item) => (
          <label key={item}>
            <input
              type="radio"
              name="storage"
              value={item}
              checked={internalStorage === item}
              onChange={() => handleRadioChange(setInternalStorage, item, 'internalStorage')}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Render Camera Filters Dynamically */}
      <div className="filter-item">
        <h4>Camera</h4>
        {filterData.filters.camera.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={camera.includes(item)}
              onChange={() => handleCheckboxChange(setCamera, item, camera, 'camera')}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Render Battery Life Filters Dynamically */}
      <div className="filter-item">
        <h4>Battery Life</h4>
        {filterData.filters.batteryLife.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={batteryLife.includes(item)}
              onChange={() => handleCheckboxChange(setBatteryLife, item, batteryLife, 'batteryLife')}
            />
            {item}
          </label>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="clear-button"
          onClick={() => {
            setBrand([]);
            setInternalStorage('');
            setCamera([]);
            setBatteryLife([]);
            dispatch(setFilters({ brand: [], internalStorage: null, camera: [], batteryLife: [] }));
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
