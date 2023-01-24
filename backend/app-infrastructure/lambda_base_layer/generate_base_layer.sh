# Generates a base layer for the Lambda functions.

# Remove the container first (if it exists).
docker rm layer-container
docker rmi ubuntu-python

# Build the base layer.
docker build -t ubuntu-python .

# Rename it to layer-container.
docker run --name layer-container ubuntu-python

# Copy the generated zip artifact so our CDK can use it.
docker cp layer-container:layer.zip . && echo "Created layer.zip with updated base layer."