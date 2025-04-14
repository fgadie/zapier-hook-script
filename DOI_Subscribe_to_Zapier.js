window.addEventListener("DOMContentLoaded", () => {
  const debugEl = document.getElementById("debug");

  function log(msg) {
    const line = document.createElement("div");
    line.textContent = msg;
    debugEl.appendChild(line);
    console.log(msg);
  }

  log("🔄 Script loaded. Looking for ID...");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("Id") || urlParams.get("ID") || urlParams.get("id");

  if (id) {
    log(`✅ Found ID in URL: ${id}`);

    const webhookUrl = "https://hooks.zapier.com/hooks/catch/6735747/20aowe2/";

    log("📡 Sending POST request to Zapier...");

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Id: id })
    })
    .then(res => {
      if (res.ok) {
        log("✅ Webhook POST successful!");
      } else {
        log(`❌ Webhook POST failed. Status: ${res.status} - ${res.statusText}`);
      }
    })
    .catch(err => {
      log(`❌ Network error during POST: ${err.message}`);
    });
  } else {
    log("⚠️ No ID found in the URL.");
  }
});
