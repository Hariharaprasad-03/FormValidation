// --- 1. SELECT ALL THE NECESSARY ELEMENTS ---
const form = document.querySelector('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const planetName = document.getElementById('planetName');



const alienIdInput = document.getElementById('AntenaCount'); // Placeholder: ALIEN ID
const antenaCountInput = document.getElementById('AlieanId'); // Placeholder: ANTENA COUNT
const phraseInput = document.getElementById('prase');
const dateInput = document.getElementById('date');


// --- 2. HELPER FUNCTIONS FOR SHOWING SUCCESS/ERROR ---


function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const errorDiv = formGroup.querySelector('.error');
    errorDiv.innerText = message;
}


function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    const errorDiv = formGroup.querySelector('.error');
    errorDiv.innerText = '';
}


// --- 3. VALIDATION LOGIC FOR EACH FIELD ---


function validateRequired(input) {
    if (input.value.trim() === '') {
        showError(input, 'This field is required');
        return false;
    }
    showSuccess(input);
    return true;
}
function validatePlanetName(input) {
    const regex = /^(?=.*[aeiouAEIOU])(?=.*\d).*$/;
    if (input.value.trim() === '') {
        showError(input, 'This field is required');
        return false;
    } else if (!regex.test(input.value)) {
        showError(input, 'Must contain a vowel and a number');
        return false;
    }
    showSuccess(input);
    return true;
}

function validateAlienId(input) {
    const regex = /^ZOR-[A-Z]{2}_\d{4}@UFO$/;
    if (input.value.trim() === '') {
        showError(input, 'This field is required');
        return false;
    } else if (!regex.test(input.value)) {
        showError(input, 'Format must be ZOR-XX_1234@UFO');
        return false;
    }
    showSuccess(input);
    return true;
}

// Antena Count: Must be an even number
function validateAntenaCount(input) {
    const regex = /^\d*[02468]$/;
    if (input.value.trim() === '') {
        showError(input, 'This field is required');
        return false;
    } else if (!regex.test(input.value)) {
        showError(input, 'Count must be an even number');
        return false;
    }
    showSuccess(input);
    return true;
}


function validateDate(input) {
    const dateString = input.value.trim();
    const regex = /^\d{2}-\d{2}-\d{4}$/;

    if (!regex.test(dateString)) {
        showError(input, 'Please use dd-mm-yyyy format');
        return false;
    }

    const [day, month, year] = dateString.split('-');
    const isoDateString = `${year}-${month}-${day}`;
    const landingDate = new Date(isoDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    if (isNaN(landingDate.getTime())) {
        showError(input, 'Please enter a valid calendar date');
        return false;
    }

    if (landingDate < today) {
        showError(input, 'Landing date cannot be in the past');
        return false;
    }

    showSuccess(input);
    return true;
}


// --- 4. ATTACH EVENT LISTENERS ---

// Add "input" listeners for real-time validation as the user types
firstName.addEventListener('input', () => validateRequired(firstName));
lastName.addEventListener('input', () => validateRequired(lastName));
planetName.addEventListener('input', () => validatePlanetName(planetName));
alienIdInput.addEventListener('input', () => validateAlienId(alienIdInput));
antenaCountInput.addEventListener('input', () => validateAntenaCount(antenaCountInput));
phraseInput.addEventListener('input', () => validateRequired(phraseInput));
dateInput.addEventListener('input', () => validateDate(dateInput));


// Add a "submit" listener for the final check before submitting
form.addEventListener('submit', function(e) {
   
    e.preventDefault();

    
    const isFirstNameValid = validateRequired(firstName);
    const isLastNameValid = validateRequired(lastName);
    const isPlanetNameValid = validatePlanetName(planetName);
    const isAlienIdValid = validateAlienId(alienIdInput);
    const isAntenaCountValid = validateAntenaCount(antenaCountInput);
    const isPhraseValid = validateRequired(phraseInput);
    const isDateValid = validateDate(dateInput);

    // Check if ALL fields are valid
    if (isFirstNameValid && isLastNameValid && isPlanetNameValid && isAlienIdValid && isAntenaCountValid && isPhraseValid && isDateValid) {
        alert('First step is Done');
        form.reset();
        
    } else {
        alert('Please fix the errors before submitting.');
    }
});