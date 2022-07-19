FROM public.ecr.aws/lambda/nodejs:14

# Assumes your function is named "app.js", and there is a package.json file in the app directory 
COPY .  ${LAMBDA_TASK_ROOT}

# Install NPM dependencies for function
RUN npm install

COPY install-browsers.sh /tmp/

# Install dependencies
RUN yum install xz atk cups-libs gtk3 libXcomposite alsa-lib tar \
    libXcursor libXdamage libXext libXi libXrandr libXScrnSaver \
    libXtst pango at-spi2-atk libXt xorg-x11-server-Xvfb \
    xorg-x11-xauth dbus-glib dbus-glib-devel unzip bzip2 -y -q

# Install Browsers
RUN /usr/bin/bash /tmp/install-browsers.sh

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "worker.consumer" ]  