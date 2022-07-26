
echo "Downloading Chrome version 972765"
mkdir -p "/opt/chrome/972765"
curl -Lo "/opt/chrome/972765/chrome-linux.zip" "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F972765%2Fchrome-linux.zip?alt=media"
unzip -q "/opt/chrome/972765/chrome-linux.zip" -d "/opt/chrome/972765/"
mv /opt/chrome/972765/chrome-linux/* /opt/chrome/972765/
rm -rf /opt/chrome/972765/chrome-linux "/opt/chrome/972765/chrome-linux.zip"

echo "Downloading Chromedriver version 100.0.4896.20"
mkdir -p "/opt/chromedriver/100.0.4896.20"
curl -Lo "/opt/chromedriver/100.0.4896.20/chromedriver_linux64.zip" "https://chromedriver.storage.googleapis.com/100.0.4896.20/chromedriver_linux64.zip"
unzip -q "/opt/chromedriver/100.0.4896.20/chromedriver_linux64.zip" -d "/opt/chromedriver/100.0.4896.20/"
chmod +x "/opt/chromedriver/100.0.4896.20/chromedriver"
rm -rf "/opt/chromedriver/100.0.4896.20/chromedriver_linux64.zip"