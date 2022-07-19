br="843831"
dr="89.0.4389.23"

echo "Downloading Chrome version $br"
mkdir -p "/opt/chrome/$br"
curl -Lo "/opt/chrome/$br/chrome-linux.zip" "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F$br%2Fchrome-linux.zip?alt=media"
unzip -q "/opt/chrome/$br/chrome-linux.zip" -d "/opt/chrome/$br/"
mv /opt/chrome/$br/chrome-linux/* /opt/chrome/$br/
rm -rf /opt/chrome/$br/chrome-linux "/opt/chrome/$br/chrome-linux.zip"

echo "Downloading Chromedriver version $dr"
mkdir -p "/opt/chromedriver/$dr"
curl -Lo "/opt/chromedriver/$dr/chromedriver_linux64.zip" "https://chromedriver.storage.googleapis.com/$dr/chromedriver_linux64.zip"
unzip -q "/opt/chromedriver/$dr/chromedriver_linux64.zip" -d "/opt/chromedriver/$dr/"
chmod +x "/opt/chromedriver/$dr/chromedriver"
rm -rf "/opt/chromedriver/$dr/chromedriver_linux64.zip"