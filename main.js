document.addEventListener('DOMContentLoaded', function() {
  const countryMap = {
    "Australia": {
      address: "Level 24, Three International Towers, 300 Barangaroo Ave, Barangaroo NSW 2000, Australia",
      googleMapsURL: "https://www.google.com/maps/place/The+Executive+Centre+-+Three+International+Towers+%7C+Coworking+Space,+Serviced+%26+Virtual+Offices+and+Workspace/@-33.8650495,151.2000392,17z/data=!3m2!4b1!5s0x6b12ae471d197fef:0x8c1a146c921d954!4m5!3m4!1s0x6b12af64e86b7829:0xf853cdd296370fae!8m2!3d-33.8650825!4d151.2018544"
    },
    "Canada": {
      address: "1 Yonge Street, Suite 1801, Toronto, ON M5E 1W7 Canada",
      googleMapsURL: "https://www.google.com/maps/place/1+Yonge+St+%231801,+Toronto,+ON+M5E+1W7,+Canada"
    },
    "United Kingdom": {
      address: "16 High Holborn, London, England, WC1V 6BX",
      googleMapsURL: "https://www.google.com/maps/place/16+High+Holborn,+London+WC1V+6BX,+UK"
    },
    "United States": {
      address: "P.O. Box 1210 O'Fallon, MO 63366, United States",
      googleMapsURL: "https://www.google.com/maps/place/O'Fallon,+MO+63366,+USA",
      privacyStatement: "<strong>Notice:</strong> This communication is from a debt collector. This may be an attempt to collect a debt. Any information obtained will be used for that purpose. This electronic mail message is intended exclusively for the individual or entity to which it is addressed. This message, together with any attachment, may contain confidential and privileged information. Any unauthorized review, use, print, retain, copy, disclosure, or distribution is strictly prohibited. If you have received this message in error, please immediately advise the sender by reply email message to the sender and delete all copies of this message. Thank you."
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
        <img src="//indebted.github.io/sign/png/logo.png" width="135" height="25" style="display: block; margin: 10px 0px">
        ${!linkedin.value ? '' : `
          <div>
            <img src="//indebted.github.io/sign/png/linkedin.png" width="16" height="16" style="margin-right: 5px; vertical-align: middle">
            <a href="https://linkedin.com/in/${linkedin.value}" target="_blank" style="color: #111; text-decoration: none">
              ${linkedin.value}
            </a>
          </div>
        `}
        ${!phoneNumber.value ? '' : `
          <div>
            <img src="//indebted.github.io/sign/png/call.png" width="16" height="16" style="margin-right: 5px; vertical-align: middle">
            <a href="tel:${phoneNumber.value.replace(/\s/g, '')}" target="_blank" style="color: #111; text-decoration: none">
              ${phoneNumber.value}
            </a>
          </div>
        `}
        <div>
          <img src="//indebted.github.io/sign/png/language.png" width="16" height="16" style="margin-right: 5px; vertical-align: middle">
          <a href="https://indebted.co" target="_blank" style="color: #111; text-decoration: none">
            https://indebted.co
          </a>
        </div>
        ${!countryMap[country.value] ? `` : `
          <div>
            <img src="//indebted.github.io/sign/png/location.png" width="16" height="16" style="margin-right: 5px; vertical-align: middle">
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
