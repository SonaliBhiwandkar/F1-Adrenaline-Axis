const yearDropdown = document.getElementById('yearDropdown');
    yearDropdown.addEventListener('change', () => {
      const selectedYear = yearDropdown.value;
      fetchStandings(selectedYear);
    });
  
    async function fetchStandings(year) {
      const url = `https://f1-live-motorsport-data.p.rapidapi.com/drivers/standings/${year}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'dab876be4cmsh021b5b7bc071cdbp10c184jsn48fbb7919ef8',
          'X-RapidAPI-Host': 'f1-live-motorsport-data.p.rapidapi.com'
        }
      };
  
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const results = data.results;
        displayStandings(results);
      } catch (error) {
        console.error(error);
        document.getElementById('standings').innerHTML = 'Failed to fetch data';
      }
    }
  
    function displayStandings(results) {
      const standingsDiv = document.getElementById("standings");
      standingsDiv.innerHTML = "";
      results.forEach((result, index) => {
        const position = index + 1;
        const { driver_name, nationality, team_name, points } = result;
        standingsDiv.innerHTML += `<p>${position}. ${driver_name} (${nationality}) - ${points} points (${team_name})</p>`;
      });
    }
  
    // Fetch initial standings for the default year (2024)
    fetchStandings('2024');