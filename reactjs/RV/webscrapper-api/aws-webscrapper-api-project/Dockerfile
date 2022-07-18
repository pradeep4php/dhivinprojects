FROM public.ecr.aws/lambda/nodejs:14

# Assumes your function is named "app.js", and there is a package.json file in the app directory 
COPY .  ${LAMBDA_TASK_ROOT}


RUN chmod +rwx ${LAMBDA_TASK_ROOT}/lib/chromedriver
RUN chmod +rwx ${LAMBDA_TASK_ROOT}/chrome



# Install NPM dependencies for function
RUN npm install

# Install packages
RUN yum -y install libgconf*
RUN yum -y install libx*

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "worker.consumer" ]  