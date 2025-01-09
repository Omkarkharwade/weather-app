const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".location");
const dateandTimeField = document.querySelector(".date_time");
const conditionField = document.querySelector(".condition");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

let target = "lucknow"; // Default city

form.addEventListener("submit", searchForLocation);

const fetchResults = async (targetLocation) => {
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=de65fc9ec2d3484381d133545250901&q=${targetLocation}&aqi=no`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const data = await res.json();
        console.log(data);

        const locationName = data.location.name;
        const time = data.location.localtime;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please try again later.");
    }
};

function updateDetails(temp, locationName, time, condition) {
    const [splitDate, splitTime] = time.split(" ");
    const dayName = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${dayName}, ${splitDate} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();

    const userInput = searchField.value.trim();
    if (userInput) {
        fetchResults(userInput);
    } else {
        alert("Please enter a valid location.");
    }
}

function getDayName(day) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
}

// Fetch weather for the default location on page load
fetchResults(target);
