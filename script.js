const settings = {
  businessName: "ShineFlow Detail Co.",
  phone: "+15555555555",
  displayPhone: "(555) 555-5555",
  email: "hello@example.com",
  calendlyUrl: "https://calendly.com/your-calendly-link",
  formspreeEndpoint: "https://formspree.io/f/your-form-id",
};

const bookingLink = document.getElementById("bookingLink");
const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");
const phoneLink = document.getElementById("phoneLink");
const emailLink = document.getElementById("emailLink");
const yearLabel = document.getElementById("year");
const serviceAddressInput = document.getElementById("serviceAddress");
const addressPlaceIdInput = document.getElementById("addressPlaceId");
const addressLatInput = document.getElementById("addressLat");
const addressLngInput = document.getElementById("addressLng");
const addressHint = document.getElementById("addressHint");

if (bookingLink) bookingLink.href = settings.calendlyUrl;
if (quoteForm) quoteForm.action = settings.formspreeEndpoint;
if (phoneLink) {
  phoneLink.href = `tel:${settings.phone}`;
  phoneLink.textContent = `Call ${settings.displayPhone}`;
}
if (emailLink) {
  emailLink.href = `mailto:${settings.email}`;
  emailLink.textContent = settings.email;
}
if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());

if (formMessage && settings.formspreeEndpoint.includes("your-form-id")) {
  formMessage.textContent = "Setup required: update formspreeEndpoint in script.js.";
}

function clearAddressMetadata() {
  if (addressPlaceIdInput) addressPlaceIdInput.value = "";
  if (addressLatInput) addressLatInput.value = "";
  if (addressLngInput) addressLngInput.value = "";
}

if (serviceAddressInput) {
  serviceAddressInput.addEventListener("input", clearAddressMetadata);
}

window.initGooglePlaces = function initGooglePlaces() {
  if (!window.google?.maps?.places || !serviceAddressInput) {
    if (addressHint) {
      addressHint.textContent =
        "Google Places did not load. You can still type your full service address manually.";
    }
    return;
  }

  const autocomplete = new google.maps.places.Autocomplete(serviceAddressInput, {
    fields: ["formatted_address", "geometry", "place_id"],
    types: ["address"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place?.formatted_address) {
      return;
    }

    serviceAddressInput.value = place.formatted_address;

    if (addressPlaceIdInput) {
      addressPlaceIdInput.value = place.place_id || "";
    }

    if (place.geometry?.location) {
      if (addressLatInput) addressLatInput.value = String(place.geometry.location.lat());
      if (addressLngInput) addressLngInput.value = String(place.geometry.location.lng());
    }
  });
};

if (quoteForm) {
  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!quoteForm.checkValidity()) {
      quoteForm.reportValidity();
      return;
    }

    if (settings.formspreeEndpoint.includes("your-form-id")) {
      formMessage.textContent = "Cannot submit yet: add your real Formspree endpoint.";
      return;
    }

    const formData = new FormData(quoteForm);

    try {
      const response = await fetch(settings.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form request failed.");
      }

      quoteForm.reset();
      clearAddressMetadata();
      formMessage.textContent = "Success! Your quote request was sent.";
    } catch (error) {
      formMessage.textContent = "Submit failed. Try again or contact us by phone.";
    }
  });
}
