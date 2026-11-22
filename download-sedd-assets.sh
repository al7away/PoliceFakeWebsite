#!/bin/bash
# Download exact logos and images from SEDD (sedd.ae) for the fake demo site.
# Run this script from the project folder: ./download-sedd-assets.sh
# Requires: curl

set -e
BASE="https://sedd.ae"
mkdir -p assets/icons

echo "Downloading SEDD assets..."

# Header / Nav logo (Arabic)
curl -sL -o "assets/nav-logo-ar.svg" "$BASE/o/sedd-digital-theme/images/nav-logo-ar.svg"
echo "  ✓ nav-logo-ar.svg"

# Service icons (أهم الخدمات)
curl -sL -o "assets/icons/issue-license.svg" "$BASE/documents/32114/0/Issue%20License%20%201.svg/ee31bf18-11fb-64e6-6ed4-c090860456ed?t=1761819175266"
echo "  ✓ issue-license.svg (الإفادات الشخصية)"
curl -sL -o "assets/icons/renew-license.svg" "$BASE/documents/32114/0/Renew%20License%20%20(1)%201.svg/8c861866-c187-5238-1a58-5baf26bfdb80?t=1761819208611"
echo "  ✓ renew-license.svg (تجديد رخصة)"
curl -sL -o "assets/icons/estimate.svg" "$BASE/documents/32114/0/Estimate%20Issue%20(1)%201.svg/ef4ba50b-71b1-3837-baf1-683fc2cfefb6?t=1761819227737"
echo "  ✓ estimate.svg (حاسبة الرسوم)"
curl -sL -o "assets/icons/instant-license.svg" "$BASE/documents/32114/0/Issuing%20instant%20license%20icon%20(1)%201.svg/887b1d2d-efec-3e27-2e01-0d7e50f249fd?t=1761819245224"
echo "  ✓ instant-license.svg (إصدار رخصة فورية)"

# Partner icons (شريك المستثمر)
curl -sL -o "assets/icons/restaurant.png" "$BASE/documents/32114/0/cofe-investor-icon.png/a3e4e279-adcd-964c-bd36-0cc17726e470?t=1734408969921"
echo "  ✓ restaurant.png (مساحة المطاعم)"
curl -sL -o "assets/icons/factory.svg" "$BASE/documents/32114/0/factory.svg/bb406ef1-6bd8-cbd3-fbca-badec15bf33b?t=1734409786567"
echo "  ✓ factory.svg"
curl -sL -o "assets/icons/globe_asia.svg" "$BASE/documents/32114/0/globe_asia.svg/e1500ab9-0b0f-af03-cb26-b7ecb965db1d?t=1735017581241"
echo "  ✓ globe_asia.svg"
curl -sL -o "assets/icons/woman_2.svg" "$BASE/documents/32114/0/woman_2.svg/2ee7022c-082b-ea4b-c2ba-4f6a9a0debae?t=1735017523056"
echo "  ✓ woman_2.svg (رائدات الأعمال)"
curl -sL -o "assets/icons/construction.svg" "$BASE/documents/32114/0/construction.svg/f2ef3ada-caa1-df0b-7221-94d488c8b0a7?t=1735017469925"
echo "  ✓ construction.svg (المقاولات)"
curl -sL -o "assets/icons/local_cafe.svg" "$BASE/documents/32114/0/local_cafe.svg/42f0c96b-2448-aef6-49c0-af8a35e1ff2c?t=1735017363967"
echo "  ✓ local_cafe.svg (المقاهي)"

# Favicon (if SEDD has one - try common path)
curl -sL -o "favicon-sedd.ico" "$BASE/favicon.ico" 2>/dev/null || true
if [ -f "favicon-sedd.ico" ] && [ -s "favicon-sedd.ico" ]; then
  echo "  ✓ favicon.ico"
else
  rm -f favicon-sedd.ico
  echo "  (no favicon from SEDD, keeping existing favicon.svg)"
fi

echo "Done. Open index.html to see the site with SEDD logos and icons."
