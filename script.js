const output = document.getElementById("output");

// Step 1: Add the loading row initially (add id="loading")
const loadingRow = document.createElement("tr");
loadingRow.setAttribute("id", "loading");
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
output.appendChild(loadingRow);

// Step 2: Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(index) {
  const time = (Math.random() * 2 + 1); // 1 to 3 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: `Promise ${index + 1}`, time });
    }, time * 1000);
  });
}

// Step 3: Start the promises and measure overall time
const startTime = performance.now();
const promises = [0, 1, 2].map(i => createRandomPromise(i));

Promise.all(promises).then(results => {
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000;

  // Remove the loading row
  const loading = document.getElementById("loading");
  if (loading) loading.remove();

  // Populate results
  results.forEach(result => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime.toFixed(3)}</td>
  `;
  output.appendChild(totalRow);
});
