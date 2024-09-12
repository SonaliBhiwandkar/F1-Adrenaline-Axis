const yearDropdown = document.getElementById('yearDropdown');
yearDropdown.addEventListener('change', () => {
  const selectedYear = yearDropdown.value;
  fetchDrivers(selectedYear); // Fetch drivers based on the selected year
});

async function fetchDrivers(year) {
  const url = `https://f1-live-motorsport-data.p.rapidapi.com/drivers/${year}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'dab876be4cmsh021b5b7bc071cdbp10c184jsn48fbb7919ef8',
      'x-rapidapi-host': 'f1-live-motorsport-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const drivers = data.results; // Assuming results contain driver data
    displayDrivers(drivers);
  } catch (error) {
    console.error(error);
    document.getElementById('drivers').innerHTML = 'Failed to fetch data';
  }
}

function displayDrivers(drivers) {
  const driversDiv = document.getElementById('drivers');
  driversDiv.innerHTML = ""; // Clear previous content

  drivers.forEach(driver => {
    const driverElement = document.createElement('div');
    driverElement.innerHTML = `
      <p><strong>Name:</strong> ${driver.driver_name}</p>
      <p><strong>Team:</strong> ${driver.team_name}</p>
      <p><strong>Nationality:</strong> ${driver.nationality}</p>
      <p><strong>Reserve Driver:</strong> ${driver.is_reserve ? 'Yes' : 'No'}</p>
    `;
    driversDiv.appendChild(driverElement);
  });
}

// Fetch initial driver data for the default year (2024)
fetchDrivers('2024');
