const facts = [
    "The only game I'm competitively extremely good at is 'Bloons TD Battles 2'.",
    "I have participated in 11 game jams.",
    "I was part of each season of 'Smash NL Ultimate League (aka SNUL)'.",
    "In the game Bongo Cat I have already 500+ hours.",
    "On Discord calls, I'm almost always eating.",
    "I have done research with someone else that Delphi cannot count.",
    "Discussions about code are very fun, especially exploring how deep the topic goes.",
    "People call me a database of knowing people.",
    "Bas mimics your hand movements when you talk to him.",
    "I was always the go-to person for spontaneous Burger King runs or helping out with coding, two things I absolutely loved doing with the school year under me!",
    "Bas is a man with a love for if statements.",
    "Bas likes to spontaneously start demon rituals while listening to K-Pop",
    "I've always had an obsession with bread, but it's different bread every time.",
    "Bas had white hair in 2020, he looked like Kaneki from Tokyo Ghoul.",
    "Bassie is dol op chocomelk.",
    "That for some reason everyone knows you.",
    "Big K-pop fan, because of the sound and not the lyrics.",
    "Bas begint al de punten die hij wil maken met: KEIJK LAISTER",
    "For someone who types a lot, bas makes a lot of tyops.",
    "Coffee or tea?",
    "If your name is Ryan, I'm a psychic",
    // "",
];

let lastFactIndex = -1; // Variable to remember the last fact shown

// Function to display a random fact
document.getElementById("fact-button").addEventListener("click", () => {
    let randomIndex;

    // Ensure a different fact is selected
    do {
        randomIndex = Math.floor(Math.random() * facts.length);
    } while (randomIndex === lastFactIndex);

    // Update the display and store the new index
    document.getElementById("fact-display").textContent = facts[randomIndex];
    lastFactIndex = randomIndex;
});

function renderTimeline(data) {
    const container = document.querySelector('.timeline-container');
    container.innerHTML = '<h2>My history</h2>'; // clear + title
  
    data.forEach(({ year, items }) => {
      // Add year header
      container.innerHTML += `
        <div class="timeline-year">
          <h2>${year}</h2>
        </div>
      `;
  
      items.forEach(({ title, description, links }) => {
        const linksHTML = links?.map(link =>
          `<a href="${link.url}" target="_blank" class="link">${link.text}</a>`
        ).join(" | ") || '';
  
        container.innerHTML += `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>${title}</h3>
              <p>${description}</p>
              ${linksHTML ? `<p>${linksHTML}</p>` : ''}
            </div>
          </div>
        `;
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => renderTimeline(timelineData));
  