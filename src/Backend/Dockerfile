# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /app

# Expose the port FastAPI will run on
EXPOSE 5000

# Run FastAPI with Uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]