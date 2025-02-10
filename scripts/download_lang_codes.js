// To be run on the Minecraft Wiki page:
// https://minecraft.wiki/w/Language

const tableBody = document.querySelectorAll('table[data-description="Current language list"] tbody');

// Get every row in the table
const rows = tableBody[0].querySelectorAll("tr");

// Example Row:
// <tr>
//  <td scope="row">2</td>           // Number (Java Edition)
//  <td scope="row">–</td>           // Number (Bedrock Edition)
//  <td>العربية (العالم العربي)</td> // Name (In-Game)
//  <td>Arabic</td>                  // Name (In English)
//  <td>ar_sa</td>                   // Locale Code (In-Game)
//  <td>ara_SA</td>                  // Locale Code (ISO-639-3)
//  <td></td>                        // Notes (Official Language In)
//  <td>12w01a (1.1)</td>            // Added In (Java Edition)
//  <td>–</td>                       // Added In (Bedrock Edition)
// </tr>

// Create an object from:
//   the 4th column of each row (the language name)
//   the 5th column of each row (the in-game language code)
const languageCode = Array.from(rows).reduce((acc, row) => {
	// Get the language code (in-game) from the 5th column of the row
	const code = row
		.querySelectorAll("td")[4]
		// Remove new line characters
		.textContent.replace(/\n/g, "")
		// Remove everything including and after a [
		.split("[")[0]
		// Trim any whitespace
		.trim()
		// Remove any special characters (keeping only alphanumeric characters aswell as underscores)
		.replace(/[^a-zA-Z0-9_]/g, "");
	// Check that the language code is not empty (eg: its content is not just a full stop)
	if (code === ".") {
		return acc;
	}

	// Get the language name (in English) from the 4th column of the row
	const language = row
		.querySelectorAll("td")[3]
		// Remove new line characters
		.textContent.replace(/\n/g, "")
		// Remove everything including and after a [
		.split("[")[0]
		// Trim any whitespace
		.trim();

	acc[language] = code;
	return acc;
}, {});

// Download the language object as a JSON file
const a = document.createElement("a");
a.href = URL.createObjectURL(new Blob([JSON.stringify(languageCode, null, 4)], { type: "application/json" }));
a.download = "language.json";
a.click();

// Print the language code
console.log(languageCode);
