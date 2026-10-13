document.addEventListener('DOMContentLoaded', function() {
  const countryMap = {
    "Australia": {
      address: "Level 14/333 Kent St, Sydney NSW 2000, Australia",
      googleMapsURL: "https://www.google.com/maps/search/?api=1&query=Level+14%2F333+Kent+St%2C+Sydney+NSW+2000%2C+Australia"
    },
    "Canada": {
      address: "18 King Street East, Suite 1400, Toronto, ON M5C 1C4, Canada",
      googleMapsURL: "https://www.google.com/maps/search/?api=1&query=18+King+Street+East%2C+Suite+1400%2C+Toronto%2C+ON+M5C+1C4%2C+Canada"
    },
    "United Kingdom": {
      address: "16 High Holborn, London WC1V 6BX, United Kingdom",
      googleMapsURL: "https://www.google.com/maps/search/?api=1&query=16+High+Holborn%2C+London+WC1V+6BX%2C+United+Kingdom"
    },
    "United States": {
      address: "1551 Emancipation Hwy, Unit 1511, Fredericksburg, VA 22401",
      googleMapsURL: "https://www.google.com/maps/search/?api=1&query=1551+Emancipation+Hwy%2C+Unit+1511%2C+Fredericksburg%2C+VA+22401",
      privacyStatement: "<strong>Notice:</strong> This communication is from a debt collector. This may be an attempt to collect a debt. Any information obtained will be used for that purpose. This electronic mail message is intended exclusively for the individual or entity to which it is addressed. This message, together with any attachment, may contain confidential and privileged information. Any unauthorized review, use, print, retain, copy, disclosure, or distribution is strictly prohibited. If you have received this message in error, please immediately advise the sender by reply email message to the sender and delete all copies of this message. Thank you."
    },
    "UAE": {
      address: "Office 32 & 33, 1st Floor, The Place – B1 Mall, Al Barsha 1, Dubai, UAE",
      googleMapsURL: "https://www.google.com/maps/search/?api=1&query=Office+32+%26+33%2C+1st+Floor%2C+The+Place+%E2%80%93+B1+Mall%2C+Al+Barsha+1%2C+Dubai%2C+UAE"
    }
  }

  const defaultPrivacyStatement = "<strong>Confidentiality Notice:</strong> The contents of  this email message and any attachments are intended solely for the addressee(s) and may contain confidential and / or privileged information and may be legally protected from disclosure. If you are not the intended recipient of this message, or if this message has been addressed to you in error, please immediately notify the sender by email and delete this message and attachment. If you are not the intended recipient, you are hereby notified that any use, dissemination, copying, storage or distribution of this message and attachment is strictly prohibited. Thank you."

  renderEmailSignature();
  initialiseListeners();

  function renderEmailSignature() {
    const code = getEmailSignatureHTML();
    document.getElementById('signature').innerHTML = code;
    document.getElementById('code').value = code.trim();
  }

  function initialiseListeners() {
    const inputs = document.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).addEventListener('change', renderEmailSignature);
      inputs.item(i).addEventListener('keyup', renderEmailSignature);
    }

    document.getElementById('select-rich-format').addEventListener('click', selectRichFormat);

    document.getElementById('select-html-code').addEventListener('click', () => {
      document.getElementById('code').click();
    });

    document.getElementById('code').addEventListener('click', () => {
      document.getElementById('code').select();
    });
  }

  function selectRichFormat() {
    const el = document.getElementById('signature');
    let body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
  }

  function getEmailSignatureHTML() {
    const name = document.getElementById('name');
    const jobTitle = document.getElementById('job-title');
    const linkedin = document.getElementById('linkedin');
    const phoneNumber = document.getElementById('phone-number');
    const country = document.forms['email-signature-builder'].country;

    return `
      <div>
        <div style="color: #111">${name.value}</div>
        <div style="color: #657c97">${jobTitle.value}</div>
        <img src="https://indebted.github.io/sign/png/logo.png" width="135" height="24" style="display: block; margin: 10px 0px">
        ${!linkedin.value ? '' : `
          <div>
            <img src="https://indebted.github.io/sign/png/linkedin.png" width="16" height="16" style="margin-right: 5px; vertical-align: middle">
            <a href="https://linkedin.com/in/${linkedin.value}" target="_blank" style="color: #111; text-decoration: none">
              ${linkedin.value}
            </a>
          </div>
        `}
        ${!phoneNumber.value ? '' : `
          <div>
            <img src="https://indebted.github.io/sign/png/call.png" width="16" height="16" style="margin-right: 5px; vertical-align: middle">
            <a href="tel:${phoneNumber.value.replace(/\s/g, '')}" target="_blank" style="color: #111; text-decoration: none">
              ${phoneNumber.value}
            </a>
          </div>
        `}
        <div>
          <img src="https://indebted.github.io/sign/png/language.png" width="16" height="16" style="margin-right: 5px; vertical-align: middle">
          <a href="https://indebted.co" target="_blank" style="color: #111; text-decoration: none">
            https://indebted.co
          </a>
        </div>
        ${!countryMap[country.value] ? `` : `
          <div>
            <img src="https://indebted.github.io/sign/png/location.png" width="16" height="16" style="margin-right: 5px; vertical-align: middle">
            <a href="${countryMap[country.value].googleMapsURL}" target="_blank" style="color: #111; text-decoration: none">
              ${countryMap[country.value].address}
            </a>
          </div>
          <div style="color: #111; font-size: 8pt; line-height: 12pt; margin-top: 15px">
            ${countryMap[country.value].privacyStatement || defaultPrivacyStatement}
          </div>
        `}
      </div>
    `;
  }
});
