document.getElementById("formatBtn").addEventListener("click", () => {
  const input = document.getElementById("input").value;

  try {
    // Parse and beautify the HashMap-like input
    const formatted = beautifyHashMap(input);
    const output = document.getElementById("output");
    const copyBtn = document.getElementById("copyBtn");

    // Display the formatted output
    output.textContent = formatted;

    // Show the copy button
    copyBtn.classList.remove("hidden");
  } catch (err) {
    console.error(err); // Log the error for debugging
    document.getElementById("output").textContent =
      "Invalid input! Please ensure the format matches a HashMap structure.";
    document.getElementById("copyBtn").classList.add("hidden"); // Hide the copy button
  }
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const output = document.getElementById("output").textContent;

  // Copy the output content to the clipboard
  navigator.clipboard
    .writeText(output)
    .then(() => {
      alert("Formatted JSON copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
});

function beautifyHashMap(input) {
  // Convert the HashMap-like string into a JSON-like structure
  const sanitized = input
    .trim()
    .replace(/=/g, ":") // Replace `=` with `:`
    .replace(/(\w+):/g, '"$1":') // Add quotes around keys
    .replace(/:\s*([\w\d\-+]+)/g, ': "$1"') // Add quotes around unquoted values
    .replace(/\(/g, "{") // Replace '(' with '{'
    .replace(/\)/g, "}") // Replace ')' with '}'
    .replace(/,\s*}/g, "}") // Remove trailing commas before '}'
    .replace(/,\s*\]/g, "]"); // Remove trailing commas before ']'

  // Parse the resulting JSON-like structure and beautify it
  return JSON.stringify(JSON.parse(sanitized), null, 4);
}
