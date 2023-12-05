let pollOptions = JSON.parse(localStorage.getItem('pollOptions')) || {
    option1: 0,
    option2: 0,
  };

  document.getElementById('polls-submit').addEventListener('click', submitVote);

  function submitVote() {
    const selectedOption = document.querySelector('input[name="poll-option"]:checked');

    if (selectedOption) {
      const optionValue = selectedOption.value;
      pollOptions[optionValue]++;
      localStorage.setItem('pollOptions', JSON.stringify(pollOptions));
      displayResults();
    } else {
      alert('Please select an option before submitting.');
    }
  }

  function displayResults() {
    const resultElement = document.getElementById('vote-result');
    let totalVotes = Object.values(pollOptions).reduce((sum, count) => sum + count, 0);

    let resultHTML = '';

    for (const option in pollOptions) {
      const percentage = totalVotes > 0 ? ((pollOptions[option] / totalVotes) * 100).toFixed(2) : 0;
      resultHTML += `
        <div class="mb-2">
          <p>${option}:</p>
          <div class="bar" style="width: ${percentage}%;"></div>
          <p>${percentage}%</p>
        </div>
      `;
    }

    resultElement.innerHTML = resultHTML;
  }


  const subBtn = document.getElementById('polls-submit');

  subBtn.addEventListener('click' , submitVote);

  // Initial display of results
  displayResults();

