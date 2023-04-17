FROM docker.io/nginx:stable-alpine

COPY ./dist/ /usr/share/nginx/html/

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]