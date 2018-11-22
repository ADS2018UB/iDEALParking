FROM python:3.6.7-stretch

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN apt-get update && apt-get install build-essential
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["/bin/sh", "run_server.sh"]