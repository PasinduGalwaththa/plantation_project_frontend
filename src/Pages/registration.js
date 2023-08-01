import React, { useState } from 'react';
import RegisterPlanter from './PlanterDashboard/RegisterPlanter';
import RegisterCollector from './CollectorDashboard/RegisterCollector';
import { Center , Space } from '@mantine/core';
function Registration() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected Option:', event.target.value);
  };

  return (
    <div>
        <Center>
      <label>
        <input
          type="radio"
          value="planter"
          checked={selectedOption === 'planter'}
          onChange={handleOptionChange}
        />
        Planter
      </label>
      <Space w='xl'/>
      <label>
        <input
          type="radio"
          value="collector"
          checked={selectedOption === 'collector'}
          onChange={handleOptionChange}
        />
        Collector
      </label></Center>
      {selectedOption === 'planter' ? <RegisterPlanter/> : selectedOption === 'collector' ? <RegisterCollector/> : null}
    </div>
  );
}

export default Registration;
